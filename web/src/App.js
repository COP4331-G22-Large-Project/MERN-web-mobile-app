import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';



import './App.css';

const App = () => (
  <Router>
    <Fragment>
       <Navbar/>
       <Route exact path = '/' component ={Landing} />
      <section className = "container">
        <Switch>
          <Route exact path="/signup" component = {SignUp} />
          <Route exact path="/login" component = {Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>

);

export default App;
