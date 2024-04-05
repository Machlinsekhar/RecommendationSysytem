import psycopg2
from config import load_config
from image_scraper import main_function
from cbf_pipeline.preprocess import preprocess_fun
from feature_mining import feature_main_function
from graph import graph_fun
import re
import json

def extract_data_for_restaurant(file_path, location):
    config = load_config()
    rest_names = []
    torestaurants = []
    toreviews = []
    rest_ids = []

    with open(file_path, 'r') as file:
        data = json.load(file)
        try:
            with psycopg2.connect(**config) as conn:
                print('Connected to the PostgreSQL server.')
                cur = conn.cursor()
                for restaurant in data:
                    torestaurants = []
                    toreviews = []
                
                    # Extract the desired information
                    place_id = restaurant.get('place_id', 'N/A')
                    rest_name = restaurant.get('name', '')
                    main_category = restaurant.get('main_category', '')
                    categories = restaurant.get('categories', '[]')
                    budget = restaurant.get('budget', 'Moderately expensive')
                    rating = restaurant.get('rating', 3)
                    rev_count = restaurant.get('reviews', 50)
                    address = restaurant.get ('address', '')
                    
                    # Store the extracted information in the list
                    torestaurants.append((place_id, rest_name, budget, rating, rev_count, main_category, categories, address))
                    
                    temp_list = list(torestaurants[0])
                    temp_list[1] = re.sub(r"[^a-zA-Z0-9\s']", '', temp_list[1]).replace("'","")
                    temp_list[7] = re.sub(r"[^a-zA-Z0-9\s']", '', temp_list[7]).replace("'","")
                    if temp_list[2] != None:
                        rest_budget = temp_list[2].lower().strip()
                        if rest_budget == "inexpensive":
                            temp_list[2] = 0
                        elif rest_budget == "moderately expensive":
                            temp_list[2] = 1
                        elif rest_budget == "expensive":
                            temp_list[2] = 2
                        elif rest_budget == "very expensive":
                            temp_list[2] = 3
                    else:
                        temp_list[2] = 2
                    temp_list[5] = re.sub(r"[^a-zA-Z0-9\s']", '', temp_list[5]).replace("'","")
                    for i in range(0,len(temp_list[6])):
                        temp_list[6][i] = re.sub(r"[^a-zA-Z0-9\s']", '', temp_list[6][i]).replace("'","")
                    torestaurants[0] = tuple(temp_list)

                    print(torestaurants[0][1])
                    add_resto_sql = f"""
                    INSERT INTO test.restaurants(rest_id, rest_name, rest_budget, rest_rating, rest_rev_count, address, main_category, categories, rest_location)
                    VALUES('{torestaurants[0][0]}','{torestaurants[0][1]}', {torestaurants[0][2]}, {torestaurants[0][3]}, {torestaurants[0][4]}, '{torestaurants[0][7]}', '{torestaurants[0][5]}', (ARRAY{torestaurants[0][6]}), '{location}');
                    """
                    cur.execute(add_resto_sql)
                    rest_id = torestaurants[0][0]
                    print("extracted rest_id", rest_id)
                    rest_ids.append(rest_id)

                    print(torestaurants[0][1])
                    rest_names.append((torestaurants[0][1],torestaurants[0][7]))

                    print("updated restaurants")

                    for review in restaurant.get('detailed_reviews', []):
                        print("inside reviews")
                        rev_rating = review.get('rating', 3)
                        review_text = review.get('review_text', '')
                        reliability_count = review.get('total_number_of_reviews_by_reviewer', 0)
                        is_local_guide = review.get('is_local_guide', False)

                        if review_text == "" or review_text == None:
                            review_text = "average"
                        review_text = re.sub(r"[^a-zA-Z0-9\s']", '', review_text)
                        review_text = review_text.replace("'","")
                        sentiment_score, text_embedding = preprocess_fun(review_text)

                        toreviews=[rev_rating, review_text, reliability_count, is_local_guide, sentiment_score]

                        if toreviews[0] == "" or toreviews[0] == None or toreviews[0] == "null":
                            toreviews[0] = 3
                        if toreviews[2] == "" or toreviews[2] == None or toreviews[2] == "null":
                            toreviews[2] = 0
                        if toreviews[3] == "" or toreviews[3] == None or toreviews[3] == "null":
                            toreviews[3] = False


                        update_rev_sql = f"""
                        INSERT INTO test.reviews(rev_rating, review_text, reliability_score, is_local_guide, rest_id, sentiment_score)
                        VALUES({toreviews[0]}, '{toreviews[1]}', '{toreviews[2]}', '{toreviews[3]}','{rest_id}', {sentiment_score})
                        """
                        cur.execute(update_rev_sql)

                        print("updated reviews")

                print(location)
                conn.commit()
                return rest_ids, rest_names
            
        except (psycopg2.DatabaseError, Exception) as error:
            print(error)
            conn.rollback()
        
def main_connect(location):
    name = 'top-restaurants-in-' + location
    file_path = 'output/'+name+'/json/'+'places-of-'+name+'.json'
    print(file_path)
    rest_ids, rest_names = extract_data_for_restaurant(file_path, location)
    print(rest_names)
    for each in rest_ids:
        feature_main_function(each)
    graph_fun(location)
    if rest_names:
        for each in rest_names:
            main_function(location, each[0], each[1], 0)
    return True

# main_connect("nerul", 3)

    


