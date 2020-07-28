import React from 'react'
import { Link } from 'react-router-dom';
import logo from "./bristtool1.png";


const Landing = () =>{
    if(localStorage.getItem('user'))
    {
    return(
        <section className="landing">
        <div className="dark-overlay">

          <div className="landing-inner">
              <img className='photo1' src={logo}/>
            <h1 className="x-large">Brist-Tool</h1>
            <p className="lead">
              The App To Track Your Health!
            </p>
            <div className="buttons">
              <Link to="/logfood" className="btn btn-light">Log A Food/Drink</Link>
              <Link to="/logexercise" className="btn btn-light">Log an Exercise</Link>
                <Link to="/logstool" className="btn btn-light">Log A Stool</Link>

            </div>
              <br/>
              <div className="buttons">
                  <Link to="/logs" className="btn btn-primary">View Logs</Link>

              </div>
          </div>
        </div>
      </section>
    )}
    else
    {
        return(
            <section className="landing">
                <div className="dark-overlay">

                    <div className="landing-inner">
                        <img className='photo1' src={logo}/>
                        <h1 className="x-large">Brist-Tool</h1>
                        <p className="lead">
                            The App To Track Your Health!
                        </p>
                        <div className="buttons">
                            <Link to="/register" className="btn btn-light">Register</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                        <br/>
                        <div className="buttons">
                            <Link to="/forgotpassword" className="btn btn-primary">Forgot Your Password?</Link>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

    export default Landing