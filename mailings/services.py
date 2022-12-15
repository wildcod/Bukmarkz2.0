from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from rest_framework.response import Response
from django.conf import settings
from django.template.loader import render_to_string


def send_email(context_dict, subject, recipients, template_name, email_data=None, email_type='NoType'):
    mail_subject = subject
    content = render_to_string(template_name, context_dict)
    message = Mail(
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
        to_emails=recipients,
        subject=mail_subject,
        html_content=content
    )

    try:
        sg = SendGridAPIClient(getattr(settings, "SENDGRID_API_KEY", None))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return response
    except Exception as e:
        print("error: ",e)


def get_email_data(data):
    return {
            'to_emails': [data['send_to']],
            'subject': 'Bukmarkz Invites You!',
            'url': data['url'],
            'from_friend': data['email_from'],
    }


def _create_email_message(email_data, html_content):
    message = Mail(
        from_email=settings.EMAIL_ADDRESS,
        to_emails=email_data['to_emails'],
        subject=email_data['subject'],
        html_content=html_content)
    return message


def _get_withdraw_template():
    return render_to_string('emails/withdraw_processing.html')


def _get_invite_friend_template(email_data):
    return render_to_string('emails/invite_friend.html', {
            'url': email_data['url'],
            'from_friend': email_data['from_friend'],
    })


def _get_otp_template(email_data):
    return render_to_string('emails/get_otp.html', {
            'otp': email_data['otp']
    })


def _get_contact_response_template():
    return render_to_string('emails/response_contact.html')


def _get_welcome_email(email_data):
    return render_to_string('emails/welcome_email.html', {
            'email': email_data['email']
    })


def _get_email_template(email_type, email_data):
    if email_type == 'InviteFriends':
        return _get_invite_friend_template(email_data)

    if email_type == 'getOTP':
        return _get_otp_template(email_data)

    if email_type == 'ContactResponse':
        return _get_contact_response_template()

    if email_type == 'RequestWithdraw':
        return _get_withdraw_template()

    if email_type == 'WelcomeEmail':
        return _get_welcome_email(email_data)

    return '<p>Bukmarkz welcomes you!<p>'
