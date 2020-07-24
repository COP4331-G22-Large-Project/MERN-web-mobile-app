import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : '',
            password :''

        }
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }


    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault()


            const login = {
                username: this.state.username,
                password: this.state.password

            }

            console.log(login)
            axios.post('http://localhost:3000/api/auth/login',login)
                .then(res => console.log(res.data))


            this.setState({
                username : '',
                password :''

            })

    }

    render(){
        return(
            <section className="center">

            <div>
                <h1 className="large text-primary">LOGIN</h1>
                <p className="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>

                <form onSubmit={this.onSubmit}>
                    <div className="form-control">
                        <input type = "string"
                               placeholder="UserName"
                               required
                               className="form-control"
                               value = {this.state.username}
                               onChange = {this.onChangeUsername}
                        />
                    </div>
                    
                    <div className="form-control">

                        <input type = "password"
                               placeholder="Password"
                               required
                               className="form-control"
                               value = {this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-control">
                        <input type ="submit" value = "Login" className="btn btn-primary"/>
                    </div>
                </form>
          </div>
          </section>
          
        )
    }
}

