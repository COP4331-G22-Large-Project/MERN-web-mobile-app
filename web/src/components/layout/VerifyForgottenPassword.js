import React, {Component} from 'react';
import {askResetPassword, verifyReset} from "../../api/auth";

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



        verifyReset(this.state.passwordVerification).then(res =>{
            window.location.href ='/resetpassword'
        } )
        this.setState({
            passwordVerification : ''
        })

    }

    render(){
        return(
            <div class="boxlogE">
                <p class="sign" align="center">Verify Code</p>
                <p class="sign" align="center">Enter the Verification Code sent to your email</p>
            
                <form onSubmit={this.onSubmit}>
                    <div className="form1">
                        <input type = "string"
                               class="un "
                               align="center" 
                               placeholder="Verification Code"
                               required
                               value = {this.state.passwordVerification}
                               onChange = {this.onChangeVerifyCode}
                        />
                    </div>
                    <br></br>
                    <div className="form1">
                        <input type ="submit" value = "Verify Code" className="submitresend"align="center" />
                    </div>
                </form>
            </div>
        )
    }
}

