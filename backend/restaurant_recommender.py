import pandas as pd
import os
import nltk
from textblob import TextBlob
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt

# nltk.download('stopwords')
# nltk.download('wordnet')

stop_words = set(nltk.corpus.stopwords.words('english'))
lemmatizer = nltk.stem.WordNetLemmatizer()
positive_words = ['good', 'great', 'excellent', 'amazing', 'fantastic', 'love', 'liked', 'best', 'positive', 'awesome']
negative_words = ['bad', 'worst', 'horrible', 'terrible', 'hate', 'dislike', 'negative']

def normalize_score(score, min_score, max_score):
    normalized = ((score - min_score) / (max_score - min_score)) * 99 + 1
    return normalized

def convert_sentiment(sentiment):
    if sentiment == 0:
        return 0
    elif -1 <= sentiment <= -0.5:
        return -1
    elif 0.5 <= sentiment <= 1:
        return 1
    elif -0.5 < sentiment < 0:
        return -0.5
    elif 0 < sentiment < 0.5:
        return 0.5
    else:
        return None

def process_reviews(filename):
    df = pd.read_csv(filename, encoding='ISO-8859-1')
    df.dropna(inplace=True)
    df['review_length'] = df['Review'].apply(len)
    df['rating'] = df['Rating'].str.split().str[0].astype(float)
    df['positive_word_count'] = df['Review'].apply(lambda x: sum(1 for word in x.split() if word.lower() in positive_words))
    df['negative_word_count'] = df['Review'].apply(lambda x: sum(1 for word in x.split() if word.lower() in negative_words))
    df['processed_reviews'] = df['Review'].apply(lambda x: ' '.join([lemmatizer.lemmatize(word) for word in x.split() if word.lower() not in stop_words]))
    df['sentiment_numerical'] = df['Review'].apply(lambda x: convert_sentiment(TextBlob(str(x)).sentiment.polarity))
    
    print(df['sentiment_numerical'].unique())

    restaurant_name = os.path.splitext(os.path.basename(filename))[0]
    restaurant_name = restaurant_name.replace('_', ' ')
    restaurant_name = ' '.join(word.capitalize() for word in restaurant_name.split())
    restaurant_type = df['Type'].mode().iloc[0].replace('restaurant', '').strip()

    restaurant_profile = {
        "Restaurant Name": restaurant_name,
        "Average Rating": round(df['rating'].mean(), 2),
        "Restaurant Type": restaurant_type,
        "Average Cost": df['Expense'].mode().iloc[0]
    }

    df['review_score'] = df['review_length'] + (df['positive_word_count'] - df['negative_word_count']) + 5 * df['sentiment_numerical']
    min_score = df['review_score'].min()
    max_score = df['review_score'].max()
    df['review_score'] = df['review_score'].apply(lambda x: normalize_score(x, min_score, max_score))
    restaurant_profile["Average Review Score"] = round(df['review_score'].mean(), 2)

    return restaurant_profile

def generate_profiles(location):
    # restaurant_files = [
    #     './Dataset/Shree_Nerul_Cafe.csv',
    #     './Dataset/Shy_Cafe_and_Bar.csv',
    #     './Dataset/Barbeque_Nation.csv',
    #     './Dataset/Ahmed_Bhais.csv'
    # ]

    restaurant_files=[]

    folder_path = os.path.join(".\\Dataset\\",location)

    if not os.path.exists(folder_path):
        print('path does not exist')

    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        restaurant_files.append(file_path)

    profiles = [process_reviews(restaurant_file) for restaurant_file in restaurant_files]
    profiles_df = pd.DataFrame(profiles)
    
    # Making sure the output directory exists
    if not os.path.exists('./Output'):
        os.makedirs('./Output')

    profiles_df.to_csv("./Output/restaurant_profiles.csv", index=False)

def get_user_recommendations(location, user_rating, user_restaurant_type, user_max_cost):

    generate_profiles(location)

    df_restaurants = pd.read_csv("./Output/restaurant_profiles.csv")

    df_transformed = pd.DataFrame()
    df_transformed["Average Rating"] = df_restaurants["Average Rating"]
    df_transformed["Restaurant Type"] = df_restaurants["Restaurant Type"].apply(lambda x: 1 if x.lower() == user_restaurant_type else 0)
    df_transformed["Average Cost"] = df_restaurants["Average Cost"].apply(lambda x: 1 if x.lower() == user_max_cost else 0)
    df_transformed["Average Review Score"] = df_restaurants["Average Review Score"]

    user_profile = {
        "Average Rating": user_rating,
        "Restaurant Type": 1 if user_restaurant_type in df_restaurants["Restaurant Type"].str.lower().tolist() else 0,
        "Average Cost": 1 if user_max_cost in df_restaurants["Average Cost"].str.lower().tolist() else 0,
        "Average Review Score": 30
    }

    print(user_profile)

    cosine_similarities = cosine_similarity([list(user_profile.values())], df_transformed.values)
    df_restaurants['similarity'] = cosine_similarities[0]
    recommendations = df_restaurants.sort_values(by="similarity", ascending=False)
    recommendations_list = recommendations[["Restaurant Name", "similarity"]].to_dict(orient='records')

    return recommendations_list

# generate_profiles()

print(get_user_recommendations('Nerul',4, 'chinese', 'expensive'))
