from flask import Flask, render_template, request, jsonify, make_response
import restaurant_recommender as rec
# import collab_alg as col
from pymongo import MongoClient
from flask_cors import CORS
# from auth import auth as auth_blueprint
# from main import main as main_blueprint

app = Flask(__name__)

client = MongoClient('127.0.0.1', 27017)

app.config['SECRET_KEY'] = 'secret-key-goes-here'

# app.register_blueprint(auth_blueprint)
# app.register_blueprint(main_blueprint)


CORS(app) 

@app.route('/')
def hello_world():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/recommend', methods=['POST'])
def recommend():
    body = request.json
    user_rating = float(body['rating'])
    user_restaurant_type = body['restaurant_type'].lower()
    user_max_cost = body['max_cost'].lower()
    print(user_rating)
    print(user_restaurant_type)
    print(user_max_cost)

    recommendations = rec.get_user_recommendations(user_rating, user_restaurant_type, user_max_cost)
    
    return jsonify(recommendations)

@app.route('/collabrecommend', methods=['GET'])
def colrecommend():
    recommendations = col.collab_recommendation()
    print(recommendations)
    return recommendations.to_json()
