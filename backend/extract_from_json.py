import psycopg2
from config import load_config
from image_scraper import main_function
from cbf_pipeline.preprocess import preprocess_fun
from graph import graph_fun
import re
import json

def extract_data_for_restaurant(file_path, loc_id):
    config = load_config()
    rest_names = []
    torestaurants = []
    toreviews = []

    with open(file_path, 'r') as file:
        data = json.load(file)
        try:
            with psycopg2.connect(**config) as conn:
                print('Connected to the PostgreSQL server.')
                cur = conn.cursor()
                for restaurant in data:
                    print(restaurant)
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
                    
                    torestaurants[0][1] = re.sub(r"[^a-zA-Z0-9\s']", '', torestaurants[0][1])
                    torestaurants[0][1] = torestaurants[0][1].replace("'","")

                    print(torestaurants[0][1])
                    add_resto_sql = f"""
                    INSERT INTO test.restaurants(rest_id, rest_name, loc_id)
                    VALUES('{torestaurants[0][0]}','{torestaurants[0][1]}',{loc_id});
                    """
                    cur.execute(add_resto_sql)
                    rest_id = torestaurants[0][0]
                    print("extracted rest_id", rest_id)

                    print(torestaurants[0][1])
                    rest_names.append((torestaurants[0][1],torestaurants[0][7]))

                    if torestaurants[0][2] == '' or torestaurants[0][2] == None:
                        temp_list = list(torestaurants[0])
                        temp_list[2] = 'Moderately expensive'
                        torestaurants[0] = tuple(temp_list)

                    update_resto_sql = f"""
                    UPDATE test.restaurants
                    SET rest_budget = '{torestaurants[0][2]}', rest_rating = {torestaurants[0][3]}, rest_rev_count = {torestaurants[0][4]}, address = '{torestaurants[0][7]}', main_category ='{torestaurants[0][5]}', categories = (ARRAY{torestaurants[0][6]})
                    WHERE rest_id = '{rest_id}'
                    """
                    cur.execute(update_resto_sql)
                    print("updated restaurants")

                    for review in restaurant.get('detailed_reviews', []):
                        print("inside reviews")
                        rev_rating = review.get('rating', 3)
                        review_text = review.get('review_text', '')
                        reliability_count = review.get('total_number_of_reviews_by_reviewer', 0)
                        is_local_guide = review.get('is_local_guide', False)

                        review_text = re.sub(r"[^a-zA-Z0-9\s']", '', review_text)
                        review_text = review_text.replace("'","")
                        sentiment_score = preprocess_fun(review_text)

                        toreviews=[rev_rating, review_text, reliability_count, is_local_guide, sentiment_score]

                        update_rev_sql = f"""
                        INSERT INTO test.reviews(rev_rating, review_text, reliability_score, is_local_guide, rest_id, sentiment_score)
                        VALUES({toreviews[0]}, '{toreviews[1]}', '{toreviews[2]}', '{toreviews[3]}','{rest_id}', {sentiment_score})
                        """
                        cur.execute(update_rev_sql)

                        print("updated reviews")

                    conn.commit()

                print(loc_id)
                graph_fun(loc_id)

                return rest_names
            
        except (psycopg2.DatabaseError, Exception) as error:
            print(error)
            conn.rollback()
        
def main_connect(location, loc_id):
    name = 'top-restaurants-in-' + location
    file_path = 'output/'+name+'/json/'+'places-of-'+name+'.json'
    print(file_path)
    rest_names = extract_data_for_restaurant(file_path, loc_id)
    if rest_names != None:
        for each in rest_names:
            main_function(location, each[0], each[1], 0)
    return True

# main_connect("nerul", 3)

    


