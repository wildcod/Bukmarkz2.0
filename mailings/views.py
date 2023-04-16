from rest_framework.views import APIView
from rest_framework.response import Response

from .services import send_email, get_email_data


class SendEmailView(APIView):
    def post(self, *args, **kwargs):
        try:
            data = self.request.data
        except:
            return Response(data='Request failed', status=400)
        
        email_data = get_email_data(data)

        response = send_email(email_data, 'InviteFriends')
        return response
