import spacy
from collections import Counter
import psycopg2
from config import load_config

# Load the spaCy language model
nlp = spacy.load("en_core_web_sm")

def extract_feature_opinions(text):
    """Extracts feature-opinion pairs from a single review text."""
    opinions = []
    doc = nlp(text)
    for token in doc:
        if token.pos_ == "ADJ":  # Adjectives
            for child in token.head.children:
                if child.pos_ == "NOUN":  # Related nouns
                    opinions.append((child.text, token.text))
    return opinions

def fetch_reviews_for_restaurant(restaurant_id):
    """Fetches review texts for a given restaurant ID from a database."""
    sample_reviews = []

    config = load_config()
    try:
        # Establish a database connection
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            cur = conn.cursor()

            # Prepare and execute the SQL query
            fetch_rest_sql = f"""
                SELECT rev_id, review_text FROM test.reviews WHERE rest_id='{restaurant_id}'
            """
            cur.execute(fetch_rest_sql)
            rest_raw = cur.fetchall()

            # Populate the list with review texts
            for item in rest_raw:
                sample_reviews.append(item[1])

    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

    return sample_reviews

def main(restaurant_id):
    """Main function to perform feature-opinion mining on reviews for a given restaurant ID."""
    review_texts = fetch_reviews_for_restaurant(restaurant_id)
    aggregated_opinions = []

    for text in review_texts:
        aggregated_opinions.extend(extract_feature_opinions(text))
    
    # Aggregate and count the occurrences of each feature-opinion pair
    feature_opinion_counts = Counter(aggregated_opinions)
    
    # Extract the top 3 most common feature-opinion pairs
    top_feature_opinions = feature_opinion_counts.most_common(3)
    
    # Return only the feature-opinion pairs, excluding the frequency
    return [pair for pair, count in top_feature_opinions]

def update_feature_opinions(restaurant_id, feature_opinions):
    """Updates the feature_opinions column for a given restaurant ID with formatted opinions."""
    config = load_config()
    try:
        # Connect to your database
        with psycopg2.connect(**config) as conn:
            cur = conn.cursor()
            
            # Format the feature-opinion tuples as strings in the desired format
            formatted_opinions = ["{} - {}".format(feature, opinion) for feature, opinion in feature_opinions]
            
            # Prepare the SQL query to update feature_opinions
            update_sql = """
                UPDATE test.restaurants
                SET feature_opinions = %s
                WHERE rest_id = %s;
            """
            # Execute the query with the formatted_opinions list and restaurant_id
            cur.execute(update_sql, (formatted_opinions, restaurant_id))
            
            # Commit the transaction
            conn.commit()
            
            print(f"Feature opinions updated for restaurant ID {restaurant_id}.")
            
    except (psycopg2.DatabaseError, Exception) as error:
        print("Error while updating feature opinions:", error)
        # Optionally rollback or handle the error as needed
        conn.rollback()


def feature_main_function(restaurant_id):
    top_feature_opinions = main(restaurant_id)
    update_feature_opinions(restaurant_id, top_feature_opinions)