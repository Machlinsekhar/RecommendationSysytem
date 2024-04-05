import psycopg2
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from config import load_config
import warnings
import matplotlib.pyplot as plt
import os
from dotenv import load_dotenv

warnings.filterwarnings('ignore')
uploads_directory = os.getenv("UPLOADS_DIRECTORY")
config = load_config()

def fetch_data(rest_type, budget):

    try:
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            cur = conn.cursor()

            restaurants_query = f"""SELECT * FROM test.restaurants
            WHERE '{rest_type}' = ANY(categories) and rest_budget<= {budget};"""
            
            df_restaurants = pd.read_sql_query(restaurants_query, conn)
            df_reviews = pd.DataFrame()

            for i in df_restaurants.itertuples():
                reviews_query = f"""SELECT * FROM test.reviews WHERE rest_id = '{i[1]}';""" 
                df_reviews = pd.concat([df_reviews, pd.read_sql_query(reviews_query, conn)])
    
            return df_restaurants, df_reviews
        
    except (psycopg2.DatabaseError, Exception) as error:
            print(error)
            conn.rollback()

def weight_reviewer(local_guide_status, history_count, sentiment):
    weight = 1 + sentiment * 0.5

    if local_guide_status:
        weight += 1  

    weight += min(history_count / 100, 1)

    return weight

def make_pie_chart(final_df):
    weight_rest_rating = 0.4
    weight_total_reviews = 0.2
    weight_likeability_score = 0.4

    for index, row in final_df.iterrows():
        contributions = [
            row['rest_rating'] * weight_rest_rating,
            row['rest_rev_count_normalized'] * weight_total_reviews,
            row['likeability_score'] * weight_likeability_score
        ]
        labels = ['Rest Rating', 'Review Count', 'Likeability Score']
        
        plt.figure(figsize=(6, 6))
        plt.pie(contributions, labels=labels, autopct='%1.1f%%', startangle=140)
        plt.title(f'Composite Score Contributions for {row["rest_name"]}')
        filename = os.path.join("uploads", f"{row['rest_name']}_piechart.png")
        plt.savefig(filename)
        plt.close()

def check_cuisine(rest_type):
    try:
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            cur = conn.cursor()

            cuisine_query = f"""SELECT EXISTS(SELECT 1 FROM cuisine_table WHERE cuisine = %s);"""
            cur.execute(cuisine_query, (rest_type,))
            exists = cur.fetchone()[0]
            return False
        
    except Exception as e:
        print(f"Database error: {e}")
        return True
    
def add_cuisine(rest_type):
    try:
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            cur = conn.cursor()

            add_cuisine_query = f"""INSERT INTO test.cuisine_table(cuisine) VALUES('%s');"""
            cur.execute(add_cuisine_query, (rest_type,))
        
    except (psycopg2.DatabaseError, Exception) as error:
            print(error)
            conn.rollback()

def cbf_main_function(rest_type, user_budget):
    df_restaurants, df_reviews = fetch_data(rest_type, user_budget)
    df_reviews['reviewer_weight'] = df_reviews.apply(lambda row: weight_reviewer(row['is_local_guide'], row['reliability_score'], row['sentiment_score']), axis=1)
    df_reviews['weighted_review_rating'] = df_reviews['rev_rating'] * df_reviews['reviewer_weight']

    likeability_scores = df_reviews.groupby('rest_id')['weighted_review_rating'].mean().reset_index()
    likeability_scores.rename(columns={'weighted_review_rating': 'likeability_score'}, inplace=True)
    df_restaurants = pd.merge(df_restaurants, likeability_scores, on='rest_id', how='left')

    scaler = MinMaxScaler(feature_range=(0.01, 1))

    df_restaurants['rest_rev_count_normalized'] = (df_restaurants['rest_rev_count'] - df_restaurants['rest_rev_count'].min()) / (df_restaurants['rest_rev_count'].max() - df_restaurants['rest_rev_count'].min())

    features_to_scale = ['rest_rating', 'rest_rev_count_normalized', 'likeability_score']
    df_restaurants[features_to_scale] = scaler.fit_transform(df_restaurants[features_to_scale])

    weight_rest_rating = 0.4
    weight_total_reviews = 0.2
    weight_likeability_score = 0.4

    df_restaurants['composite_score'] = (
        df_restaurants['rest_rating'] * weight_rest_rating +
        df_restaurants['rest_rev_count_normalized'] * weight_total_reviews +
        df_restaurants['likeability_score'] * weight_likeability_score
    )

    ranked_restaurants = df_restaurants.sort_values(by='composite_score', ascending=False)
    final_df = ranked_restaurants[['rest_id','rest_name', 'rest_rating', 'rest_rev_count_normalized', 'likeability_score', 'composite_score']].head(7) 

    if check_cuisine(rest_type):
        make_pie_chart(final_df)
        add_cuisine(rest_type)

    return ranked_restaurants['rest_name'].head(7).to_list()

# rest = cbf_main_function(rest_type = "Chinese restaurant", user_budget = 2)
# print(rest)
