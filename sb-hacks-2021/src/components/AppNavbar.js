import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';

function AppNavbar() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="#home">Diagnosis Test</Navbar.Brand>
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
											Login
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
