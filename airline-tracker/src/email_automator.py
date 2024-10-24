import getpass
import smtplib
import random

HOST = 'smtp-mail.outlook.com'
PORT = 587

FROM_EMAIL = 'airlinetracker@outlook.com'
TO_EMAIL = None # process from database based on request

def send_mail(FROM_EMAIL, TO_EMAIL, MESSAGE):
    smtp = smtplib.SMTP(HOST, PORT)

    status_code, response = smtp.ehlo()
    print(f'[*] Echoing the server: {status_code} {response}')

    status_code, response = smtp.starttls()
    print(f'[*] Starting TLS connection: {status_code} {response}')

    status_code, response = smtp.login(FROM_EMAIL, PASSWORD)
    print(f'[*] Logging in: {status_code} {response}')

    smtp.sendmail(FROM_EMAIL, TO_EMAIL, MESSAGE)
    smtp.quit()

def notify(alert, departure, arrival):
    # traverse through DB
    # for each user that subscribed to flight from 'departure' and to 'arrival:
    # send email using alert.txt template to notify them
    pass

def verify(email_address):
    random_num = random.randint(0, 999999)
    code = int(f'{random_num:06}')
    TO_EMAIL = email_address
    # send email to 'email_address' using verify.txt to confirm code
    # when authentication complete, send request to add 'email_address' to database
    # request will handle inputting subscribed airlines
    
with open('password.txt', 'r') as file:
    PASSWORD = file.readline().strip()

MESSAGE = None # process request --> read from either verify.txt or alert.txt
