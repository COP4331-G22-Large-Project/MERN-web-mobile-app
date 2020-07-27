import React, {Component} from 'react';
import {askResetPassword} from "../../api/auth";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email : ''
        }
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()


        const{email} = this.state;

        askResetPassword(email).then((res) =>
        {
            window.location.href = '/verifyforgottenpassword'
        })
            .catch((err) =>
            {
                console.log(err)
            })



        this.setState({
            email : ''
        })

    }

    render(){
        return(
            <div>
                <h3>Forgot Your Password? </h3><br></br>
                <h4> Enter the email address associated with the registered Account</h4><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type = "string"
                               required
                               className="form-control"
                               value = {this.state.email}
                               onChange = {this.onChangeEmail}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type ="submit" value = "Send Email" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

