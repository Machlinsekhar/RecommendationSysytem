import pandas as pd
import os

def recommend_restaurants(min_rating, restaurant_type, budget_range, location):
    
    restaurant_type = restaurant_type + 'restaurant'

    print(min_rating, restaurant_type, budget_range, location )

    backend_path = os.path.dirname(__file__)
    profile_path = os.path.join( backend_path, f'..\dataset\{location}',f"{location}_profile.csv")
    data = pd.read_csv(profile_path)

    matching_type = data[data['restaurant_type'] == restaurant_type]
    matching_type_sorted = matching_type.sort_values(by='avg_rating', ascending=False)

    other_types = data[data['restaurant_type'] != restaurant_type]
    other_types_sorted = other_types.sort_values(by='avg_rating', ascending=False)

    final_data = pd.concat([matching_type_sorted, other_types_sorted])
    restaurant_names = final_data['restaurant_name'].tolist()

    print(restaurant_names)
    return restaurant_names

# Example usage
# min_rating = 4
# restaurant_type = ''
# budget_range = 'expensive'
# location = 'nerul'

# recommend_restaurants(min_rating, restaurant_type, budget_range, location)

