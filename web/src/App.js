import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register';
import Login from './components/layout/Login';
import LogStool from './components/auth/LogStool';
import LogExercise from './components/auth/LogExercise';
import LogFood from './components/auth/LogFood';
import Logs from './components/auth/Logs';
import ForgotPassword from './components/layout/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import './App.css';
import EmailVerification from "./components/layout/EmailVerification";


export default function App(){
  return (
    <Router>
      <Navbar/>
      <Fragment>
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Route exact path="/logexercise" component={LogExercise}/>
          <Route exact path="/logfood" component={LogFood}/>
          <Route exact path="/logstool" component={LogStool}/>
          <Route exact path="/logs" component={Logs}/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/emailverification" component={EmailVerification}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/verifyforgottenpassword" component={ResetPassword} />
        </section>
      </Fragment>
    </Router>
  );
}


