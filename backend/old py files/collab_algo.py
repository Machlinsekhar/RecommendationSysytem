import pandas as pd
from scipy.spatial.distance import cosine
from scipy.spatial import distance

# Load the dataset into a DataFrame
data = pd.read_csv('old_dataset_store\collab_user.csv')

df = pd.DataFrame(data)

# Preprocess the data by filling in any missing values and converting categorical variables into numerical ones
df = df.fillna(0)
df['User'] = df['User'].astype('category')
df['Restaurant'] = df['Restaurant'].astype('category')

# Create a user-item matrix
user_item_matrix = df.pivot_table(index='User', columns='Restaurant', values='Rating', observed=False)

# Define a function to calculate the cosine similarity between two users
def cosine_similarity(u1, u2):
    return 1 - cosine(u1, u2)

# Define a function to recommend restaurants for a user based on the ratings of similar users
def recommend_restaurants(user, user_item_matrix, n=3, m=3, min_similarity=0.4):
    # Calculate the similarity between the target user and all other users
    similarities = []
    for i in range(user_item_matrix.shape[0]):
        if i == user:
            continue
        similarity = cosine_similarity(user_item_matrix.iloc[user], user_item_matrix.iloc[i])
        if similarity < min_similarity:
            continue
        similarities.append((i, similarity))
    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)

    # Calculate the weighted rating for each restaurant
    recommendations = []
    for restaurant in user_item_matrix.columns:
        rating_sum = 0
        similarity_sum = 0
        for i, similarity in similarities:
            rating = user_item_matrix.iloc[i, user_item_matrix.columns.get_loc(restaurant)]
            if rating == 0:
                continue
            similarity_sum += similarity
            rating_sum += rating * similarity
        if similarity_sum == 0:
            continue
        avg_rating = rating_sum / similarity_sum
        recommendations.append((restaurant, avg_rating))

    # Sort the recommendations by rating and return the top m
    recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)
    unique_recommendations = []
    for recommendation in recommendations[:m]:
        if recommendation not in unique_recommendations:
            unique_recommendations.append(recommendation)

    recommended_restaurants = []
    for restaurant, rating in unique_recommendations:
        recommended_restaurants.append((restaurant, rating))

    return recommended_restaurants


def collab_manual():
    # Example usage
    user = 3
    recommendations = recommend_restaurants(user, user_item_matrix)

    # Check for duplicate outputs
    unique_recommendations = []
    for restaurant, rating in recommendations:
        if restaurant not in unique_recommendations:
            unique_recommendations.append({'Restaurant Name': restaurant})
            # print(f"{restaurant}")
        else:
            break

    return unique_recommendations