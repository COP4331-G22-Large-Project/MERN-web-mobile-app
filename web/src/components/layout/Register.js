import React, {Component} from 'react';
import { register } from '../../api/auth';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : '',
            firstName : '',
            lastName : '',
            email : '',
            password :'',
            confirmPassword : ''
        }
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }
     onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        })
     }

     onChangeLastName(e){
        this.setState({
            lastName : e.target.value
        })
     }

     onChangeEmail(e){
        this.setState({
            email : e.target.value
        })
     }

     onChangePassword(e){
        this.setState({
            password:e.target.value
        })
     }

     onChangePasswordConfirm(e){
        this.setState({
            confirmPassword : e.target.value
        })
     }

     onSubmit(e){
        e.preventDefault()
        const
        {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = this.state;

        if (password === confirmPassword)
        {
            register(username, password, email, firstName, lastName).then((res) => {
                window.location.href = "/emailverification";
                this.setState({
                    username : '',
                    firstName : '',
                    lastName : '',
                    email : '',
                    password :'',
                    confirmPassword : ''
                });
            }).catch((err) => {

            })
        }
        else
        {
            console.log("Passwords do NOT match")
        }
     }

     render(){
         return(
             <div>
                 <h3>Register A User</h3>
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
                         <label>First Name: </label>
                         <input type = "string"
                                required
                                className="form-control"
                                value = {this.state.firstName}
                                onChange={this.onChangeFirstName}
                         />
                     </div>
                     <div>
                         <label>Last Name: </label>
                         <input type = "string"
                                required
                                className="form-control"
                                value = {this.state.lastName}
                                onChange={this.onChangeLastName}
                         />
                     </div>
                     <div>
                         <label>Email: </label>
                         <input type = "string"
                                required
                                className="form-control"
                                value = {this.state.email}
                                onChange={this.onChangeEmail}
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
                     <div>
                         <label>Confirm Password: </label>
                         <input type = "password"
                                required
                                className="form-control"
                                value = {this.state.confirmPassword}
                                onChange={this.onChangePasswordConfirm}
                         />
                     </div>
                     <div className="form-group">
                         <input type ="submit" value = "Register Account" className="btn btn-primary"/>
                     </div>
                 </form>
             </div>
         )
     }
}

