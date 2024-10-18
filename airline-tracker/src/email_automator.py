import getpass
import smtplib

HOST = "smtp-mail.outlook.com"
PORT = 587

FROM_EMAIL = "airlinetracker@outlook.com"
TO_EMAIL = "adarshmallya34@gmail.com"
PASSWORD = getpass.getpass("Enter password: ")

MESSAGE = """Subject: Automated Email Test

Hello,

This email is to test that the automated email server words as intended.

Thanks,
AM"""

smtp = smtplib.SMTP(HOST, PORT)

status_code, response = smtp.ehlo()
print(f"[*] Echoing the server: {status_code} {response}")

status_code, response = smtp.starttls()
print(f"[*] Starting TLS connection: {status_code} {response}")

status_code, response = smtp.login(FROM_EMAIL, PASSWORD)
print(f"[*] Logging in: {status_code} {response}")

smtp.sendmail(FROM_EMAIL, TO_EMAIL, MESSAGE)
smtp.quit()
