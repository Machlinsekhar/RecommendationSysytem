from flask import Blueprint, request, session
from db import db
from werkzeug.security import generate_password_hash, check_password_hash
from middleware import needs_auth
from db import users
# from main import main as main_blueprint

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=["POST"])
def login():
    # login code goes here
    username = request.form.get('username')
    password = request.form.get('password')
    user = users.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return "Incorrect username or password", 401
    session["username"] = username
    return {"message": "Done"}


@auth.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        username = request.form.get('username')
        # name = request.form.get('name')
        password = request.form.get('password')
        user = users.find_one({"username": username})
        if user:
            return "Account already exists", 400
        new_user = {"username": username, "password": generate_password_hash(password)}
        users.insert_one(new_user)
        return {"message": "Done"}


@auth.route('/profile', methods=['GET'])
@needs_auth()
def profile(user):
    del user["_id"]
    del user["password"]
    return user


@auth.route('/logout')
def logout():
    if "username" in session:
        session.pop("username", None)
        return {"message": "Logged out"}
