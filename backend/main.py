from flask import Blueprint, request, session, jsonify
import json
from middleware import needs_auth
from config import load_config
import psycopg2 
import psycopg2.extras
# from db import entries

main = Blueprint('main', __name__)

config = load_config()
conn = psycopg2.connect(**config)

# @main.route('/get-entries', methods=['GET'])
# @needs_auth()
# def index(user):
#     if request.method == "GET":
#         return json_util.dumps(entries.find({}))


@main.route('/create-entry', methods=['POST'])
@needs_auth()
def set_entry(account):
    print(account)
    print(session)
    user_id = session.get('uid')
    print("from session: ", user_id)

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    print(request.form)

    if request.method == 'POST':
        print(request.form)
        home_location = request.form['home_location']
        fav_cuisine = json.loads(request.form['fav_cuisine'])
        print(fav_cuisine)

        try:
            cursor.execute(f"""
                UPDATE test.users
                SET home_location = '{home_location}', fav_cuisine = (ARRAY{fav_cuisine})
                WHERE user_id= {user_id};
            """)
            conn.commit()
            return {"message": "Done"}
        except Exception as e:
            conn.rollback()
            raise Exception("An error occurred: {}".format(e))
        

@main.route('/fetch-top-from-location', methods=['POST'])
@needs_auth()
def fetch_rest(account):
    print(account)
    print(session)
    user_id = session.get('uid')
    print("from session: ", user_id)

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    print(request.form)

    if request.method == 'POST':
        try:
            cursor.execute(f"""
                SELECT home_location FROM test.users WHERE user_id={user_id};
            """)
            location = cursor.fetchone()[0]

            cursor.execute(f"""
                SELECT rest_id, rest_name FROM test.restaurants WHERE rest_location='{location}';
            """)
            rest_from_location = cursor.fetchall()

            return jsonify(rest_from_location)
        
        except Exception as e:
            conn.rollback()
            raise Exception("An error occurred: {}".format(e))

@main.route('/store-user-ratings', methods=['POST'])
@needs_auth()
def set_rating_entry(account):
    user_id = session.get('uid')
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if request.method == 'POST':
        ratings = request.get_json()
        print(ratings)

        try:
            cursor.execute(f"""
                SELECT home_location FROM test.users WHERE user_id={user_id};
            """)
            location = cursor.fetchone()[0]

            for id, rating in ratings.items():
                cursor.execute(f"""
                    INSERT INTO test.user_rating(user_id, rest_id, user_rating, loc_name)
                    VALUES (%s,%s,%s,%s)
                """, (user_id, id, rating, location))

            conn.commit()
            return {"message": "Done"}, 200

        except Exception as e:
            conn.rollback()
            raise Exception("An error occurred: {}".format(e))
        
        finally:
            cursor.close()
