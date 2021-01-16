import React from "react";
import AppNavbar from "./AppNavbar";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className="container-fluid background">
      <div className="row row-container">
        <div className="col"></div>
        <div className="col-6 jumbo">
          <div className="card">
            <div className="container">
              <h6 className="title">The O-Test</h6>
              <p>
                Obesity is an ongoing issue in the United States and is only
                getting worse with COVID-19. The average U.S adult obesity rate
                is over 40 percent. Take this quiz to find out where you land on
                the spectrum and get tips on preventive actions.{" "}
              </p>
              <button type="button" class="btn btn-warning btn-lg">
                TAKE QUIZ
              </button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Home;
