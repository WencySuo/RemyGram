import json
import os

from flask import Flask, flash, redirect, render_template, request, session, send_from_directory
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy

# Configure application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Youarenothing7!@localhost/remygram'

# Setting up databases
db = SQLAlchemy(app)
db.reflect()
# Access the existing tables
users = db.Model.metadata.tables['users']
posts = db.Model.metadata.tables['posts']
comments = db.Model.metadata.tables['comments']
likes = db.Model.metadata.tables['likes']
class Users(db.Model):
    __table__ = users
class Posts(db.Model):
    __table__ = posts
class Comments(db.Model):
    __table__ = comments
class Likes(db.Model):
    __table__ = likes

@app.route('/')
def index():
    