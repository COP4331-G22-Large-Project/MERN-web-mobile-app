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
            <div class="boxlogE">
                <p class="sign" align="center">Forgot Your Password?</p>
                <p class="sign" align="center">Enter the email address associated with the registered Account</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form1">
                        <input 
                               class="un "
                               align="center" 
                               type = "string"
                               placeholder="Email"
                               required
                               value = {this.state.email}
                               onChange = {this.onChangeEmail}
                        />
                    </div>
                    <br></br>
                    <div className="form1">
                        <input type ="submit" value = "Send Email" className="submit"align="center"/>
                    </div>
                </form>
            </div>
        )
    }
}

