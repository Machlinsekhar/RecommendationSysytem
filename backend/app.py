from flask import Flask, render_template, request, jsonify, make_response
import restaurant_recommender as rec
import collab_algo as col
from pymongo import MongoClient
from flask_cors import CORS
from auth import auth as auth_blueprint
from db import entries
from main import main as main_blueprint
from scrap import check_path
import subprocess

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017')

app.config['SECRET_KEY'] = 'secret-key-goes-here'

app.register_blueprint(auth_blueprint)
app.register_blueprint(main_blueprint)

CORS(app) 

@app.route('/')
def hello_world():
    return "Hello, World!"

@app.route('/receive-location', methods=['POST'])
def receive_location():
    location = request.json.get('location')
    
    result = check_path(location)

    return jsonify(result)

@app.route('/recommend', methods=['POST'])
def recommend():
    body = request.json
    location = body['location'].lower()
    user_rating = float(body['rating'])
    user_restaurant_type = body['restaurant_type'].lower()
    user_max_cost = body['max_cost'].lower()
    print(location)
    print(user_rating)
    print(user_restaurant_type) 
    print(user_max_cost)

    recommendations = rec.get_user_recommendations(location, user_rating, user_restaurant_type, user_max_cost)
    
    return jsonify(recommendations)

@app.route('/collabrecommend', methods=['POST'])
def colrecommend():
    recommendations = col.collab_manual()
    print(recommendations)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)

