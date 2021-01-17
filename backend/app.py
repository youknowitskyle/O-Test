import os
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

BOOKS = [
    {
        'title': 'On the Road',
        'author': 'Jack Kerouac',
        'read': True
    },
    {
        'title': 'Harry Potter and the Philosopher\'s Stone',
        'author': 'J. K. Rowling',
        'read': False
    },
    {
        'title': 'Green Eggs and Ham',
        'author': 'Dr. Seuss',
        'read': True
    }
]

Obesity_raw_data = pd.read_csv('ObesityDataSet_raw_and_data_sinthetic.csv')
#Obesity_raw_data = pd.read_csv('gs://obesity-data-set/ObesityDataSet_raw_and_data_sinthetic.csv')

Obesity_raw_data['Gender_score'] = Obesity_raw_data.Gender.map({'Male':0,'Female':1})
Obesity_raw_data['FAVC_score'] = Obesity_raw_data.FAVC.map({'no':0,'yes':1})
Obesity_raw_data['family_history_with_overweight_score'] = Obesity_raw_data.family_history_with_overweight.map({'no':0,'yes':1})
Obesity_raw_data['SMOKE_score'] = Obesity_raw_data.SMOKE.map({'no':0,'yes':1})
Obesity_raw_data['SCC_score'] = Obesity_raw_data.SCC.map({'no':0,'yes':1})
Obesity_raw_data['CAEC_score'] = Obesity_raw_data.CAEC.map({'no':0,'Sometimes':1,'Frequently':2,'Always':3})
Obesity_raw_data['CALC_score'] = Obesity_raw_data.CALC.map({'no':0,'Sometimes':1,'Frequently':2,'Always':3})
Obesity_raw_data['MTRANS_score'] = Obesity_raw_data.MTRANS.map({'Bike':0,'Motorbike':1,'Walking':2,'Public_Transportation':3,'Automobile':3})
Obesity_scored_data = Obesity_raw_data.loc[:, ['Age','Height','Weight','FCVC','NCP','CH2O','FAF','TUE','FAVC_score','family_history_with_overweight_score','SMOKE_score','SCC_score','CAEC_score','CALC_score','MTRANS_score','Gender_score', 'NObeyesdad']]

from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X =  pd.DataFrame(sc_X.fit_transform(Obesity_scored_data.drop(["NObeyesdad","MTRANS_score","FAVC_score","NCP","SCC_score","TUE","CAEC_score",'family_history_with_overweight_score','SMOKE_score','CALC_score'],axis = 1),),
        columns=['Age','Height','Weight','FCVC','CH2O','FAF','Gender_score'])
y = Obesity_scored_data.NObeyesdad

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=1/3,random_state=42, stratify=y)

from sklearn.neighbors import KNeighborsClassifier
test_scores = []
train_scores = []

for i in range(1,19,2):

    knn = KNeighborsClassifier(i)
    knn.fit(X_train,y_train)
    
    train_scores.append(knn.score(X_train,y_train))
    test_scores.append(knn.score(X_test,y_test))

knn = KNeighborsClassifier(n_neighbors = 5)
knn.fit(X_train,y_train)
knn.score(X_test,y_test)

Obesity_filtered_data = Obesity_scored_data.drop(["NObeyesdad","MTRANS_score","FAVC_score","NCP","SCC_score","TUE","CAEC_score",'family_history_with_overweight_score','SMOKE_score','CALC_score'],axis = 1)
Obesity_filtered_data.head()

data =  [
    {
        'Age': 35,
        'Height': 1.8,
        'Weight': 75,
        'FCVC': 0,
        'CH2O': 0,
        'FAF': 3,
#        'CAEC_score': 1,
#        'family_history_with_overweight_score': 1,
#        'SMOKE_score': 0,
#        'CALC_score': 0,
        'Gender_score' : 0,
    }]

New_Prediction = Obesity_filtered_data.append(data, ignore_index=True,sort=False)
New_Prediction
#standardize, then 
sc_X_new = StandardScaler()
#Drop the columns listed, and pick the array values in the from the following columns in each row starting in axis = 1
X_new =  pd.DataFrame(sc_X_new.fit_transform(New_Prediction),
        columns=['Age','Height','Weight','FCVC','CH2O','FAF','Gender_score'])

#knn.predict(X_new), then 
last_item = len(knn.predict(X_new)) - 1
#find result on the last item
print(knn.predict(X_new)[last_item])

DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# # route
# @app.route('/predict', methods=['POST'])
# def predict():


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

# test route
@app.route('/books', methods=['GET', 'POST'])
def all_books():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        BOOKS.append({
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
        })
        response_object['message'] = 'Book added!'
    else:
        response_object['books'] = BOOKS
    return jsonify(response_object)

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)