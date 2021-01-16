import Reach from 'react';
import AppNavbar from './AppNavbar';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';

const Home = () => {
	return (
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
	);
};

export default Home;
