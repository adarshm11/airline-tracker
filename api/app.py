import os
import random
import smtplib
from email.mime.text import MIMEText
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
# from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

app.config['MAIL_SERVER'] = os.getenv('SMTP_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('SMTP_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_ADDRESS')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_ADDRESS')
mail = Mail(app)

MONGODB_URI = os.getenv('MONGODB_URI')
app.config['MONGO_URI'] = MONGODB_URI
mongo = PyMongo(app)
users = mongo.db.users

pending_users = {}
email = ''

def gen_verification_code():
    rand_num = random.randint(0, 999999)
    return int(f'{rand_num:06}')

def send_verification_email(recipient, code):
    subject = 'Your Airline Tracker Verification Code'
    with open('./email-templates/verify.txt') as template:
        body = template.read().replace('{code}', f'{code}')

    msg = Message(subject=subject, recipients=[recipient], body=body)

    try:
        mail.send(msg)

    except Exception as e:
        print(f'Failed to send email: {e}')
        raise ValueError('Failed to send verification email.')

    '''
    email_address = os.getenv('EMAIL_ADDRESS')
    email_password = os.getenv('EMAIL_PASSWORD')
    smtp_server = os.getenv('SMTP_SERVER')
    port = int(os.getenv('SMTP_PORT'))

    msg = MIMEText(f'Your Airline Tracker verification code is {code}')
    msg['Subject'] = 'Your Airline Tracker Verification Code'
    msg['From'] = email_address
    msg['To'] = recipient

    try:
        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls()
            server.login(email_address, email_password)
            server.sendmail(email_address, recipient, msg.as_string())
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise ValueError("Failed to send verification email.")
    '''

@app.route('/add-user', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Name and email are required'}), 400
    
    name = data['name']
    email = data['email']

    if users.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400
    
    security_code = gen_verification_code()
    pending_users[email] = {
        'name': name,
        'code': security_code
    }

    send_verification_email(email, security_code)

    return jsonify({'message': 'A verification code has been emailed to you. Please enter the code to verify your email.'}), 201

@app.route('/')
def index():
    return 'Backend server is running...'

@app.route('/verify-user', methods=['POST'])
def verify_user():
    data = request.get_json()
    code = data.get('code')
    
    if email in pending_users and pending_users[email]['code'] == code:
        user = {
            'name': pending_users[email]['name'],
            'email': email
        }
        users.insert_one(user)
        del pending_users[email]
        return jsonify({'message': 'User verification complete.'})
    
    else:
        return jsonify({'error': 'Invalid verification code.'})
    
@app.route('/send-test-email', methods=['GET'])
def send_test_email():
    try:
        send_verification_email('adarshmallya34@gmail.com', 123456)
        return jsonify({'message': 'Test email sent successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)