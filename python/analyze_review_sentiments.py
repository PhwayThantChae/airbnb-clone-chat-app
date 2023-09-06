import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from textblob import TextBlob
from pymongo import MongoClient

nltk.download('punkt')
nltk.download('stopwords')

mongo_client = MongoClient('mongodb+srv://phwethantchay:swD9lGHRCB1X6rib@cluster0.8bkxk4k.mongodb.net/?retryWrites=true&w=majority')
db = mongo_client['test']
review_collection = db['reviews']
place_collection = db['places']

# Get review data from mongodb collection
def get_reviews():
    dict = {}

    all_reviews = review_collection.find()

    for review in all_reviews:
        place_id = review["place"]

        if place_id not in dict:
            dict[place_id] = []

        dict[place_id].append(review)

    return dict

def clean_text(text):
    text = text.lower()
    
    # Tokenize text into words
    words = word_tokenize(text)

    # Remove special characters and keep only alphanumeric words
    words = [word for word in words if word.isalnum()]

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]

     # Join the cleaned words back into a string
    cleaned_text = ' '.join(words)
    return cleaned_text

def get_sentiment_score(review):
    blob = TextBlob(review)
    return blob.sentiment.polarity

review_sentiment_scores = {}
review_sentiment_labels = {}
place_reviews_dict = get_reviews()

# Clean the reviews in place_reviews_dict
for place_id, reviews in place_reviews_dict.items():
    cleaned_reviews = [clean_text(review["content"]) for review in reviews]
    place_reviews_dict[place_id] = cleaned_reviews


# Get avg sentiment scores for reviews for each place
for place_id, reviews in place_reviews_dict.items():
    scores = [get_sentiment_score(review) for review in reviews]
    avg_sentiment = sum(scores) / len(scores)
    review_sentiment_scores[place_id] = avg_sentiment


# Convert sentiment scores into sentiment labels (positive, negative, neutral)
for place_id, avg_sentiment_score in review_sentiment_scores.items():
    if avg_sentiment_score > 0:
        review_sentiment_labels[place_id] = "positive"
    elif avg_sentiment_score < 0:
        review_sentiment_labels[place_id] = "negative"
    else:
        review_sentiment_labels[place_id] = "neutral"
    

for place_id, label in review_sentiment_labels.items():
    place_collection.update_one({"_id": place_id}, {"$set": {"sentimentLabel": label}}, upsert=False)


mongo_client.close()





# for polarity, subjectivity in sentiment_scores:
#     if polarity > 0:
#         sentiment_labels.append("positive")
#     elif polarity < 0:
#         sentiment_labels.append("negative")
#     else:
#         sentiment_labels.append("neutral")

# print(sentiment_scores)
# print(sentiment_labels)