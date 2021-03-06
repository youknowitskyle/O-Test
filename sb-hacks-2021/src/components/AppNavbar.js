import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";

import "./AppNavbar.css";

import * as ROUTES from "../constants/routes";

function AppNavbar(props) {
  return (
    <Navbar
      className="hover"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Brand>The O-Test</Navbar.Brand>
          <Nav.Link href={ROUTES.LANDING}>Home</Nav.Link>
          <Nav.Link href={ROUTES.ABOUT}>About</Nav.Link>
          {props.isSignedIn && (
            <Nav.Link href={ROUTES.RESULTS}>Results</Nav.Link>
          )}
        </Nav>
        <Nav>
          {props.isSignedIn === true ? (
            <Nav.Link>
              <div>
                <Navbar.Text className="text">
                  Hi, {props.user.displayName}!
                </Navbar.Text>
                <button
                  type="button"
                  class="btn btn-outline-warning btn-sm"
                  onClick={() => {
                    firebase.app().auth().signOut();
                  }}
                  href={ROUTES.LANDING}
                >
                  LOGOUT
                </button>
              </div>
            </Nav.Link>
          ) : (
            <Nav.Link
              onClick={async () => {
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
              }}
            >
              <button type="button" class="btn btn-outline-warning btn-sm">
                LOGIN
              </button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
