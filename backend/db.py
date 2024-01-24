from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017')

db = client.RecommendationSystem
entries = db.user_profile
users = db.users