import { FirebaseDatabaseProvider } from '@react-firebase/database';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Quiz from './components/quiz'
import Results from './components/results';
import AppNavbar from './components/AppNavbar';

import * as ROUTES from './constants/routes';
import { firebaseConfig } from './firebaseConfig';

require('firebase/auth');

function App() {
	return (

		<div>
			<AppNavbar />
			<FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
				<Router>
					<Switch>
						<Route exact path={ROUTES.LANDING} component={Home} />
						<Route path={ROUTES.SIGN_IN} component={SignIn} />
						<Route path={ROUTES.RESULTS} component={Results} />
            <Route path = "/quiz" component={Quiz}></Route>
						{/* <Route path={ROUTES.CONTACT} component={Contact} /> */}
					</Switch>
				</Router>
			</FirebaseAuthProvider>
		</div>

	);
}

export default App;
