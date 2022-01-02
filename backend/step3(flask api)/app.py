from flask import Flask, redirect, url_for, request,jsonify,request
import base64
import json
import cv2
from flask_cors import CORS
import numpy as np
from sqlalchemy import create_engine
import pandas as pd
from sqlalchemy.sql import text
from recom import my_recomender

app = Flask(__name__)
CORS(app)

@app.route('/get_films',methods = ['GET'])
def films():
    with create_engine('mysql+pymysql://root:@localhost:3306/my_data').connect() as con:
        data=con.execute('SELECT * FROM film_data').fetchall()
        result = [ [r[0],r[1],r[2]] for r in data]
        
    return jsonify({"films":result})

@app.route('/reco',methods = ['POST'])
def reco():
    data = request.json
    my_reco=my_recomender()
    
    my_recos,sim_user=my_reco.recomend(ratese=data['films'])
    return jsonify({"films":my_recos})

app.run()
