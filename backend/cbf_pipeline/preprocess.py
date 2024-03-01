import os
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
sid = SentimentIntensityAnalyzer()

# INPUT
# jagah = "pune"

def preprocess_fun(review_text):
    # folder_path = f'backend/dataset/{jagah}'
    # main_csv_file = f'{jagah}_profile.csv'
    # main_df = pd.read_csv(os.path.join(folder_path, main_csv_file))
    # file_names = main_df['restaurant_name']
    # names=[]
    # for name in file_names:
    #     names.append(name)

    # avg_array = []
    # recs = []

    sentiment_score = sid.polarity_scores(review_text)
    if sentiment_score['compound'] > 0:
        return 1
    elif sentiment_score['compound'] < 0:
        return -1
    else:
        return 0

    # for file in names:
    #     print(file,' here now')
    #     sentiment = []
    #     name_csv = file + '.csv'
    #     csv_folder = f"backend/dataset/{jagah}/reviews/{file}"
    #     csv_path = os.path.join(csv_folder, name_csv)
    #     df = pd.read_csv(csv_path)

    #     avg_rating = df['Rating'].mean()
    #     avg_array.append(avg_rating)

    #     reviews = df['Review']
    #     for review in reviews:   
    #         sentiment_scores = sid.polarity_scores(review)
    #         if sentiment_scores['compound'] > 0:
    #             sentiment.append(1)
    #         elif sentiment_scores['compound'] < 0:
    #             sentiment.append(-1)
    #         else:
    #             sentiment.append(0)
    #     df['sentiment'] = sentiment
    #     df.to_csv(csv_path, index=False)

        # if not df['Recommended dishes'].dropna().empty:
        #     dishes = df['Recommended dishes'].dropna().str.cat(sep=',')
        #     sep_dishes = dishes.split(',')
        #     cleaned_text = [element.strip() for element in sep_dishes]
        #     unique_dishes = list(set(cleaned_text))
        #     recs.append(unique_dishes)
        # else:
        #     recs.append([])

    # main_df['rec_dishes'] = recs
    # main_df.to_csv(f'backend/dataset/{jagah}/{jagah}_profile.csv', index=False)

    # main_df['avg_rating'] = avg_array
    # main_df.to_csv(f'backend/dataset/{jagah}/{jagah}_profile.csv', index=False)

# print(preprocess_fun("its average."))