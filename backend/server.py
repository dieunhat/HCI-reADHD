from flask import Flask, request, jsonify
from wsgiref.simple_server import WSGIServer
import logging

import model

app = Flask(__name__)


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


if __name__ == '__main__':
    # Debug/Development
    app.run(debug=True)
    # Production
    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()