import { FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';

const SignIn = () => {
	return (
		<FirebaseAuthConsumer>
			{({ user, isSignedIn }) => {
				if (isSignedIn === true) {
					return (
						<div>
							Hi, {user.displayName}
							<button
								onClick={() => {
									firebase.app().auth().signOut();
								}}
							>
								Sign Out
							</button>
						</div>
					);
				} else {
					return (
						<button
							onClick={() => {
								const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
								firebase.auth().signInWithPopup(googleAuthProvider);
							}}
						>
							Sign In
						</button>
					);
				}
			}}
		</FirebaseAuthConsumer>
	);
};

export default SignIn;
