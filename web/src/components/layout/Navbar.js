import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = props => {
    if (props.isAuth) {
        return (
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> Brist-Tool</Link>
                </h1>

                <ul>
                    <li><Link to="Log Exercise">LogExercise</Link></li>
                    <li><Link to="Log Food">LogFood</Link></li>
                    <li><Link to="Log Stool">LogStool</Link></li>
                    <li><Link to="View Logs">Logs</Link></li>
                </ul>
            </nav>


        )
    }
    else
    {
        return (

            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> Brist-Tool</Link>
                </h1>

                <ul>
                    <li><Link to="Register">Register</Link></li>
                    <li><Link to="login">Login</Link></li>
                </ul>
            </nav>

        )
    }


}
    export default Navbar