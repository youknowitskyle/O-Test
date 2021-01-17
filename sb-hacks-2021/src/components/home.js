import React from "react";
import * as ROUTES from "../constants/routes";
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

const Home = (props) => {
  const classes = useStyles();
  const onTakeQuiz = async() => {
	  if (props.isSignedIn) {
		  props.history.push(ROUTES.QUIZ);
	  }
	  else {
		const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
		await firebase.auth().signInWithPopup(googleAuthProvider);

		const uid = firebase.auth().currentUser.uid;
		const name = firebase.auth().currentUser.displayName;
		const email = firebase.auth().currentUser.email;
		const ref = firebase.database().ref("users");

		ref.once("value", (snapshot) => {
		  if (!snapshot.hasChild(uid)) {
			firebase
			  .database()
			  .ref("users/" + uid)
			  .set({
				name: name,
				email: email,
			  });
		  }
		});
		props.history.push(ROUTES.QUIZ);
	  }
  }
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
              <button type="button" class="btn btn-warning btn-lg" onClick={onTakeQuiz}>
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
