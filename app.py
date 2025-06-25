from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
import psycopg2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ✅ JWT Configuration
app.config['JWT_SECRET_KEY'] = 'supersecret'  # Change this in production!
jwt = JWTManager(app)

# ✅ PostgreSQL connection


def get_connection():
    return psycopg2.connect(
        dbname="eventbrite",
        user="postgres",
        password="moha",
        host="localhost"
    )

# ✅ Login route with email and password hashing


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT id, name, email, password FROM users WHERE email = %s', (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    # Validate hashed password
    if user and check_password_hash(user[3], password):
        access_token = create_access_token(identity={
            'id': user[0],
            'name': user[1],
            'email': user[2]
        })
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# ✅ Simple test route (protected)


@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    user = get_jwt_identity()
    return jsonify(message=f"Hello, {user['name']}! You accessed a protected route.")

# ✅ Events listing


@app.route('/api/events', methods=['GET'])
def get_events():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT id, title, location, date, time, venue, price FROM events'
    )
    rows = cur.fetchall()
    events = []

    for row in rows:
        events.append({
            "id": row[0],
            "title": row[1],
            "location": row[2],
            "date": row[3].isoformat(),
            "time": str(row[4]),
            "venue": row[5],
            "price": float(row[6]),
        })

    cur.close()
    conn.close()
    return jsonify(events)

# ✅ Single event detail


@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        'SELECT id, title, location, date, time, venue, price FROM events WHERE id = %s',
        (event_id,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if row:
        event = {
            'id': row[0],
            'title': row[1],
            'location': row[2],
            'date': row[3].isoformat(),
            'time': str(row[4]),
            'venue': row[5],
            'price': float(row[6]),
        }
        return jsonify(event)
    else:
        return jsonify({'error': 'Event not found'}), 404


# ✅ Start the app
if __name__ == '__main__':
    app.run(debug=True, port=5001)
