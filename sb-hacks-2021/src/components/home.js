import React from 'react';
import AppNavbar from './AppNavbar';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';
import { makeStyles, TextField, Button, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		padding: 30,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		textAlign: 'center',
	},
}));

const Home = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<FirebaseAuthConsumer>
				{({ user, isSignedIn }) => {
					{
						if (isSignedIn === true) {
							return <div>Hello, {user.displayName}</div>;
						} else {
							return <div>Welcome! Please sign in.</div>;
						}
					}
				}}
			</FirebaseAuthConsumer>
		</div>
	);
};

export default Home;
