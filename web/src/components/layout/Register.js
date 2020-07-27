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
                window.location.href = "/emailverification?email=" + window.encodeURI(res.data.email);
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
            <div class="boxregister">
                <p class="sign" align="center">REGISTER</p>
                 <form onSubmit={this.onSubmit}>
                     <div className="form1">
                         <input class="un "
                                align="center" 
                                type = "string"
                                placeholder="Username"
                                required
                                value = {this.state.username}
                                onChange = {this.onChangeUsername}
                         />
                     </div>
                     <div class="form1">
                         <input class="un "
                                align="center"
                                type = "string"
                                placeholder="First Name"
                                required
                                value = {this.state.firstName}
                                onChange={this.onChangeFirstName}
                         />
                     </div>
                     <div class="form1">
                         <input class="un "
                                align="center"
                                type = "string"
                                placeholder="Last Name"
                                required
                                value = {this.state.lastName}
                                onChange={this.onChangeLastName}
                         />
                     </div>
                     <div class="form1">
                         <input class="un "
                                align="center"
                                type = "string"
                                placeholder="Email"
                                required
                                value = {this.state.email}
                                onChange={this.onChangeEmail}
                         />
                     </div>
                     <div class="form1">
                         <input class="un "
                                align="center"
                                type = "password"
                                placeholder="Password"
                                required
                                value = {this.state.password}
                                onChange={this.onChangePassword}
                         />
                     </div>
                     <div class="form1">
                         <input class="un "
                                align="center"
                                type = "password"
                                placeholder="Confirm Password"
                                required
                                value = {this.state.confirmPassword}
                                onChange={this.onChangePasswordConfirm}
                         />
                     </div>
                     <div className="form1" >
                        <input type ="submit" value = "Register" className="submit"align="center" />
                    </div>
                 </form>
             </div>
         )
     }
}

