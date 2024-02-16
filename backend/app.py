from flask import Flask, render_template, request, jsonify, make_response
import cbf_pipeline.cbf as cbf
import collab_algo as col
from pymongo import MongoClient
from flask_cors import CORS
from auth import auth as auth_blueprint
from db import entries
from main import main as main_blueprint
from cbf_pipeline.scrap import check_path
import os
import csv

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
    print(location)
    result = check_path(location)
    return jsonify(result)

@app.route('/recommend', methods=['POST'])
def recommend():
    body = request.json
    location = body['location'].lower()
    user_rating = float(body['rating'])
    if body['restaurant_type'].lower() == 'any':
        user_restaurant_type = ''
    else:
        user_restaurant_type = body['restaurant_type'].lower() + ' '
    user_max_cost = body['max_cost'].lower()
    print(location)
    print(user_rating)
    print(user_restaurant_type) 
    print(user_max_cost)

    recommendations = cbf.recommend_restaurants(user_rating, user_restaurant_type, user_max_cost, location)
    return jsonify(recommendations)

@app.route('/collabrecommend', methods=['POST'])
def colrecommend():
    recommendations = col.collab_manual()
    print(recommendations)
    return jsonify(recommendations)


@app.route('/restaurant_details', methods=['POST'])
def get_restaurant_details():
    data = request.json
    location = data.get('location')
    restaurant_names = data.get('restaurant_names')

    if not location or not restaurant_names:
        return jsonify({'error': 'Missing parameters'})

    restaurant_details = []
    for restaurant_name in restaurant_names:
        details = fetch_details_from_csv(location, restaurant_name)
        if details:
            restaurant_details.append(details)

    return jsonify(restaurant_details[:7])

def fetch_details_from_csv(location, restaurant_name):
    file_path = "../backend/dataset/" + location

    try:
        with open(os.path.join(file_path, f"{location}_profile.csv"), newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row.get("restaurant_name") == restaurant_name:
                    return {
                        "restaurant_name": row.get("restaurant_name", "N/A"),
                        "budget": row.get("budget", "N/A"),
                        "type": row.get("restaurant_type", "N/A"),
                        "rating": row.get("avg_rating", "N/A"),
                        "img_file_path": file_path + "/reviews/" + restaurant_name + '/' + restaurant_name+ ".jpg",
                        "rec_dishes": row.get("rec_dishes", "N/A"),
                        "rating_graph": file_path + "/graphs/" + restaurant_name + '/' + "rating_graph.jpg",
                        "sentiment_graph": file_path + "/graphs/" + restaurant_name + '/' + "sentiment_graph.jpg",
                    }
        return None  # Restaurant not found
    except Exception as e:
        print(f"Error fetching details from CSV: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True)

