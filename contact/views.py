from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response

from mailings.services import send_email
from .services import create_contact


class ContactView(APIView):
    def post(self, *args, **kwargs):
        try:
            data = self.request.data
        except:
            return Response(data='Request failed', status=HTTP_400_BAD_REQUEST)

        contact = create_contact(data)

        """Send email response"""
        email_data = {
            'to_emails': [data['email']],
            'subject': 'Bukmarkz Contact'
        }

        send_email(email_data, email_type='ContactResponse')

        return Response(status=HTTP_200_OK)



