import React from 'react';
import { useEffect } from 'react';
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

const Results = (props) => {
	const classes = useStyles();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				// User is signed in; do nothing
			} else {
				props.history.push('/');
			}
		});
	}, []);

	return (
		<div className={classes.container}>
			<h1>Results: {props.user ? props.user.displayName : ''}</h1>
		</div>
	);
};

export default Results;
