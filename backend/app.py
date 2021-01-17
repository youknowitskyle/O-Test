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

Obesity_raw_data.info(verbose = True)

Obesity_raw_data['Gender_score'] = Obesity_raw_data.Gender.map({'Male':0,'Female':1})
Obesity_raw_data['FAVC_score'] = Obesity_raw_data.FAVC.map({'no':0,'yes':1})
Obesity_raw_data['family_history_with_overweight_score'] = Obesity_raw_data.family_history_with_overweight.map({'no':0,'yes':1})
Obesity_raw_data['SMOKE_score'] = Obesity_raw_data.SMOKE.map({'no':0,'yes':1})
Obesity_raw_data['SCC_score'] = Obesity_raw_data.SCC.map({'no':0,'yes':1})
Obesity_raw_data['CAEC_score'] = Obesity_raw_data.CAEC.map({'no':0,'Sometimes':1,'Frequently':2,'Always':3})
Obesity_raw_data['CALC_score'] = Obesity_raw_data.CALC.map({'no':0,'Sometimes':1,'Frequently':2,'Always':3})
Obesity_raw_data['MTRANS_score'] = Obesity_raw_data.MTRANS.map({'Bike':0,'Motorbike':1,'Walking':2,'Public_Transportation':3,'Automobile':3})
Obesity_scored_data = Obesity_raw_data.loc[:, ['Age','Height','Weight','FCVC','NCP','CH2O','FAF','TUE','FAVC_score','family_history_with_overweight_score','SMOKE_score','SCC_score','CAEC_score','CALC_score','MTRANS_score','Gender_score', 'NObeyesdad']]

female_data = Obesity_scored_data[Obesity_scored_data.Gender_score.isin([1])]
male_data = Obesity_scored_data[Obesity_scored_data.Gender_score.isin([0])]

female_data.describe()
male_data.describe()

from sklearn.preprocessing import StandardScaler
sc_X_female = StandardScaler()
X_female =  pd.DataFrame(sc_X_female.fit_transform(female_data.drop(["NObeyesdad","MTRANS_score","FAVC_score","NCP","SCC_score","TUE",'Gender_score'],axis = 1),),
        columns=['Age','Height','Weight','FCVC','CH2O','FAF',"CAEC_score",'family_history_with_overweight_score','SMOKE_score','CALC_score'])

y_female = female_data.NObeyesdad
X_female.head()

from sklearn.model_selection import train_test_split
X_train_female,X_test_female,y_train_female,y_test_female = train_test_split(X_female,y_female,test_size=1/3,random_state=42)

from sklearn.neighbors import KNeighborsClassifier
test_scores_female = []
train_scores_female = []

for i in range(1,19,2):
    knn = KNeighborsClassifier(i)
    knn.fit(X_train_female,y_train_female)
    train_scores_female.append(knn.score(X_train_female,y_train_female))
    test_scores_female.append(knn.score(X_test_female,y_test_female))

knn = KNeighborsClassifier(n_neighbors = 5)

knn.fit(X_train_female,y_train_female)
knn.score(X_test_female,y_test_female)

female_filtered_data = female_data.drop(["NObeyesdad","MTRANS_score","FAVC_score","NCP","SCC_score","TUE","Gender_score"],axis = 1)
female_filtered_data.head()

new_female_data =  [
    {
        'Age': 21,
        'Height': 1.7,
        'Weight': 80,
        'FCVC': 0,
        'CH2O': 3,
        'FAF': 1,
        'CAEC_score': 1,
        'family_history_with_overweight_score': 1,
        'SMOKE_score': 0,
        'CALC_score': 0
    }]

sc_X_male = StandardScaler()
X_male =  pd.DataFrame(sc_X_male.fit_transform(male_data.drop(["NObeyesdad","MTRANS_score","FAVC_score","NCP","SCC_score","TUE",'Gender_score'],axis = 1),),
        columns=['Age','Height','Weight','FCVC','CH2O','FAF',"CAEC_score",'family_history_with_overweight_score','SMOKE_score','CALC_score'])

