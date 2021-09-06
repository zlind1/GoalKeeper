from datetime import timedelta

from flask import Flask
from flask import jsonify
from flask import request

from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import user

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'super-secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
jwt = JWTManager(app)

def token_response(identity):
    access_token = create_access_token(identity=identity)
    refresh_token = create_refresh_token(identity=identity)
    return jsonify(access_token=access_token, refresh_token=refresh_token)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    response = user.login(username, password)
    if response['msg'] == 'Login success':
        return token_response(username)
    return jsonify(response), 401

@app.route('/signup', methods=['POST'])
def signup():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    response = user.signup(username, password)
    if response['msg'] == 'Signup success':
        return token_response(username)
    return jsonify(response), 401

if __name__ == '__main__':
    app.run(debug=True)
