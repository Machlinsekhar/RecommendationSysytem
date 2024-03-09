import psycopg2
from config import load_config
from collections import defaultdict

def find_similar_users(target_user_id, conn):
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    similarity_scores = defaultdict(float)
    with conn.cursor() as cur:
        cur.execute("""
            SELECT
                user2.user_id AS similar_user_id,
                CORR(user1.rating, user2.rating) AS similarity_score
            FROM
                test.user_rating AS user1
                JOIN test.user_rating AS user2 ON user1.rest_id = user2.rest_id
            WHERE
                user1.user_id = %s AND user1.user_id <> user2.user_id AND user1.loc_name = user2.loc_name
            GROUP BY
                user2.user_id
            ORDER BY
                similarity_score DESC;
        """, (target_user_id,))
        rows = cur.fetchall()
        for row in rows:
            if len(row) >= 2:
                similarity_scores[row[0]] = row[1]
        return similarity_scores

def recommend_restaurants(target_user_id, similar_users,conn):
    pred_ratings = defaultdict(int)
    rest_names = {}
    with conn.cursor() as cur:
        cur.execute("""
            SELECT
                rest_id, rest_name
            FROM
                test.restaurants
        """)
        rest_rows = cur.fetchall()
        for rest_row in rest_rows:
            rest_names[rest_row[0]] = rest_row[1]
            #print(rest_names[1])

        cur.execute("""
            SELECT
                user_rating.rest_id, user_rating.rating, user_rating.user_id
            FROM
                test.user_rating
            WHERE
                user_id IN %s
        """, (tuple(similar_users.keys()),))
        rows = cur.fetchall()
        print(f"Number of rows returned by the query: {len(rows)}")
        restaurants=[]
        for row in rows:
            print(f"Processing row: {row}")
            if row[2] in similar_users and similar_users[row[2]] is not None:
                pred_ratings[(row[0], target_user_id)] += similar_users[row[2]] * row[1]
            
            cur.execute("""
            SELECT rest_name
            FROM test.restaurants
            WHERE rest_id = %s
            """, (row[0],))
            fetched_name = cur.fetchone()[0]
            restaurants.append(fetched_name)

        print(restaurants)
        append_recommendation_to_database((row[0], pred_ratings[(row[0], target_user_id)]), target_user_id, conn)

        for restaurants in set(r[0] for r in pred_ratings):
            yield (restaurants, pred_ratings[(restaurants, target_user_id)])
        
        

def collaborative_filtering_recommendation(target_user_id, conn):
    similar_users = find_similar_users(target_user_id, conn)
    if similar_users:
        recommended_restaurants = recommend_restaurants(target_user_id, similar_users, conn)
        return similar_users, recommended_restaurants
    else:
        print("No similar users found for the target user.")
        return {}, {}

def append_recommendation_to_database(recommended_restaurant, target_user_id, conn):
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO test.user_rating (user_id, rest_id, rating, loc_name)
            VALUES (%s, %s, %s,%s);
        """, (target_user_id, recommended_restaurant[0], recommended_restaurant[1], 1))
        print("Appended")

# Example usage
def main():
    config = load_config()
    try:
        with psycopg2.connect(**config) as conn:
            # Replace 1 with the target user_id you want recommendations for
            target_user_id = 4
            similar_users, recommended_restaurants = collaborative_filtering_recommendation(target_user_id, conn)
            

            # print("Similar Users:")
            # print(similar_users)

            print("\nRecommended Restaurants:")
            for restaurants, predicted_rating in recommended_restaurants:
                print(f"Restaurant ID: {restaurants}, Predicted Rating: {predicted_rating}")

            # append_recommendation_to_database(restaurants[0],target_user_id,conn)

    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

if __name__ == "__main__":
    main()