from flask import Blueprint, request, session, jsonify
from flask_session import Session
from middleware import needs_auth
from werkzeug.security import generate_password_hash, check_password_hash
from config import load_config
import psycopg2 
import psycopg2.extras
import re 
# from db import db
# from db import users
# from main import main as main_blueprint

auth = Blueprint('auth', __name__)

config = load_config()
conn = psycopg2.connect(**config)

@auth.route('/login', methods=["POST"])
def login():

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
   
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        session.pop('user', None)

        username = request.form.get('username')
        password = request.form.get('password')
 
        cursor.execute('SELECT * FROM test.users WHERE username = %s', (username,))
        account = cursor.fetchone()
        print("in login auth code")
        print(account)
 
        if account:
            password_rs = account['pwd']
            print(password_rs)
            if check_password_hash(password_rs, password):
                session['loggedin'] = True
                session['uid'] = account['user_id']
                session['username'] = account['username']
                print(session)
                return jsonify({"message": "Done"}), 200
            else:
                return jsonify({"message":"Incorrect username or password"}), 401
        else:
            return jsonify({"message":"Incorrect username or password"}), 401
 


@auth.route('/signup', methods=['GET', 'POST'])
def register():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
 
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        session.pop('user', None)

        username = request.form.get('username')
        password = request.form.get('password')
 
        cursor.execute('SELECT * FROM test.users WHERE username = %s', (username,))
        account = cursor.fetchone()

        if account:
            return jsonify({"message": "Account already exists, Login!!"}), 401
        elif not re.match(r'[A-Za-z0-9]+', username):
            return jsonify({"message": "Username must contain only characters and numbers!"}), 401
        else: 
            _hashed_password = generate_password_hash(password)
            try:
                cursor.execute("INSERT INTO test.users (username, pwd) VALUES (%s,%s)", (username, _hashed_password))
                conn.commit()

                cursor.execute('SELECT * FROM test.users WHERE username = %s', (username,))
                account = cursor.fetchone()
                session['loggedin'] = True
                session['uid'] = account['user_id']
                session['username'] = account['username']
                print(session)

                return jsonify({"message": "Done"}), 200
            except Exception as e:
                conn.rollback()
                return jsonify({"message": "Error occurred while creating the account: {}".format(str(e))}), 500



# @auth.route('/profile', methods=['GET'])
# @needs_auth()
# def profile(user):
#     del user["_id"]
#     del user["password"]
#     return user


@auth.route('/logout')
def logout():
    if "username" in session:
    # Remove session data, this will log the user out
        session.pop('loggedin', None)
        session.pop('id', None)
        session.pop('username', None)
        # Redirect to login page
        return {"message": "Logged out"}
