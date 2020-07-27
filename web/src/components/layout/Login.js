import React, {Component} from 'react';
import { login } from '../../api/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : '',
            password : ''

        }
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }


    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }


    onSubmit(e){
        const { username, password } = this.state;
        e.preventDefault()

        login(username, password).then((res) => {

            //if local storage user profile is not email verified, redirect to Email Verification, else go to logs
            if(JSON.parse(localStorage.getItem('user')).verified === false)
            {
                window.location.href = '/emailverification'
            }
            else
            {
                window.location.href = "/logs";
            }

        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            password: ''
        });
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type = "string"
                               required
                               className="form-control"
                               value = {this.state.username}
                               onChange = {this.onChangeUsername}
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type = "password"
                               required
                               className="form-control"
                               value = {this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type ="submit" value = "Sign In" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

