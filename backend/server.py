import datetime
import json
import os

from flask import Flask, request, jsonify, redirect, make_response
from flask_cors import CORS
from wsgiref.simple_server import WSGIServer
from flask_pymongo import PyMongo
import logging
import password_processer

import model
import text_file_processer

app = Flask(__name__)
# CORS(app, origins="http://localhost:3000", supports_credentials=True, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Configure MongoDB connection string
app.config["MONGO_URI"] = "mongodb://localhost:27017/readhd"
mongo = PyMongo(app)


# TEMP_DATA_PATH = 'temp_content/temp.json'
# # create temp_content folder if not exist
# if not os.path.exists('temp_content'):
#     os.makedirs('temp_content')

# # create temp_content/temp.json if not exist
# if not os.path.exists(TEMP_DATA_PATH):
#     open(TEMP_DATA_PATH, 'w').close()


@app.route('/api', methods=['GET'])
def index():
    return "Hello, World!", 200


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']

    # Check if username already exists
    existing_user = mongo.db.users.find_one({'username': username})
    if existing_user:
        return jsonify({'error': {
            'username': 'Username already exists.'
        }}), 400

    if password_processer.check_valid(data['password'])[0] is False:
        return jsonify({'error': {
            'password': password_processer.check_valid(data['password'])[1]
        }}), 400
    password = password_processer.hash_password(data['password'])
    user_data = {
        'username': username,
        'password': password,
        'email': data['email'],
        'fullname': data['fullname'],
    }
    mongo.db.users.insert_one(user_data)
    return jsonify({"message": "Data inserted."}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = password_processer.hash_password(data['password'])
    user_data = mongo.db.users.find_one({'username': username})
    if user_data is None:
        return jsonify({'error': {
            'username': 'Username does not exist.'
        }}), 400
    if user_data['password'] == password:
        return jsonify({'message': 'Login successful.',
                        'username': user_data['username'],
                        'fullname': user_data['fullname'],
                        'email': user_data['email']}), 200
    else:
        return jsonify({'error': {
            'password': 'Incorrect password.'
        }}), 400


@app.route('/api/summarize', methods=['POST'])
def summarize():
    input_text = request.json['content']
    summary = model.summarize(input_text)
    response = jsonify({'texts': summary})
    logging.log(logging.INFO, 'Response:', response)
    return response, 200


def check_user_exist(username):
    existing_user = mongo.db.users.find_one({'username': username})
    return existing_user is not None


@app.route('/api/upload_text', methods=['POST'])
def upload_text():
    if 'content' not in request.json:
        return jsonify({'error': 'No content.'})

    input_text = request.json['content']

    texts = text_file_processer.read_text(input_text)
    response = {
        'title': 'Untitled',
        'texts': texts,
    }
    # if username in request.json: count user's files -> file_id, else: file_id = 0
    if 'username' in request.json and request.json['username'] != '':
        username = request.json['username']
        # Check if username exists
        if not check_user_exist(username):
            return jsonify({'error': {
                'username': 'Username does not exist.'
            }}), 400
        # count user's files
        user_files = mongo.db.files.find({'username': username})
        file_id = len(list(user_files))
    else:
        file_id = 0
        username = ''
    response['file_id'] = file_id
    response['username'] = username

    # save content to temp json file
    logging.log(logging.INFO, 'Response:', response)
    # temp_data_path = f'temp_content/temp{username}.json'
    temp_data_path = f'temp_content/temp.json'
    if not os.path.exists('temp_content'):
        os.makedirs('temp_content')
    temp_json = open(temp_data_path, 'w')
    json.dump(response, temp_json)
    return jsonify(response), 200


@app.route('/api/upload_file', methods=['POST'])
def upload_file():
    for key in request.files:
        print(key)
    for key in request.form:
        print(key)
    if 'file' not in request.files:
        print('No file part')
        return redirect(request.url), 400
    file = request.files['file']
    if file.filename == '':
        print('No file selected')
        return redirect(request.url), 400
    if file:
        if file.filename.endswith('.pdf'):
            texts = text_file_processer.read_pdf(file)
        elif file.filename.endswith('.txt'):
            texts = text_file_processer.read_txt(file)
        elif file.filename.endswith('.docx'):
            texts = text_file_processer.read_docx(file)
        else:
            return jsonify({'error': 'File type not supported.'}), 400

        response = {
            'title': file.filename.split('.')[0],
            'texts': texts,
        }

        if 'username' in request.form and request.form['username'] != '':
            username = request.form['username']
            # Check if username exists
            if not check_user_exist(username):
                return jsonify({'error': {
                    'username': 'Username does not exist.'
                }}), 400
            # count user's files
            user_files = mongo.db.files.find({'username': username})
            file_id = user_files.count()
        else:
            file_id = 0
            username = ''
        response['file_id'] = file_id
        response['username'] = username

        # save content to temp json file
        logging.log(logging.INFO, 'Response:', response)
        # temp_data_path = f'temp_content/temp{username}.json'
        temp_data_path = f'temp_content/temp.json'
        if not os.path.exists('temp_content'):
            os.makedirs('temp_content')
        temp_json = open(temp_data_path, 'w')
        json.dump(response, temp_json)
        return jsonify(response, {'headers': {'Access-Control-Allow-Origin': '*'}}), 200


@app.route('/api/get_content', methods=['GET'])
def get_content():
    # username = request.args.get('username')
    # print(request, request.json, request.headers)
    # if 'username' in request.json:
    #     username = request.json['username']
    # print(username)
    # print(f'temp_content/temp{username}.json')
    # temp_json = open(f'temp_content/temp{username}.json', 'r')
    # response = json.load(temp_json)
    # logging.log(logging.INFO, 'Response:', response)
    # # return jsonify(response, {'headers': {'Access-Control-Allow-Origin': '*'}}), 200
    # res = make_response(jsonify(response), 200)
    # res.headers['Access-Control-Allow-Origin'] = '*'
    # return res

    temp_json = open(f'temp_content/temp.json', 'r')
    response = json.load(temp_json)
    logging.log(logging.INFO, 'Response:', response)
    return jsonify(response, {'headers': {'Access-Control-Allow-Origin': '*'}}), 200


@app.route('/api/get_user_files', methods=['GET'])
def get_user_files():
    username = ''
    if 'username' in request.json:
        username = request.json['username']
    # Check if username exists
    if not check_user_exist(username):
        return jsonify({'error': {
            'username': 'Username does not exist.'
        }}), 400

    # get user files
    user_files = mongo.db.files.find({'username': username})
    response = []
    for file in user_files:
        response.append({
            'title': file['title'],
            'content': file['content'],
            'date': file['date'],
            'file_id': file['file_id'],
        })

    return jsonify(response, {'headers': {'Access-Control-Allow-Origin': '*'}}), 200


@app.route('/api/save_file', methods=['POST'])
def save_file():
    data = request.json
    username = data['username']
    title = data['title']
    content = data['content']
    file_id = data['file_id']
    # print(username, title, content, file_id)
    user_data = mongo.db.users.find_one({'username': username})
    if user_data is None:
        return jsonify({'error': {
            'username': 'Username does not exist.'
        }}), 400
    # check if file already exists in database
    existing_file = mongo.db.files.find_one({
        '$and': [
            {'file_id': file_id},
            {'username': username}
        ]
    })
    # if exist, modify content, date, title
    if existing_file:
        existing_file['content'] = content
        existing_file['date'] = datetime.datetime.now()
        existing_file['title'] = title
        mongo.db.files.update_one({'file_id': file_id, 'username': username}, {
                                '$set': existing_file})
        return jsonify({"message": "Data updated."}), 200
    # if not exist, create new file
    file_data = {
        'file_id': file_id,
        'username': username,
        'title': title,
        'content': content,
        'date': datetime.datetime.now(),
    }
    mongo.db.files.insert_one(file_data)
    return jsonify({"message": "Data inserted."}), 201


if __name__ == '__main__':
    # Debug/Development
    app.run(debug=True)
    # Production
    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()
