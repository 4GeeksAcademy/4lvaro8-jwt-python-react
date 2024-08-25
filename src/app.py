"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response



##################################################################################################
# Rutas

@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"error": "User already exist"}), 400
    
    user = User(id=User.query.count() + 1, email=email, password=password, is_active=True)

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({"msg": "Usuario creado", "token": access_token, "user_id": user.id}), 201


@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email and password:
        user = User.query.filter_by(email=email, password=password)

        if user:

            access_token = create_access_token(identity=user.id)
            return jsonify({"msg": "Inicio de sesión correcto", "token": access_token, "user_id": user.id}), 201
        else : 
            return jsonify({"msg": "Error el usuario no existe"}), 401
    
    else:
        return jsonify({"msg": "Email o contraseña incorrecto"})
    

@app.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        return jsonify({"logged_in": True, "id": user.id}), 200
    return jsonify({"logged_in": False, "msg": "No autorizado."}), 400
    




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
