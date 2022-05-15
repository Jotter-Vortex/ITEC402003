from bson import ObjectId
from flask import Flask, render_template, jsonify, request, sessions
from pymongo import MongoClient

app = Flask(__name__)
MONGODB_ID = "ID"
MONGODB_PASS_WORD = "PASS_WORD"
IP_ADRESS = "IP_ADDRESS"

client = MongoClient('mongodb://'+MONGODB_ID+':'+MONGODB_PASS_WORD+'@'+IP_ADRESS, 27017)       
db = client.knutesting                            

## HTML을 주는 부분
@app.route('/')
def home():
   return render_template('index.html')

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
