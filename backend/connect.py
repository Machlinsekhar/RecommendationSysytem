import psycopg2
from config import load_config
from cbf_pipeline.fetchList import google_search
from cbf_pipeline.dataCollect import start_function
from cbf_pipeline.preprocess import preprocess_fun
from graph import graph_fun

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
                    rest_info, review_data = start_function(location, resto, 0)

                    if rest_info:

                        add_resto_sql = f"""
                        INSERT INTO test.restaurants(rest_name, loc_id)
                        VALUES('{resto}',{loc_id});
                        SELECT rest_id FROM test.restaurants WHERE rest_name = '{resto}';
                        """
                        cur.execute(add_resto_sql)
                        rest_id = cur.fetchone()[0]
                        print("extracted rest_id", rest_id)

                        update_resto_sql = f"""
                        UPDATE test.restaurants
                        SET rest_budget = '{rest_info[0]}', rest_cuisine = '{rest_info[1]}', rest_rating = {rest_info[2]}, rev_count = {rest_info[3]}
                        WHERE rest_name = '{resto}'
                        """
                        cur.execute(update_resto_sql)
                        print("updated restaurants")

                        for review in review_data:
                            actual_review = f'{review[2]}'
                            sentiment_score = preprocess_fun(actual_review)

                            update_rev_sql = f"""
                            INSERT INTO test.reviews(rev_name, rev_rating, review, rest_id, sentiment_score)
                            VALUES('{review[0]}', {review[1]}, (%s), {rest_id}, {sentiment_score})
                            """
                            cur.execute(update_rev_sql, (actual_review,))

                        print("updated reviews")

            conn.commit()
            graph_fun(loc_id)
        
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)
        conn.rollback()


if __name__ == '__main__':
    config = load_config()
    connect(config)