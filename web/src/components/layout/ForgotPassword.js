import React, {Component} from 'react';
import {askResetPassword} from "../../api/auth";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email : '',
            sent: false,
        }
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const { email } = this.state;

        askResetPassword(email).then((res) =>
        {
            window.location.href = '/verifyforgottenpassword'
        })
        .catch((err) =>
        {
            console.log(err)
        });

        this.setState({
            email : ''
        });
    }

    render(){
        const { sent } = this.state;
        return(
            <div class="boxregister">
                <p class ='sign' align ='center'>Forgot Your Password? </p><br></br>
                <p align='center' > Enter the email address associated with the registered Account</p><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p align='center'>Email: </p>
                        <input class='un'
                               align = "center"
                               type = "string"
                               required
                               value = {this.state.email}
                               onChange = {this.onChangeEmail}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type ="submit" align='center ' value = "Send Email" className="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