y_male = male_data.NObeyesdad

X_train_male,X_test_male,y_train_male,y_test_male = train_test_split(X_male,y_male,test_size=1/3,random_state=42)
test_scores_male = []
train_scores_male = []

for i in range(1,19,2):

    knn = KNeighborsClassifier(i)
    knn.fit(X_train_male,y_train_male)
    train_scores_male.append(knn.score(X_train_male,y_train_male))
    test_scores_male.append(knn.score(X_test_male,y_test_male))

knn = KNeighborsClassifier(n_neighbors = 5)

knn.fit(X_train_male,y_train_male)
knn.score(X_test_male,y_test_male)

male_filtered_data = male_data.drop(["NObeyesdad","MTRANS_score","FAVC_score","NCP","SCC_score","TUE","Gender_score"],axis = 1)
male_filtered_data.head()

new_male_data =  [
    {
        'Age': 21,
        'Height': 1.7,
        'Weight': 80,
        'FCVC': 3,
        'CH2O': 3,
        'FAF': 3,
        'CAEC_score': 1,
        'family_history_with_overweight_score': 1,
        'SMOKE_score': 0,
        'CALC_score': 0
    }]


DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# route
@app.route('/predict', methods=['POST'])
def predict():
    response_object = {'status': 'success'}

    post_data = request.get_json()

    if post_data.get('gender') == 0:
        new_male_data[0]['Age'] = post_data.get('age')
        new_male_data[0]['Height'] = post_data.get('height')
        new_male_data[0]['Weight'] = post_data.get('weight')
        new_male_data[0]['FCVC'] = post_data.get('fcvc')
        new_male_data[0]['CH2O'] = post_data.get('ch2o')
        new_male_data[0]['FAF'] = post_data.get('faf')
        new_male_data[0]['CAEC_score'] = post_data.get('caec')
        new_male_data[0]['family_history_with_overweight_score'] = post_data.get('family')
        new_male_data[0]['SMOKE_score'] = post_data.get('smoke')
        new_male_data[0]['CALC_score'] = post_data.get('calc')

        New_Prediction = male_filtered_data.append(new_male_data, ignore_index=True,sort=False)
        sc_X_new_male = StandardScaler()
        X_new_male = pd.DataFrame(sc_X_new_male.fit_transform(New_Prediction),
                columns=['Age','Height','Weight','FCVC','CH2O','FAF',"CAEC_score",'family_history_with_overweight_score','SMOKE_score','CALC_score'])

        last_item = len(knn.predict(X_new_male)) - 1
        diagnosis = knn.predict(X_new_male)[last_item]
        print(diagnosis)
        return jsonify(diagnosis)
    else:
        new_female_data[0]['Age'] = post_data.get('age')
        new_female_data[0]['Height'] = post_data.get('height')
        new_female_data[0]['Weight'] = post_data.get('weight')
        new_female_data[0]['FCVC'] = post_data.get('fcvc')
        new_female_data[0]['CH2O'] = post_data.get('ch2o')
        new_female_data[0]['FAF'] = post_data.get('faf')
        new_female_data[0]['CAEC_score'] = post_data.get('caec')
        new_female_data[0]['family_history_with_overweight_score'] = post_data.get('family')
        new_female_data[0]['SMOKE_score'] = post_data.get('smoke')
        new_female_data[0]['CALC_score'] = post_data.get('calc')

        New_Prediction = female_filtered_data.append(new_female_data, ignore_index=True,sort=False)
        sc_X_new_female = StandardScaler()
        X_new_female = pd.DataFrame(sc_X_new_female.fit_transform(New_Prediction),
                columns=['Age','Height','Weight','FCVC','CH2O','FAF',"CAEC_score",'family_history_with_overweight_score','SMOKE_score','CALC_score'])

        last_item = len(knn.predict(X_new_female)) - 1
        diagnosis = knn.predict(X_new_female)[last_item]
        print(diagnosis)
        return jsonify(diagnosis)

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