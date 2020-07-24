import React, {Component} from 'react';
import axios from 'axios';

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

         if(this.state.password === this.state.confirmPassword)
         {
             const user = {
                 username: this.state.username,
                 firstName: this.state.firstName,
                 lastName: this.state.lastName,
                 email: this.state.email,
                 password: this.state.password,
                 confirmPassword: this.state.confirmPassword
             }

             console.log(user)
             axios.post('http://localhost:3000/api/auth/register',user)
                 .then(res => console.log(res.data))

             this.setState({
                 username : '',
                 firstName : '',
                 lastName : '',
                 email : '',
                 password :'',
                 confirmPassword : ''
             })
         }
         else
         {
             console.log("Passwords do NOT match")
         }


     }

     render(){
         return(
            <section className="center">

             <div>
                 <h1 className="large text-primary">REGISTER</h1>
                 <p className="lead"><i class="fas fa-user"></i> Sign Up an Account</p>
                 <form onSubmit={this.onSubmit}>
                     <div className="form-group">
                         <input type = "string"
                                placeholder="UserName"
                                required
                                className="form-control"
                                value = {this.state.username}
                                onChange = {this.onChangeUsername}
                         />
                     </div>
                     <div>
                         <input type = "string"
                                placeholder="First Name"
                                required
                                className="form-control"
                                value = {this.state.firstName}
                                onChange={this.onChangeFirstName}
                         />
                     </div>
                     <div>
                         <input type = "string"
                                placeholder="Last Name"
                                required
                                className="form-control"
                                value = {this.state.lastName}
                                onChange={this.onChangeLastName}
                         />
                     </div>
                     <div>
                         <input type = "string"
                                placeholder="Email"
                                required
                                className="form-control"
                                value = {this.state.email}
                                onChange={this.onChangeEmail}
                         />
                     </div>
                     <div>
                         <input type = "password"
                                placeholder="Password"
                                required
                                className="form-control"
                                value = {this.state.password}
                                onChange={this.onChangePassword}
                         />
                     </div>
                     <div>
                         <input type = "password"
                                placeholder="Confirm Password"
                                required
                                className="form-control"
                                value = {this.state.confirmPassword}
                                onChange={this.onChangePasswordConfirm}
                         />
                     </div>
                     <div className="form-group">
                         <input type ="submit" value = "Register" className="btn btn-register"/>
                     </div>
                 </form>
             </div>
             </section>

         )
     }
}

