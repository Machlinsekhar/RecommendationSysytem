import pandas as pd
import os

def recommend_restaurants(min_rating, restaurant_type, budget_range, location):

    profile_path = os.path.join(f"dataset/{location}", f"{location}_profile.csv")

    data = pd.read_csv(profile_path)

    matching_type = data[data['restaurant_type'] == restaurant_type]
    matching_type_sorted = matching_type.sort_values(by='avg_rating', ascending=False)

    other_types = data[data['restaurant_type'] != restaurant_type]
    other_types_sorted = other_types.sort_values(by='avg_rating', ascending=False)

    final_data = pd.concat([matching_type_sorted, other_types_sorted])
    restaurant_names = final_data['restaurant_name'].tolist()
    return restaurant_names

# Example usage
# min_rating = 4.0
# restaurant_type = 'buffet restaurant'
# budget_range = 'expensive'
# location = 'hyderabad'

# recommend_restaurants(min_rating, restaurant_type, budget_range, location)

