from flask import Blueprint, request, session
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
# @needs_auth()
def set_entry():
    print(session)
    user_id = session.get('uid')
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    print(request.form)

    if request.method == 'POST':
        print(request.form)
        home_location = request.form['home_location']
        fav_cuisine = request.form['fav_cuisine']
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



