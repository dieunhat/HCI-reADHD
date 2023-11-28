import json
import os

from flask import Flask, request, jsonify, redirect
from wsgiref.simple_server import WSGIServer
import logging

import model
import text_file_processer

app = Flask(__name__)

TEMP_DATA_PATH = 'temp_content/temp.json'
# create temp_content folder if not exist
if not os.path.exists('temp_content'):
    os.makedirs('temp_content')
# create temp_content/temp.json if not exist
if not os.path.exists(TEMP_DATA_PATH):
    open(TEMP_DATA_PATH, 'w').close()


@app.route('/api', methods=['GET'])
def index():
    return "Hello, World!"


@app.route('/api/summarize', methods=['POST'])
def summarize():
    input_text = request.json['content']
    summary = model.summarize(input_text)
    response = jsonify({'summary': summary})
    logging.log(logging.INFO, 'Response:', response)
    return response


@app.route('/api/read_text', methods=['POST'])
def read_text():
    if 'content' not in request.json:
        return jsonify({'error': 'No content.'})
    input_text = request.json['content']
    response = text_file_processer.read_text(input_text)
    # save content to temp json file
    logging.log(logging.INFO, 'Response:', response)
    temp_json = open(TEMP_DATA_PATH, 'w')
    json.dump(response, temp_json)
    return jsonify(response)


@app.route('/api/read_file', methods=['POST'])
def read_file():
    if 'file' not in request.json:
        print('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        print('No file selected')
        return redirect(request.url)
    if file:
        if file.filename.endswith('.pdf'):
            response = text_file_processer.read_pdf(file)
        elif file.filename.endswith('.txt'):
            response = text_file_processer.read_txt(file)
        elif file.filename.endswith('.docx'):
            response = text_file_processer.read_docx(file)
        else:
            return jsonify({'error': 'File type not supported.'})

        # save content to temp json file
        logging.log(logging.INFO, 'Response:', response)
        temp_json = open(TEMP_DATA_PATH, 'w')
        json.dump(response, temp_json)
        return jsonify(response)


@app.route('/api/get_content', methods=['GET'])
def get_content():
    temp_json = open(TEMP_DATA_PATH, 'r')
    response = json.load(temp_json)
    logging.log(logging.INFO, 'Response:', response)
    return jsonify(response)


if __name__ == '__main__':
    # Debug/Development
    app.run(debug=True)
    # Production
    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()