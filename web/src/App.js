import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import LogStool from './components/auth/LogStool';
import LogExercise from './components/auth/LogExercise';
import LogFood from './components/auth/LogFood';
import Logs from './components/auth/Logs';
import './App.css';
import EmailVerification from "./components/auth/EmailVerification";


export default function App(){


    return(
  <Router>
      <Switch>
          <Navbar/>
          <Route exact path ="/logexercise" component={LogExercise}/>
          <Route exact path="/logfood" component={LogFood}/>
          <Route exact path = "/logstool" component = {LogStool}/>
          <Route exact path ="/logs" component={Logs}/>
      </Switch>
    <Fragment>

       <Route exact path = '/' component ={Landing} />
      <section className = "container">


          <Route exact path="/register" component = {Register} />
          <Route exact path ="/emailverification" component={EmailVerification}/>
          <Route exact path ="/logs" component={Logs}/>
          <Route exact path="/login" component = {Login} />
      </section>
    </Fragment>
  </Router>
    )
}


