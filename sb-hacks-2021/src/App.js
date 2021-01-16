import { FirebaseDatabaseProvider } from '@react-firebase/database';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home';
// import Quiz from './components/quiz';
import Results from './components/results';
import AppNavbar from './components/AppNavbar';
import EmptyRoute from './components/empty';
import About from './components/about';

import * as ROUTES from './constants/routes';
import { firebaseConfig } from './firebaseConfig';

require('firebase/auth');

function App() {
	return (
		<div>
			<FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
				<Router>
					<FirebaseAuthConsumer>
						{({ user, isSignedIn }) => {
							{
								return (
									<>
										<AppNavbar isSignedIn={isSignedIn} />
										<Switch>
											<Route
												exact
												path={ROUTES.LANDING}
												render={(props) => (
													<Home {...props} isSignedIn={isSignedIn} user={user} />
												)}
											/>
											<Route
												path={ROUTES.RESULTS}
												render={(props) => (
													<Results {...props} isSignedIn={isSignedIn} user={user} />
												)}
											/>
											<Route path={ROUTES.ABOUT} component={About} />
											{/* <Route path="/quiz" component={Quiz}></Route> */}
											<Route component={EmptyRoute} />
										</Switch>
									</>
								);
							}
						}}
					</FirebaseAuthConsumer>
				</Router>
			</FirebaseAuthProvider>
		</div>
	);
}

export default App;
