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
            <div>
                <h3>Verify Code</h3><br></br>
                <h4> Enter the Verification Code sent to your email</h4><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Verification Code: </label>
                        <input type = "string"
                               required
                               className="form-control"
                               value = {this.state.passwordVerification}
                               onChange = {this.onChangeVerifyCode}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type ="submit" value = "Verify Code" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

