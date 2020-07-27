import React, {Component} from 'react';
import { doResetPassword} from "../../api/auth";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            password : '',
            confirmPassword:""
        }
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        const{password,confirmPassword} = this.state
        if(password === confirmPassword)
        {
            const searchParams = new URLSearchParams(window.out)
            const token = searchParams.get("token")
            if(token)
            {

                 doResetPassword(password, token).then((res) => {
                    window.location.href = '/login'
                 })
                .catch((err) => {
                    console.log(err)
                })
            }
            else
            {
                alert("You dont have a valid token")
            }
            this.setState({
                password : '',
                confirmPassword: ''
            })
        }
        else
        {
            alert("Your passwords don't match");
        }



    }

    render(){
        return(
            <div>
                <h3>Reset Your Password </h3><br></br>
                <h4> Enter Your New Password</h4><br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type = "password"
                               required
                               className="form-control"
                               value = {this.state.password}
                               onChange = {this.onChangePassword}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type = "password"
                               required
                               className="form-control"
                               value = {this.state.confirmPassword}
                               onChange = {this.onChangeConfirmPassword}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type ="submit" value = "Reset Password" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

