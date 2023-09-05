# owner => owner1
# title => name 
# address => host_location
# photos => [picture_url]
# description => description
# perks => ["wifi", "pool", "parking", "restaurant", "heat"
#           , "tv", "ac", "pets", "beddings", "patio", "kitchen",
#           "entrance"]
# extraInfo => neighborhood_overview + amenities

import requests
import json
import ast
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from libgravatar import Gravatar

def generate_avatar(email):
    g = Gravatar(email)
    avatar_url = g.get_image()

    return avatar_url

mongo_client = MongoClient('mongodb+srv://phwethantchay:swD9lGHRCB1X6rib@cluster0.8bkxk4k.mongodb.net/?retryWrites=true&w=majority')
db = mongo_client['test']
place_collection = db['places']
user_collection = db['users']
review_collection = db['reviews']

ids = set()
reviews = list()
users = list()
usernames = set()
current_timestamp = datetime.utcnow()

# Delete data from collections
place_collection.delete_many({})
user_collection.delete_many({})
review_collection.delete_many({})

# Read and process the JSON data
with open('formatted_data/listings.json') as json_file:
    data = json.load(json_file)

    for d in data[:30]:
        amenities = d["amenities"]
        amenities_list = ast.literal_eval(amenities)
        amenities_list_str = ', '.join(amenities_list)

        neighborhood_overview = d["neighborhood_overview"] if d["neighborhood_overview"] is not None else ""

        ids.add(d["id"])

        processed_data = {
            "owner": ObjectId("64f595f54446d6f805373449"),
            "title": d["name"],
            "address": d["host_location"],
            "photos": [d["picture_url"], "https://airbnb-s3.s3.amazonaws.com/1693166296558.jpg", "https://airbnb-s3.s3.amazonaws.com/1693166319052.jpg",
                       "https://airbnb-s3.s3.amazonaws.com/1693166327905.jpg", "https://airbnb-s3.s3.amazonaws.com/1693166335709.jpg", "https://airbnb-s3.s3.amazonaws.com/1693166347547.jpg"],
            "description": d["description"],
            "perks": ["wifi", "pool", "parking", "restaurant", "heat", "tv", "ac", "pets", "beddings", "patio", "kitchen", "entrance"],
            "extraInfo": neighborhood_overview + ", " + amenities_list_str,
            "checkIn": 2,
            "checkOut": 11,
            "maxGuests": 4,
            "price": float(d["price"].replace('$', '').replace(',', '')),
            "scrapedListingId": d["id"],
            "createdAt": current_timestamp,
            "updatedAt": current_timestamp
        }

        place_collection.insert_one(processed_data)


print(ids)

with open('formatted_data/reviews.json') as json_file:
    data = json.load(json_file)

    for d in data[:6000]:
        if(d["listing_id"] in ids):
            # Split the reviewer_name into parts based on spaces
            reviewer_name = d["reviewer_name"]
            reviewer_email = ""
            name_parts = reviewer_name.split()

            # Create an email format using first and last name
            if len(name_parts) >= 2:
                first_name = name_parts[0].lower()
                last_name = name_parts[-1].lower()
                reviewer_email = f"{first_name}.{last_name}@gmail.com"
            else:
                # Handle cases where there is only one name
                first_name = name_parts[0].lower()
                reviewer_email = f"{first_name}@gmail.com"

            query = {"scrapedListingId": d["listing_id"]}

            place_result = place_collection.find_one(query)

            if place_result:
                if(not reviewer_name in usernames):
                    usernames.add(reviewer_name)
                    avatar_url = generate_avatar(reviewer_email)
                    user_data = {
                        "name": reviewer_name,
                        "email": reviewer_email,
                        "password": "$2a$12$VpXh/5V0axV/JOcDLXTsqekauARLdj5wCE3BNXC1uTwNPPk4qGuzW",
                        "userType": "user",
                        "profileImg": avatar_url,
                        "createdAt": current_timestamp,
                        "updatedAt": current_timestamp 
                    }
                    insert_user = user_collection.insert_one(user_data)

                    processed_review = {
                        "user": ObjectId(insert_user.inserted_id),
                        "content": d["comments"],
                        "place": ObjectId(place_result["_id"]),
                        "createdAt": current_timestamp,
                        "updatedAt": current_timestamp
                    }

                    review_collection.insert_one(processed_review)
                else:
                    query = {"email": reviewer_email}

                    user_result = user_collection.find_one(query)

                    processed_review = {
                        "user": ObjectId(user_result["_id"]),
                        "content": d["comments"],
                        "place": ObjectId(place_result["_id"]),
                        "createdAt": current_timestamp,
                        "updatedAt": current_timestamp
                    }

                    review_collection.insert_one(processed_review)
