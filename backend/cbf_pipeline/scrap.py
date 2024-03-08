import psycopg2
from config import load_config
from extract_from_json import main_connect
from google_scraper_new.main import scrape_data
import shutil

def check_path(location):
    config = load_config()
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
                return True
            else:
                print('does not exist')

                queries = []
                query = "top restaurants in " + location
                queries.append(query)
                scrape_data(queries) # call to scrape data

                status = main_connect(location) # call for database storage

                if status:

                    add_sql = f"""
                    INSERT INTO test.locations(loc_name)
                    VALUES('{location}');
                    """
                    cur.execute(add_sql)

                    conn.commit()

                    name = 'top-restaurants-in-' + location
                    # directory_path = 'output\\all'
                    # shutil.rmtree(directory_path)
                    # directory_path = 'output\\'+name
                    # shutil.rmtree(directory_path)
                    # directory_path = 'cache'
                    # shutil.rmtree(directory_path)
                    return True
                     

    except (psycopg2.DatabaseError, Exception) as error:
            print(error)
            conn.rollback()


# location = 'bandra'
# check_path(location)