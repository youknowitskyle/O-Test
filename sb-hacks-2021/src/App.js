import Home from './components/home';
import Contact from './components/contact';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

import * as ROUTES from "./constants/routes";

function App() {
  return (
	<Router>
		<Switch>
			<Route exact path={ROUTES.LANDING} component={Home} />
		</Switch>
	</Router>
  );
}

export default App;
