import pandas as pd
# import os
import psycopg2
from config import load_config

def recommend_restaurants(min_rating, restaurant_type, budget_range, location):
    config = load_config()
    restaurant_names = []
    print(min_rating, restaurant_type, budget_range, location )

    # backend_path = os.path.dirname(__file__)
    # profile_path = os.path.join( backend_path, f'..\dataset\{location}',f"{location}_profile.csv")
    # data = pd.read_csv(profile_path)

    try:
        with psycopg2.connect(**config) as conn:
            cur = conn.cursor()

            match_query = f"""
                SELECT rest_name
                FROM test.restaurants
                WHERE main_category = '{restaurant_type}' and loc_id = (SELECT loc_id FROM test.locations WHERE loc_name = '{location}')
                ORDER BY rest_rating DESC
            """
            cur.execute(match_query)
            rows = cur.fetchall()
            restaurant_names = [row[0] for row in rows]

            unmatch_query = f"""
                SELECT rest_name
                FROM test.restaurants
                WHERE main_category != '{restaurant_type}' and loc_id = (SELECT loc_id FROM test.locations WHERE loc_name = '{location}')
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

