import React, {Component} from 'react';
import {askResetPassword} from "../../api/auth";

export default class VerifyForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeVerifyCode = this.onChangeVerifyCode.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            verifyCode : ''
        }
    }

    onChangeVerifyCode(e){
        this.setState({
            verifyCode : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()


        const{email} = this.state;

        askResetPassword(email).then((res) =>
        {
            window.location.href = '/resetpassword'
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
                <h3>Verify Code</h3><br></br>
                <h4> Enter the Verification Code sent to your email</h4><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type = "string"
                               required
                               className="form-control"
                               value = {this.state.verifyCode}
                               onChange = {this.onChangeVerifyCode}
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

