import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () =>
{
    if ((localStorage.getItem('user')) && ( JSON.parse(localStorage.getItem('user')).verified === true))
    {
        return(
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Brist-Tool</h1>
                        <p className="lead">
                            The App To Track Your Health!
                        </p>
                        <div className="buttons">
                            <Link to="/logexercise" className="btn btn-light">Log a Exercise</Link>
                            <Link to="/Logfood" className="btn btn-light">Log a Food / Drink</Link>
                            <Link to="/logstool" className="btn btn-light">Log a Stool</Link>
                        </div>
                    </div>
                </div>
            </section>
        )

    }
    else
    {
        return(
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Brist-Tool</h1>
                        <p className="lead">
                            The App To Track Your Health!
                        </p>
                        <div className="buttons">
                            <Link to="/register" className="btn btn-light">Register</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                        <div>
                            <br/>
                            <Link to="/forgotpassword" className="btn btn-primary">Forgot Your Password?</Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
    export default Landing