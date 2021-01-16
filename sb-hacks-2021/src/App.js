import { FirebaseDatabaseProvider } from '@react-firebase/database';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Results from './components/results';
import AppNavbar from './components/AppNavbar';

import * as ROUTES from './constants/routes';
import { firebaseConfig } from './firebaseConfig';

require('firebase/auth');

function App() {
	return (
		<div>
			<FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
				<Router>
					<Switch>
						<FirebaseAuthConsumer>
							{({ user, isSignedIn }) => {
								{
									return (
										<>
											<AppNavbar isSignedIn={isSignedIn} />
											<Route
												exact
												path={ROUTES.LANDING}
												component={Home}
												isSignedIn={isSignedIn}
												user={user}
											/>
											<Route
												path={ROUTES.RESULTS}
												component={Results}
												isSignedIn={isSignedIn}
												user={user}
											/>
										</>
									);
								}
							}}
						</FirebaseAuthConsumer>
					</Switch>
				</Router>
			</FirebaseAuthProvider>
		</div>
	);
}

export default App;
