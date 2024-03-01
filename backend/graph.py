# nltk.download('vader_lexicon')

import os
import matplotlib.pyplot as plt
import pandas as pd
import psycopg2
from config import load_config
from dotenv import load_dotenv

load_dotenv()
uploads_directory = os.getenv("UPLOADS_DIRECTORY")

# jagah = "pune"

def graph_fun(loc_id):
    # folder_path = f'backend/dataset/{jagah}'
    # main_csv_file = f'{jagah}_profile.csv'
    # main_df = pd.read_csv(os.path.join(folder_path, main_csv_file))
    # file_names = main_df['restaurant_name']
    # names=[]
    # for name in file_names:
    #     names.append(name)

    config = load_config()
    try:
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            cur = conn.cursor()

            fetch_location = f"""
                SELECT loc_name FROM test.locations WHERE loc_id={loc_id}
            """
            cur.execute(fetch_location)
            jagah = cur.fetchone()[0]
            print(jagah)

            fetch_rest_sql = f"""
                SELECT rest_id FROM test.restaurants WHERE loc_id={loc_id}
            """
            cur.execute(fetch_rest_sql)
            rest_raw = cur.fetchall()
            rest_ids = []
            for item in rest_raw:
                rest_ids.append(item[0])
            print(rest_ids)

            for id in rest_ids:

                fetch_name_sql = f"""
                    SELECT rest_name FROM test.restaurants WHERE rest_id={id}
                """
                cur.execute(fetch_name_sql)
                name = cur.fetchone()[0]
                print(name)

                # RATING GRAPH
                fetch_rev_rating_sql = f"""
                    SELECT rev_rating FROM test.reviews WHERE rest_id={id}
                """
                cur.execute(fetch_rev_rating_sql)
                ratings_raw = cur.fetchall()
                ratings=[]
                for each in ratings_raw:
                    ratings.append(int(each[0]))
                ratings = pd.DataFrame(ratings)
                rating_counts = ratings[0].value_counts()
                print("stored ratings")

                # Plot and save rating graph
                plt.bar(rating_counts.index, rating_counts.values, color="#0B3012")
                plt.xlabel('Rating')
                plt.ylabel('Count')
                plt.title('Rating Analysis')
                plt.savefig(os.path.join(f'{uploads_directory}/{jagah}', f'{name}_rating_graph.jpg'))
                plt.close()
                print("plotted rating and stored")

                # SENTIMENT GRAPH
                fetch_sentiments_sql = f"""
                    SELECT sentiment_score FROM test.reviews WHERE rest_id={id}
                """
                cur.execute(fetch_sentiments_sql)
                sentiments_raw = cur.fetchall()
                sentiments=[]
                for each in sentiments_raw:
                    sentiments.append(each[0])
                sentiments = pd.DataFrame(sentiments)
                print("stored sentiments")

                sentiment_labels_order = ['negative', 'neutral', 'positive']
                sentiment_labels = sentiments[0].map({-1: 'negative', 0: 'neutral', 1: 'positive'})
                sentiment_counts = sentiment_labels.value_counts().reindex(sentiment_labels_order).fillna(0)

                # Plot and save sentiment graph
                plt.bar(sentiment_counts.index, sentiment_counts.values, color="#869937")
                plt.xlabel('Sentiment')
                plt.ylabel('Count')
                plt.title('Sentiment Analysis')
                plt.savefig(os.path.join(f'{uploads_directory}/{jagah}', f'{name}_sentiment_graph.jpg'))
                plt.close()
                print("plotted sentiments and stored")

                rest_name = f"{name}.jpg"
                rest_graph_1 = f"{name}_rating_graph.jpg"
                rest_graph_2 = f"{name}_sentiment_graph.jpg"

                store_img_name_sql = f"""
                    INSERT INTO test.images(img_name)
                    VALUES('{rest_name}'),
                        ('{rest_graph_1}'),
                        ('{rest_graph_2}');
                """
                cur.execute(store_img_name_sql) 

                store_img_id_sql = f"""
                    UPDATE test.restaurants
                    SET img_id = (SELECT img_id FROM test.images WHERE img_name = '{rest_name}')
                    WHERE rest_id = {id}
                """
                cur.execute(store_img_id_sql)

            conn.commit()
            
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)
        conn.rollback()

    # for file in rest_list:
    #     # csv_folder = f"backend/dataset/{jagah}/reviews/{file}"
    #     # name_csv = file + '.csv'
    #     # csv_path = os.path.join(csv_folder, name_csv)
    #     # df = pd.read_csv(csv_path,  encoding='latin1')

    #     name = os.path.splitext(file)[0]
    #     os.makedirs(f"backend/dataset/{jagah}/graphs/{file}", exist_ok=True)
        
# graph_fun("pune")
# graph_fun(29)