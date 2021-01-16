import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';

function AppNavbar(props) {
	console.log(props);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/">Diagnosis Test</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/about-us">About Us</Nav.Link>
					{props.isSignedIn && <Nav.Link href="/results">Results</Nav.Link>}
				</Nav>
				<Nav>
					{props.isSignedIn === true ? (
						<Nav.Link
							onClick={() => {
								firebase.app().auth().signOut();
							}}
						>
							Logout
						</Nav.Link>
					) : (
						<Nav.Link
							onClick={async () => {
								const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
								await firebase.auth().signInWithPopup(googleAuthProvider);

								const uid = firebase.auth().currentUser.uid;
								const name = firebase.auth().currentUser.displayName;
								const email = firebase.auth().currentUser.email;
								const ref = firebase.database().ref('users');

								ref.once('value', (snapshot) => {
									if (!snapshot.hasChild(uid)) {
										firebase
											.database()
											.ref('users/' + uid)
											.set({
												name: name,
												email: email,
											});
									}
								});
							}}
						>
							Login
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default AppNavbar;
