import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.conf import settings


EMAIL_HOST = 'smtp.gmail.com'  
EMAIL_PORT = 587 
EMAIL_HOST_USER = 'aaryan.dev123@gmail.com'  
EMAIL_HOST_PASSWORD = 'dtaljyqbrgzgvrph'  


def send_custom_email(recipient, context):
    print("Sending success email")

    with open('Utils/templates/MailTemplate.html', 'r') as template_file:
        template_content = template_file.read()

    html_content = template_content.replace('{{ context_data }}', context.get("context_data"))

    msg = MIMEMultipart()
    msg['From'] = EMAIL_HOST_USER
    msg['To'] = recipient
    msg['Subject'] = context.get("subject")

    msg.attach(MIMEText(html_content, 'html'))

    try:
        server = smtplib.SMTP(EMAIL_HOST,EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, recipient, msg.as_string())
        server.quit()
        print("Email sent successfully")
    except Exception as e:
        print(f"Error sending email: {e}")

