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

import os

import user
import goal

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

@app.route('/refresh', methods=['GET'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    return token_response(identity)

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

@app.route('/goals', methods=['GET', 'POST'])
@jwt_required()
def goals():
    if request.method == 'GET':
        username = get_jwt_identity()
        user_goals = goal.get_user_goals(username)
        return jsonify({
            'goals': user_goals
        })
    elif request.method == 'POST':
        username = get_jwt_identity()
        title = request.json.get('title', None)
        goal.create_goal(username, title)
        response = {
            'msg': 'Goal created'
        }
        return jsonify(response)

@app.route('/goals/<goal_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def specificGoal(goal_id):
    if request.method == 'PUT':
        username = get_jwt_identity()
        title = request.json.get('title', None)
        completed = request.json.get('completed', None)
        goal.update_goal(goal_id, {
            'username': username,
            'title': title,
            'completed': completed
        })
        response = {
            'msg': 'Goal updated'
        }
        return jsonify(response)
    elif request.method == 'DELETE':
        username = get_jwt_identity()
        goal.delete_goal(goal_id)
        response = {
            'msg': 'Goal deleted'
        }
        return jsonify(response)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = port == 5000
    app.run(host='0.0.0.0', port=port, debug=debug)
