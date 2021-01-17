import React from 'react';
import axios from 'axios';

 export default class Quiz extends React.Component {
    constructor(props){
        super(props);


        window.addEventListener('load', ()=>{
        const form = document.getElementById('question-form'); 
        form.addEventListener('submit', (e)=>{ 
            //to prevent reload 
            e.preventDefault(); 
            //creates a multipart/form-data object 
            let data = new FormData(form); 
            axios({ 
              method  : 'post', 
              url : '/', 
              data : data, 
            }) 
            .then((res)=>{ 
              console.log(res); 
            }) 
            .catch((err) => {throw err}); 
        }); 
    });
    }

    render(){

    return (
        <div>
            <section class="container-fluid px-0 quiz overflow-hidden">
                <div class="row align-items-center">
                    <div class="col-sm"></div>
                    <div class="col-sm">
                        <form id="question-form">
                            <div id="basic-info">
                                <h2><u>Basic Information</u></h2>
                                <div class="row">
                                    <div class="labels">
                                        <label for="#name" id="name-label">Sex given at birth:</label>
                                        <input value="yes" class="radio-input" type="radio" id="yes" name="yes-no" checked />
                                        <label class="radio-label" for="yes">Male</label>
                                        <input value="no" class="radio-input" type="radio" id="no" name="yes-no" />
                                        <label class="radio-label" for="no">Female</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="labels">
                                        <label for="#number" id="number-label">Age:</label>
                                        <input type="number" id="number" placeholder="" min="0" required />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="labels">
                                            <label for="#number" id="number-label">Height in Meters:</label>
                                            <input type="number" id="number" placeholder="" required />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="labels">
                                            <label for="#number" id="number-label">Weight in Kilograms:</label>
                                            <input type="number" id="number" placeholder="" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label for="#familyWeight" id="family-label">Has a family member suffered or suffers from being overweight?</label>
                                    </div>
                                    <div class="row">
                                        <input value="yes" class="radio-input" type="radio" name="fam" checked />
                                        <label class="radio-label" for="yes">Yes</label>
                                        <input value="no" class="radio-input" type="radio" name="fam" />
                                        <label class="radio-label" for="no">No</label>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label for="#calories" id="calorie-label">Do you eat high caloric food frequently?</label>
                                    </div>
                                    <div class="row">
                                        <input value="yes" class="radio-input" type="radio" name="calories" checked />
                                        <label class="radio-label" for="yes">Yes</label>
                                        <input value="no" class="radio-input" type="radio" name="calories" />
                                        <label class="radio-label" for="no">No</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="labels">
                                        <label>How many main meals do you have a day?</label>
                                        <select id="dropdown">
                                            <option value="automobile">Between one and two</option>
                                            <option value="motorbike">Three</option>
                                            <option value="bike">More than three</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="labels">
                                    <div class="row">
                                        <label>Do you eat any food between meals?</label>
                                    </div>
                                    <div class="row">
                                        <select id="dropdown">
                                            <option value="automobile">No</option>
                                            <option value="motorbike">Sometimes</option>
                                            <option value="bike">Frequently</option>
                                            <option value="bike">Always</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label for="#smoke" id="calorie-label">Do you smoke?</label>
                                    </div>
                                    <div class="row">
                                        <input value="yes" class="radio-input" type="radio" name="smoke" checked />
                                        <label class="radio-label" for="yes">Yes</label>
                                        <input value="no" class="radio-input" type="radio" name="smoke" />
                                        <label class="radio-label" for="no">No</label>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label>How much water do you drink daily?</label>
                                    </div>
                                    <div class="row">
                                        <select id="dropdown">
                                            <option value="automobile">Less than a liter</option>
                                            <option value="motorbike">Between 1 and 2 L</option>
                                            <option value="bike">More than 2L</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label for="#monitorC" id="calorie-label">Do you monitor the calories you eat daily?</label>
                                    </div>
                                    <div class="row">
                                        <input value="yes" class="radio-input" type="radio" name="monitorC" checked />
                                        <label class="radio-label" for="yes">Yes</label>
                                        <input value="no" class="radio-input" type="radio" name="monitorC" />
                                        <label class="radio-label" for="no">No</label>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label>How often do you have physical activity?</label>
                                    </div>
                                    <div class="row">
                                        <select id="dropdown">
                                            <option value="automobile">I do not have</option>
                                            <option value="motorbike">1 or 2 days</option>
                                            <option value="bike">2 or 4 days</option>
                                            <option value="bike">4 or 5 days</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="labels">
                                    <div class="row">
                                        <label>How much time do you use technological devices such as cell phone, videogames, television, computer and others?</label>
                                    </div>
                                    <div class="row">
                                        <select id="dropdown">
                                            <option value="automobile">0-2 hours</option>
                                            <option value="motorbike">3-5 hours</option>
                                            <option value="bike">More than 5 hours</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="labels">
                                    <div class="row">
                                        <label>How often do you drink alcohol?</label>
                                    </div>
                                    <div class="row">
                                        <select id="dropdown">
                                            <option value="automobile">I do not.</option>
                                            <option value="motorbike">Sometimes</option>
                                            <option value="bike">Frequently</option>
                                            <option value="bike">Always</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="labels">
                                    <div class="row">
                                        <label>Main Transportation</label>
                                    </div>
                                    <div class="row">
                                        <select id="dropdown">
                                            <option value="automobile">Automobile</option>
                                            <option value="motorbike">Motorbike</option>
                                            <option value="bike">Bike</option>
                                            <option value="public">Public Transportation</option>
                                            <option value="walking">Walking</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" id="submit">Submit</button>
                        </form>
                    </div>
                    <div class="col-sm"></div>
                </div>
            </section>

        </div>
    )
    }
 };
