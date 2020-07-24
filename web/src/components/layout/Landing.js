import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () =>{
    return(
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Bristol Stool Chart</h1>
            <p className="lead">
              The method to track your health
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-landingregister">Register</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

    export default Landing