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

const EmptyRoute = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div>
				<Typography variant="h2" style={{ display: 'inline-block' }}>
					404
				</Typography>
			</div>
			<br />
			<div>
				<Typography variant="h3" style={{ display: 'inline-block' }}>
					Page Not Found.
				</Typography>
			</div>
		</div>
	);
};

export default EmptyRoute;
