import React from "react";
import { useEffect, useState } from "react";
import firebase from "firebase";
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
}));

const Results = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [results, setResults] = useState("");

  useEffect(() => {
    // check if user is signed in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // check if user has taken quiz
        const ref = firebase.database().ref("users/" + user.uid);

        ref.on("value", (snapshot) => {
          if (snapshot.val() && snapshot.val().results) {
            setResults(snapshot.val().results);
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
  );
};

export default Results;
