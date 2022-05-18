import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Admin from './Admin';
import IndividualTool from './components/IndividualTool';
import IndividualUserTool from './components/IndividualUserTool';
import Navbar from './Navbar';
import User from './User';

function App() {
  
  return (
    <Router>
      <Navbar/>
      <Switch>
        
        <Route path="/tool/" >
          <IndividualTool />
        </Route>

        <Route path="/usertool/" >
          <IndividualUserTool />
        </Route>

        <Route exact path="/admin" >
          <Admin />
        </Route>

        <Route exact path="/user">
          <User />
        </Route>

      </Switch>
    </Router>
    
  );
}

export default App;
