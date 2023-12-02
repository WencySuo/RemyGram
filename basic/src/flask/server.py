import json
import os

from flask import Flask, flash, redirect, render_template, request, session
from flask_mysqldb import MySQL

# Email authentication imports
from flask import Flask, redirect, request, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
import requests

# Internal imports
from db import init_db_command
from user import User

# Configure application
app = Flask(__name__)

