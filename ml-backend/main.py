import nltk
nltk.download('punkt')

import numpy as np
from flask import Flask, request, render_template,jsonify,flash, request
import pickle
import numpy as np
import joblib
import spacy
import nltk
from pymongo import MongoClient
import requests

from transformers import pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")


loaded_model = joblib.load('SpamFiltrationRFC.pkl')
loaded_lemmatizer = joblib.load('lemmatizer.pkl')
loaded_nlp = spacy.load('spacy_model')
loaded_stopwords = joblib.load('stopwords.pkl')


app = Flask(__name__)
# template_folder='/content/drive/MyDrive/deploy-ML-model-with-webapp-master/templates'

# MongoDB connection URI
# MONGO_URI = "mongodb+srv://AskMoreTest:AskMoreTest123@askmoretest.8nb2gel.mongodb.net/AskMoreTest?retryWrites=true&w=majority&appName=AskMoreTest"

# # Create a MongoDB client
# client = MongoClient(MONGO_URI)

# # Connect to the database
# db = client.get_database()


def preprocess_text(text):
    doc = loaded_nlp(text)
    lemmatized = [token.lemma_ for token in doc if token.pos_ != 'ADP' and token.is_alpha]
    processed_text = ' '.join(lemmatized)
    processed_text = [nltk.word_tokenize(processed_text)]
    processed_text = [[w for w in words if w not in loaded_stopwords] for words in processed_text]
    processed_text = [' '.join(words) for words in processed_text]
    return processed_text

def predict_class(text, clf):
    processed_text = preprocess_text(text)
    new_text_vector = loaded_nlp(processed_text[0]).vector
    new_text_vector_2d = np.array(new_text_vector).reshape(1, -1)
    prediction = clf.predict(new_text_vector_2d)
    return prediction[0]


# @app.route('/')
# def home():
#     return render_template('index.html')

@app.route('/api/<id>/<board_id>', methods=['PUT'])
def getprediction(id, board_id):
    try:
        # Get JSON data from the request
        data = request.get_json()
        input_text = data["boardData"]["title"]
        candidate_labels = data["boardData"]["columnNames"]

        # Make predictions using the function (replace predict_class with your actual function)
        prediction = predict_class(input_text, loaded_model)

        # Determine the label based on the prediction
        label = 'Inappropriate' if prediction == 1 else 'Appropriate'

        if prediction == 0:
            zero_shot_prediction = classifier(input_text, candidate_labels)
            most_relevant_category = zero_shot_prediction['labels'][0]

            # Prepare the data to be sent to the Express.js backend
            express_data = {
                "id": id,
                "board_id": board_id,
                "title": input_text,
                "status": most_relevant_category
            }

            # Send the data to the Express.js backend
            express_url = f'http://localhost:3000/api/users/tasks/add/{id}/{board_id}'
            response = requests.put(express_url, json=express_data)

            # Return the response from Express.js to the client
            return jsonify(response.json())
            #return express_data

        return jsonify({"message": "Data not received and sent to Express.js"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)


















# import numpy as np
# from flask import Flask, request, jsonify, render_template
# import pickle

# # Create flask app
# flask_app = Flask(__name__)
# model = pickle.load(open("SpamFiltrationRFC.pkl", "rb"))

# @flask_app.route("/predict", methods=["POST"])
# def predict():
#     # Get the text input from the request
#     text = request.json["text"]


#     # Preprocess the text (assuming you have a function to do this)
#     features = preprocess_text(text)

#     # Convert the features into a numpy array
#     features_array = np.array(features).reshape(1, -1)

#     # Make the prediction
#     prediction = model.predict(features_array)

#     # Return the prediction as a JSON response
#     return jsonify({"prediction": prediction.tolist()})

# if __name__ == "__main__":
#     flask_app.run(debug=True)

# def preprocess_text(text):
#     # Perform any necessary text preprocessing here
#     # For example, you can tokenize the text and convert it to lowercase
#     processed_text = text.lower().split()
#     return processed_text


# from flask import Flask,request,jsonify

# app=Flask(__name__)

# @app.route("/")
# def home():
#     return "Home"

# @app.route("/get-user/<user_id>")
# def getUser(user_id):
#     return user_id
    
# @app.route("/creat-question",methods=["POST","GET"])
# def createQuestion():
#         q=request.get_json()
#         return jsonify(q)
    


# if(__name__=="__main__"):
#     app.run(debug=True)