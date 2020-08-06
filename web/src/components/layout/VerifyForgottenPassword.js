import React, {Component} from 'react';
import {verifyEmail} from "../../api/auth";

export default class VerifyForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeVerifyCode = this.onChangeVerifyCode.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            passwordVerification : ''
        }
    }

    onChangeVerifyCode(e){
        this.setState({
            passwordVerification : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()



        verifyEmail(this.state.passwordVerification).then(res =>{
            window.location.href ='/resetpassword'
        } )
        this.setState({
            passwordVerification : ''
        })

    }

    render(){
        return(
            <div class= 'boxlogE'>
                <p className="sign" align="center">Verify Code </p>
                <p align="center">Enter Verification Code Sent to Email</p><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p  align="center">Verification Code </p>
                        <input class='un'
                            type = "string"
                               required
                               value = {this.state.passwordVerification}
                               onChange = {this.onChangeVerifyCode}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type ="submit" value = "Verify Code" className="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

