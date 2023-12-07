import json
import os

from flask import Flask, flash, redirect, render_template, request, session, send_from_directory
from flask_sqlalchemy import SQLAlchemy

# Configure application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Youarenothing7!@localhost/remygram'

# Setting up databases
db = SQLAlchemy(app)
with app.app_context():
    db.reflect()

    # Access the existing tables after reflection
    users_table = db.Model.metadata.tables['users']
    posts_table = db.Model.metadata.tables['posts']
    comments_table = db.Model.metadata.tables['comments']
    likes_table = db.Model.metadata.tables['likes']

    # Define models based on reflected tables
    class Users(db.Model):
        __table__ = users_table

    class Posts(db.Model):
        __table__ = posts_table

    class Comments(db.Model):
        __table__ = comments_table

    class Likes(db.Model):
        __table__ = likes_table

@app.route('/')
def index():
    # Query users from the database
    users = Users.query.all()
    return render_template('test.html', users=users)