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

function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Home</Nav.Link>
          <Nav.Link href="#pricing">Contact</Nav.Link>
        </Nav>
        <Nav>
          <FirebaseAuthConsumer>
            {({ user, isSignedIn }) => {
              {
                if (isSignedIn === true) {
                  return (
                    <Nav.Link
                      onClick={() => {
                        firebase.app().auth().signOut();
                      }}
                    >
                      Logout
                    </Nav.Link>
                  );
                } else {
                  return (
                    <Nav.Link
                      onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider);
                      }}
                    >
                      <button type="button" class="btn btn-warning" size="lg" block>
                        Login
                      </button>
                    </Nav.Link>
                  );
                }
              }
            }}
          </FirebaseAuthConsumer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
