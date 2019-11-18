# Copyright (c) 2012-2016 Seafile Ltd.
import logging
from types import FunctionType

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

from seaserv import ccnet_api

from seahub.api2.permissions import IsProVersion, IsOrgAdminUser
from seahub.api2.throttling import UserRateThrottle
from seahub.api2.authentication import TokenAuthentication
from seahub.api2.utils import api_error
from seahub.base.accounts import User
from seahub.settings import INIT_PASSWD, SEND_EMAIL_ON_RESETTING_USER_PASSWD
from seahub.utils import IS_EMAIL_CONFIGURED
from seahub.views.sysadmin import send_user_reset_email

from seahub_extra.organizations.views import org_user_exists

from pysearpc import SearpcError


logger = logging.getLogger(__name__)


class OrgAdminUserSetPassword(APIView):

    authentication_classes = (TokenAuthentication, SessionAuthentication)
    throttle_classes = (UserRateThrottle,)
    permission_classes = (IsProVersion, IsOrgAdminUser)

    def put(self, request, org_id, email):
        """ Reset an organization user's password.
        """
        # resource check
        org_id = int(org_id)
        if not ccnet_api.get_org_by_id(org_id):
            error_msg = 'Organization %s not found.' % org_id
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            error_msg = 'User %s not found.' % email
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        if not org_user_exists(org_id, user.username):
            err_msg = 'User %s does not exist in the organization.' % user.username
            return api_error(status.HTTP_404_NOT_FOUND, err_msg)

        # Reset an organization user's password.
        if isinstance(INIT_PASSWD, FunctionType):
            new_password = INIT_PASSWD()
        else:
            new_password = INIT_PASSWD
        user.set_password(new_password)
        user.save()

        # send password reset email
        if IS_EMAIL_CONFIGURED:
            if SEND_EMAIL_ON_RESETTING_USER_PASSWD:
                try:
                    send_user_reset_email(request, user.email, new_password)
                except Exception as e:
                    logger.error(str(e))

        return Response({'new_password': new_password})
