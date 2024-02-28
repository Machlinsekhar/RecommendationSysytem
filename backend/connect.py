import psycopg2
from config import load_config
from cbf_pipeline.fetchList import google_search
from cbf_pipeline.dataCollect import start_function

def connect(config):

    location = 'hyderabad'

    try:
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            cur = conn.cursor()

            check_sql = f"""
                SELECT EXISTS(SELECT 1 FROM test.locations WHERE loc_name='{location}')
            """
            cur.execute(check_sql)

            bool_val = cur.fetchone()[0]
            if bool_val:
                print('exists')
            else:
                print('does not exist')
                add_sql = f"""
                INSERT INTO test.locations(loc_name)
                VALUES('{location}');
                SELECT loc_id FROM test.locations WHERE loc_name = '{location}';
                """
                cur.execute(add_sql)
                loc_id = cur.fetchone()[0]
                top_restaurants = google_search("top restaurants in", location)

                for resto in top_restaurants:
                    resto=resto.lower()
                    add_resto_sql = f"""
                    INSERT INTO test.restaurants(rest_name, loc_id)
                    VALUES('{resto}',{loc_id});
                    SELECT rest_id FROM test.restaurants WHERE rest_name = '{resto}';
                    """
                    cur.execute(add_resto_sql)
                    rest_id = cur.fetchone()[0]
                    print("extracted rest_id")
                    rest_info, review_data = start_function(location, resto)

                    update_resto_sql = f"""
                    UPDATE test.restaurants
                    SET rest_budget = '{rest_info[0]}', rest_cuisine = '{rest_info[1]}', rest_rating = {rest_info[2]}, rev_count = {rest_info[3]}, rest_img = {rest_info[4]}
                    WHERE rest_name = '{resto}'
                    """
                    cur.execute(update_resto_sql)
                    print("updated restaurants")

                    for review in review_data:
                        actual_review = f'{review[2]}'
                        update_rev_sql = f"""
                        INSERT INTO test.reviews(rev_name, rev_rating, review, rest_id)
                        VALUES('{review[0]}', {review[1]}, (%s), {rest_id})
                        """
                        cur.execute(update_rev_sql, (actual_review,))
                    print("updated reviews")

            conn.commit()
        
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)
        conn.rollback()


if __name__ == '__main__':
    config = load_config()
    connect(config)