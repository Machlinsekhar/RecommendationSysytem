import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

dataset_df = pd.read_csv("./Output/restaurant_profiles.csv")

# Assuming you have an existing DataFrame named 'df' and you want to create a 'User' column with sequential user names
user_count = len(dataset_df)  # Calculate the number of users
dataset_df['User'] = [f'User{i + 1}' for i in range(user_count)]

# Display the updated DataFrame
# print(dataset_df)

user_item_ratings_df = dataset_df.pivot(index='Restaurant Name', columns='User', values='Average Rating')
# print(user_item_ratings_df)

#user_item_ratings_df['User'] = []

user_item_ratings_df = user_item_ratings_df.fillna(1)
# print(user_item_ratings_df)

# print(user_item_ratings_df.index)

item_similarity = cosine_similarity(user_item_ratings_df.T)
# print(item_similarity)

item_similarity_df = pd.DataFrame(item_similarity, columns=user_item_ratings_df.columns, index=user_item_ratings_df.columns)

# Display the item similarity DataFrame
# print("Item Similarity Matrix:")
# print(item_similarity_df)

# print(item_similarity_df.index)

# Function to make item-based recommendations
def item_based_recommendation(user_interactions, item_similarity_df, num_recommendations=3):
    recommendations = pd.Series(0, index=item_similarity_df.index)  # Initialize recommendations

    for item in user_interactions.index:
        # Calculate the weighted sum of item similarity with user interactions
        recommendations += item_similarity_df[item] * user_interactions[item]

    # Sort recommendations in descending order
    recommendations = recommendations.sort_values(ascending=False)

    # Exclude items the user has already interacted with
    recommendations = recommendations.drop(user_interactions.index, errors='ignore')

    # Get the top N recommendations
    top_recommendations = recommendations.head(num_recommendations)
    return top_recommendations

def collab_recommendation():
    user_interactions_user1 = user_item_ratings_df.loc['Ahmed Bhais']

    # Get item-based recommendations for that user
    recommended_items_user1 = item_based_recommendation(user_interactions_user1, user_item_ratings_df, num_recommendations=4)

    return recommended_items_user1

recs = collab_recommendation()
print(recs)