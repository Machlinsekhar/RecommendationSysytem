import os
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
sid = SentimentIntensityAnalyzer()

# INPUT
jagah = "nerul"

folder_path = f'dataset/{jagah}'
main_csv_file = f'{jagah}_profile.csv'
main_df = pd.read_csv(os.path.join(folder_path, main_csv_file))
file_names = main_df['restaurant_name']
csv_files=[]
for name in file_names:
    name_csv = name + '.csv'
    csv_files.append(name_csv)

avg_array = []
recs = []
for file in csv_files:
    sentiment = []

    csv_folder = f"dataset/{jagah}/reviews"
    csv_path = os.path.join(csv_folder, file)
    df = pd.read_csv(csv_path)

    avg_rating = df['Rating'].mean()
    avg_array.append(avg_rating)

    reviews = df['Review']
    for review in reviews:   
        sentiment_scores = sid.polarity_scores(review)
        if sentiment_scores['compound'] > 0:
            sentiment.append(1)
        elif sentiment_scores['compound'] < 0:
            sentiment.append(-1)
        else:
            sentiment.append(0)
    df['sentiment'] = sentiment
    df.to_csv(csv_path, index=False)

    dishes =  df['Recommended dishes'].dropna().str.cat(sep=',')
    sep_dishes = dishes.split(',')
    cleaned_text = [element.strip() for element in sep_dishes]
    unique_dishes = list(set(cleaned_text))
    recs.append(unique_dishes)

main_df['rec_dishes'] = recs
main_df.to_csv(f'dataset/{jagah}/{jagah}_profile.csv', index=False)

main_df['avg_rating'] = avg_array
main_df.to_csv(f'dataset/{jagah}/{jagah}_profile.csv', index=False)