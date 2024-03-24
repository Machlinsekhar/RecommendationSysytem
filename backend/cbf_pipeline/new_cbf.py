# Assuming necessary libraries are already installed
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim import corpora, models
import gensim
import spacy
from textblob import TextBlob
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords', quiet=True)
spacy.cli.download("en_core_web_sm")
nlp = spacy.load("en_core_web_sm")

def preprocess_text(text):
    return ' '.join([token.lemma_ for token in nlp(text.lower()) if token.text not in custom_stopwords and not token.is_punct and not token.is_space])

# LDA for Topic Modeling
def prepare_lda_data(texts):
    processed_docs = [[word for word in doc.split()] for doc in texts]
    dictionary = corpora.Dictionary(processed_docs)
    corpus = [dictionary.doc2bow(doc) for doc in processed_docs]
    return dictionary, corpus

# Feature Opinion Mining
def extract_feature_opinions(texts):
    opinions = []
    for text in texts:
        doc = nlp(text)
        for token in doc:
            if token.pos_ == "ADJ":
                for child in token.head.children:
                    if child.pos_ == "NOUN":
                        opinions.append((child.text, token.text))
    return opinions[:2]  # Return up to 2 feature-opinion pairs

# Load datasets
restaurants_df = pd.read_csv('restaurants.csv')
reviews_df = pd.read_csv('reviews.csv')

# Fill missing values
restaurants_df.fillna('', inplace=True)
reviews_df.fillna('', inplace=True)

# Define custom stopwords and convert to list for TfidfVectorizer
base_stopwords = set(stopwords.words('english'))
custom_stopwords = base_stopwords | {'place', 'food', 'taste', 'good', 'chicken', 'restaurant'}
custom_stopwords_list = list(custom_stopwords)  # Convert to list

# Enhanced Preprocessing Function

# Join and preprocess reviews
reviews_grouped = reviews_df.groupby('rest_id')['review_text'].apply(list).reset_index()
restaurants_reviews = pd.merge(restaurants_df, reviews_grouped, on='rest_id', how='left')
restaurants_reviews['preprocessed_reviex`ws'] = restaurants_reviews['review_text'].apply(lambda reviews: ' '.join([preprocess_text(review) for review in reviews]))

# Adjusting TF-IDF Vectorizer parameters with corrected stopwords list
tfidf_vectorizer = TfidfVectorizer(stop_words=custom_stopwords_list, max_features=5, max_df=0.5, min_df=2, ngram_range=(1,2))
tfidf_matrix = tfidf_vectorizer.fit_transform(restaurants_reviews['preprocessed_reviews'].astype('U'))
features = tfidf_vectorizer.get_feature_names_out()
restaurants_reviews['tfidf_keywords'] = [list(features[np.argsort(x)[-5:]]) for x in tfidf_matrix.toarray()]

dictionary, corpus = prepare_lda_data(restaurants_reviews['preprocessed_reviews'].astype('U'))
lda_model = gensim.models.LdaMulticore(corpus, num_topics=5, id2word=dictionary, passes=10, workers=2)
restaurants_reviews['lda_topics'] = [lda_model.get_document_topics(item) for item in corpus]


restaurants_reviews['feature_opinions'] = restaurants_reviews['review_text'].apply(lambda texts: extract_feature_opinions(texts) if isinstance(texts, list) else [])

# Sentiment Analysis and Review Count Incorporation
restaurants_reviews['positive_sentiment_count'] = restaurants_reviews.apply(lambda row: sum([1 for text in row['review_text'] if text and TextBlob(text).sentiment.polarity > 0]), axis=1)
restaurants_reviews['review_count'] = restaurants_reviews['review_text'].apply(lambda x: len(x) if isinstance(x, list) else 0)

# Scoring Logic
restaurants_reviews['score'] = restaurants_reviews['positive_sentiment_count'] + restaurants_reviews['review_count']

# User Input Filters
budget = 2  # Example user input
main_category = "Indian restaurant"  # Example user input

# Apply budget filter and attempt to match main_category
filtered_restaurants = restaurants_reviews[
    (restaurants_reviews['rest_budget'].astype(int) <= budget)
    # & (restaurants_reviews['main_category'].str.contains(main_category, case=False, na=False))
]

# # If no exact main_category matches, recommend based on similar keywords/topics
# if filtered_restaurants.empty:
#     filtered_restaurants = restaurants_reviews[restaurants_reviews['rest_budget'].astype(int) <= budget]

# Recommend Top 10 Restaurants based on the score and filters
top_10_restaurants = filtered_restaurants.sort_values(by='score', ascending=False).head(10)[['rest_name', 'score', 'tfidf_keywords', 'feature_opinions']]
print(top_10_restaurants)