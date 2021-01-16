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
import AppJumbotron from "./AppJumbotron";

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
    <div className="container-fluid">
	<div className="row">
		hello world
	  </div>

      <div className="row">
        <div className="col-sm">

		</div>
        <div className="col-sm jumbo">
			<AppJumbotron />
		</div>
        <div className="col-sm">

		</div>
      </div>

	  <div className="row">
		  hi
	  </div>
    </div>
  );
};

export default Home;
