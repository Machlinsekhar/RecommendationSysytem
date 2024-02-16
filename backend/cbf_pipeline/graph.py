# nltk.download('vader_lexicon')

import os
import matplotlib.pyplot as plt
import pandas as pd

# jagah = "pune"

def graph_fun(jagah):
    folder_path = f'backend/dataset/{jagah}'
    main_csv_file = f'{jagah}_profile.csv'
    main_df = pd.read_csv(os.path.join(folder_path, main_csv_file))
    file_names = main_df['restaurant_name']
    names=[]
    for name in file_names:
        names.append(name)

    for file in names:
        csv_folder = f"backend/dataset/{jagah}/reviews/{file}"
        name_csv = file + '.csv'
        csv_path = os.path.join(csv_folder, name_csv)
        df = pd.read_csv(csv_path,  encoding='latin1')

        sentiment_labels_order = ['negative', 'neutral', 'positive']
        sentiment_labels = df['sentiment'].map({-1: 'negative', 0: 'neutral', 1: 'positive'})
        sentiment_counts = sentiment_labels.value_counts().reindex(sentiment_labels_order).fillna(0)
        rating_counts = df['Rating'].value_counts()

        name = os.path.splitext(file)[0]
        os.makedirs(f"backend/dataset/{jagah}/graphs/{file}", exist_ok=True)

        # Plot and save sentiment graph
        plt.bar(sentiment_counts.index, sentiment_counts.values, color="#869937")
        plt.xlabel('Sentiment')
        plt.ylabel('Count')
        plt.title('Sentiment Analysis')
        plt.savefig(os.path.join(f'backend/dataset/{jagah}/graphs', name, 'sentiment_graph.png'))
        plt.close()
        
        # Plot and save rating graph
        plt.bar(rating_counts.index, rating_counts.values, color="#0B3012")
        plt.xlabel('Rating')
        plt.ylabel('Count')
        plt.title('Rating Analysis')
        plt.savefig(os.path.join(f'backend/dataset/{jagah}/graphs', name, 'rating_graph.png'))
        plt.close()

# graph_fun("pune")