import React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase";
import Normal from "./images/normal.png";
import Insufficient from "./images/insufficient.png";
import OWI from "./images/OWI.png";
import OWII from "./images/OWII.png";
import OBI from "./images/OBI.png";
import OBII from "./images/OBII.png";
import OBIII from "./images/OBIII.png";
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import axios from "axios";

import "./results.css";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
}));

const Results = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [results, setResults] = useState("Normal");

  useEffect(() => {
    // check if use is signed in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // check if user has taken quiz
        const ref = firebase.database().ref("users/" + user.uid);

        ref.on("value", (snapshot) => {
          if (snapshot.val() && snapshot.val().diagnosis) {
            setResults(snapshot.val().diagnosis);
          }
        });
      } else {
        props.history.push("/");
      }
    });

    // testing backend
    const path = "http://localhost:5000/ping";
    axios
      .get(path)
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className="resultCard">
        <Typography variant="h3" className="txt">
          Results: {props.user ? props.user.displayName : ""}
        </Typography>
        <br />
        {results ? (
          <div>
            <Typography variant="h4" className="txt">
              Diagnosis: {results}
            </Typography>
          </div>
        ) : (
          <Typography variant="h4" className="txt">
            Please take the quiz to receive your results
          </Typography>
        )}
      </div>
      <div>
        {results ? (
          <div>
            {results === "Overweight_Level_I" ||
            results === "Overweight_Level_II" ? (
              <div>
                {results === "Overweight_Level_I" ? (
                  <img className="scale" src={OWI}></img>
                ) : (
                  <img className="scale" src={OWII}></img>
                )}
                <div class="row">
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">How to Prevent Obesity</h5>
                        <p class="card-text">
                          https://www.healthline.com/health/how-to-prevent-obesity
                        </p>
                        <a
                          href="https://www.healthline.com/health/how-to-prevent-obesity"
                          class="btn btn-warning"
                        >
                          Healthline
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          Best Exercises to Lose Weight
                        </h5>
                        <p class="card-text">
                          https://www.verywellfit.com/best-workouts-if-youre-overweight-3495993
                        </p>
                        <a
                          href="https://www.verywellfit.com/best-workouts-if-youre-overweight-3495993"
                          class="btn btn-warning"
                        >
                          VeryWellFit
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Overweight vs. Obesity</h5>
                        <p class="card-text">
                          https://www.cdc.gov/obesity/adult/defining.html
                        </p>
                        <a
                          href="https://www.cdc.gov/obesity/adult/defining.html"
                          class="btn btn-warning"
                        >
                          CDC
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : results === "Obesity_Type_I" ||
              results === "Obesity_Type_II" ||
              results === "Obesity_Type_III" ? (
              <div>
                {results === "Obesity_Type_I" ? (
                  <img className="scale" src={OBI}></img>
                ) : results === "Obesity_Type_II" ? (
                  <img className="scale" src={OBII}></img>
                ) : (
                  <img className="scale" src={OBIII}></img>
                )}
                <div class="row">
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Health Risks Due to Obesity</h5>
                        <p class="card-text">
                          https://www.webmd.com/diet/obesity/obesity-health-risks
                        </p>
                        <a
                          href="https://www.webmd.com/diet/obesity/obesity-health-risks"
                          class="btn btn-warning"
                        >
                          WebMD
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Tips to Lose Weight</h5>
                        <p class="card-text">
                          https://www.webmd.com/diet/obesity/ss/slideshow-obesity-weight-loss-tips
                        </p>
                        <a
                          href="https://www.webmd.com/diet/obesity/ss/slideshow-obesity-weight-loss-tips"
                          class="btn btn-warning"
                        >
                          WebMD
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Improve your Diet</h5>
                        <p class="card-text">
                          https://www.nhs.uk/conditions/obesity/treatment
                        </p>
                        <a
                          href="https://www.nhs.uk/conditions/obesity/treatment/"
                          class="btn btn-warning"
                        >
                          NHS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : results === "Insufficient_Weight" ? (
              <div>
                <img className="scale" src={Insufficient}></img>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          Healthy Approaches to Gain Weight
                        </h5>
                        <p class="card-text">
                          https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating
                        </p>
                        <a
                          href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/underweight/faq-20058429"
                          class="btn btn-warning"
                        >
                          MayoClinic
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Identifying Eating Disorder</h5>
                        <p class="card-text">
                          https://www.nationaleatingdisorders.org/warning-signs-and-symptoms
                        </p>
                        <a
                          href="https://www.nationaleatingdisorders.org/warning-signs-and-symptoms"
                          class="btn btn-warning"
                        >
                          NEDA
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Unintentional Weight Loss</h5>
                        <p class="card-text">
                          https://www.nhs.uk/conditions/unintentional-weight-loss
                        </p>
                        <a
                          href="https://www.nhs.uk/conditions/unintentional-weight-loss/"
                          class="btn btn-warning"
                        >
                          NHS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <img className="scale" src={Normal}></img>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Tips for a Healthy Life</h5>
                        <p class="card-text">
                          https://www.hsph.harvard.edu/obesity-prevention-source
                        </p>
                        <a
                          href="https://www.hsph.harvard.edu/obesity-prevention-source/diet-lifestyle-to-prevent-obesity/"
                          class="btn btn-warning"
                        >
                          HSPH
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          How to Stay Active During the Pandemic
                        </h5>
                        <p class="card-text">
                          https://www.medstarhealth.org/medstar-blog
                        </p>
                        <a
                          href="https://www.medstarhealth.org/medstar-blog/8-tips-for-staying-active-during-the-covid-19-pandemic/"
                          class="btn btn-warning"
                        >
                          MedStart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          Healthy and Delicious Recipes
                        </h5>
                        <p class="card-text">
                          https://www.delish.com/cooking/recipe-ideas/g3733/healthy-dinner-recipes
                        </p>
                        <a
                          href="https://www.delish.com/cooking/recipe-ideas/g3733/healthy-dinner-recipes/"
                          class="btn btn-warning"
                        >
                          Delish
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Results;

/*
    <div className={classes.container}>
      <Typography variant="h3">
        Results: {props.user ? props.user.displayName : ""}
      </Typography>
      <br />
      {results ? (
        <Typography variant="h4">Diagnosis: {results}</Typography>
      ) : (
        <Typography variant="h4">
          Please take the quiz to receive your results
        </Typography>
      )}
    </div>
    */
