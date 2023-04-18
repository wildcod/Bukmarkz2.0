from datetime import timedelta
from pickle import FALSE
import dj_database_url
import os
import django_heroku

from django.core.management.utils import get_random_secret_key
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# print (BASE_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '$ducixkkp3c-qdr(uj@u=*65ovz(xfsez@rsimh@vqi226l8du'
# print((SECRET_KEY))
# # SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = bool(int(os.environ.get("DEBUG", default=1)))
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'DEVELOPMENT')
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'www.bukmarkz.com', 'bukmarkz.com']
SESSION_ID = 1
REACT_ROUTES = [
    '/',
    'about',
    'dashboard',
    'price',
    'services',
    'blog',
    'contact',
    'profile',
    'extension',
    'assets',
    'guide'
]


try:
    STAGING = os.environ.get('STAGING')
    if STAGING == 'True':
        STAGING = True
    elif STAGING == 'False':
        STAGING = False
    elif STAGING == 'None':
        STAGING = None
except:
    STAGING = None

if STAGING == False:
    DEBUG = False
    DEBUG_TOOLBAR = False
    PROD = False
else:
    DEBUG = True
    DEBUG_TOOLBAR = False
    PROD = False

DEBUG = True
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.sites',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'rest_auth',
    'knox',
    'django_rest_passwordreset',
    'corsheaders',
    'django_countries',

    'celery',
    'django_celery_beat',
    'django_celery_results',

    'subscription.apps.SubscriptionConfig',
    'accounts.apps.AccountsConfig',
    'bookmarks.apps.BookmarksConfig',
    'import.apps.ImportConfig',
    'referral.apps.ReferralConfig',
    'contact.apps.ContactConfig',
    'default_bookmarks.apps.DefaultBookmarksConfig',
    'offers.apps.OffersConfig',
    'mailings.apps.MailingsConfig',
    'content.apps.ContentConfig'
]

SITE_ID = 1

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',   
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
    ],
}

AUTH_USER_MODEL = 'accounts.CustomUser'

AUTHENTICATION_BACKENDS = (
    # username login
    'django.contrib.auth.backends.ModelBackend',
)

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = True

MIDDLEWARE = [
    # 'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'django.middleware.cache.FetchFromCacheMiddleware',
]

# CACHE_MIDDLEWARE_ALIAS = 'default'
# CACHE_MIDDLEWARE_SECONDS = 604800
# CACHE_MIDDLEWARE_KEY_PREFIX = ''
# MAIN_URL = os.environ.get('MAIN_URL')

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://localhost:3001',
    'https://bukmarz-web-git-develop-wildcod.vercel.app',
    'http://bukmarkz-webapp.herokuapp.com',
    'http://localhost:8000',
    'http://localhost:1337',
    'http://159.65.127.14',
    'http://127.0.0.1:8000',
    'https://bukmarkz-app.herokuapp.com',
    'https://bukmarkz.com',
    'https://www.bukmarkz.com',
    'https://4c43-103-57-85-164.in.ngrok.io'
)

ROOT_URLCONF = 'bukmarkz.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'webapp/build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'bukmarkz.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

###############################################################################


# # Static files (CSS, JavaScript, Images)
# # https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_URL = '/staticfiles/'
# # STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

# # STATICFILES_DIRS = [
# #     os.path.join(BASE_DIR, 'static')
# # ]
###############################################################################


# # Media files
# # .replace('\\', '/')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


if not PROD:
    STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"
    DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"


STATIC_URL = '/static/'

if PROD or STAGING:
    STATIC_ROOT = os.path.join(BASE_DIR, "webapp/build/static")
else:
    STATICFILES_DIRS = [
        #         os.path.join(BASE_DIR, "webapp/build/static"),
        os.path.join(BASE_DIR, "webapp/build/static"),
        os.path.join(BASE_DIR, "webapp/build/")
    ]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)


SITE_ID = 2

DEFAULT_RENDERER_CLASSES = ("rest_framework.renderers.JSONRenderer",)

if DEBUG:
    DEFAULT_RENDERER_CLASSES = DEFAULT_RENDERER_CLASSES + (
        "rest_framework.renderers.BrowsableAPIRenderer",
    )


###############################################################################


# Email settings
# EMAIL_HOST = 'localhost'
# EMAIL_PORT = 1025
EMAIL_ADDRESS = 'info@bukmarkz.com'
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")
# SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
###############################################################################

SENDGRID_API_KEY='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'

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = SENDGRID_API_KEY
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DEFAULT_FROM_EMAIL='info@bukmarkz.com'

# Stripe keys
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY')


# Activate Django-Heroku.
django_heroku.settings(locals())

###############################################################################

# Security settings

if ENVIRONMENT == 'PRODUCTION':
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 3600
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
if os.getcwd() == '/app':
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 3600
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    DEBUG = FALSE


BROKER_URL = 'redis://localhost:6379/0'
BACKEND_URL = 'redis://localhost:6379/1'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Asia/Baku' 

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
}