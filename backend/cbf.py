import pandas as pd
# import os
import psycopg2
from config import load_config

def recommend_restaurants(min_rating, restaurant_type, budget_range, location):
    config = load_config()
    restaurant_names = []
    print(min_rating, restaurant_type, budget_range, location )

    if budget_range.lower() == "inexpensive":
        budget_range = 0
    elif budget_range.lower() == "moderate":
        budget_range = 1
    elif budget_range.lower() == "expensive":
        budget_range = 2
    elif budget_range.lower() == "very expensive":
        budget_range = 3
    # backend_path = os.path.dirname(__file__)
    # profile_path = os.path.join( backend_path, f'..\dataset\{location}',f"{location}_profile.csv")
    # data = pd.read_csv(profile_path)

    new_type_name = restaurant_type.lower() + ' restaurant'

    try:
        with psycopg2.connect(**config) as conn:
            cur = conn.cursor()

            match_query = f"""
                SELECT rest_name
                FROM test.restaurants
                WHERE LOWER(main_category) = '{new_type_name}' and rest_location = '{location}' and rest_budget <= {budget_range}
                ORDER BY rest_rating DESC
            """
            cur.execute(match_query)
            rows = cur.fetchall()
            restaurant_names = [row[0] for row in rows]

            unmatch_query = f"""
                SELECT rest_name
                FROM test.restaurants
                WHERE LOWER(main_category) != '{new_type_name}' and rest_location = '{location}'and rest_budget <= {budget_range}
                ORDER BY rest_rating DESC
            """
            cur.execute(unmatch_query)
            rows = cur.fetchall()
            for row in rows:
                print(row[0])
                restaurant_names.append(row[0])

            print(restaurant_names)
            return restaurant_names
        
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)
        conn.rollback()

# Example usage
# min_rating = 4
# restaurant_type = ''
# budget_range = 'expensive'
# location = 'nerul'

# recommend_restaurants(4, "north indian", 2, "hyderabad")

