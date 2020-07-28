import React, {Component} from 'react';
import { doResetPassword} from "../../api/auth";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');

        this.state = {
            password : '',
            confirmPassword: '',
            token,
            tokenInUrl: Boolean(token),
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
        const{ password, confirmPassword, token } = this.state;
        if(password === confirmPassword)
        {
            
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

    render() {
        const { tokenInUrl, token } = this.state;
        return (
            <div class="boxlogE">
                <h3>Reset Your Password </h3><br></br>
                <h4> Enter Your New Password</h4><br></br>
                <p class="sign" align="center">Reset Your Password </p>
                <form onSubmit={this.onSubmit}>
                    { !tokenInUrl && (
                        <div className="form1">
                            <p>Check your email for the token and insert it here</p>
                            <input 
                               class="un "
                               align="center" 
                               type="password"
                               placeholder="Enter token"
                               required
                               value={token}
                               onChange={(e) => this.setState({ token: e.target.value })}
                            />
                        </div>
                    )}
                    <div className="form1">
                        <input 
                           class="un "
                           align="center" 
                           type = "password"
                           placeholder="Enter Your New Password"
                           required
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

