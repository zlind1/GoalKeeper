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

@app.route('/goals', methods=['GET', 'POST', 'PUT'])
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
    elif request.method == 'PUT':
        username = get_jwt_identity()
        goal_id = request.json.get('goal_id', None)
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
