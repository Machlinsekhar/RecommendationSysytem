from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.RecommendationSystem
entries = db.user_profile
users = db.users