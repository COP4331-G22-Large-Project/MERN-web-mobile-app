import React, {Component} from 'react';
import { login } from '../../api/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : '',
            password : ''

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
        const { username, password } = this.state;
        e.preventDefault()
        login(username, password).then((res) => {
            window.location.href = "/logs";
            localStorage.setItem('user', JSON.stringify(res.data));
        }).catch((error) => {
            
        });

        this.setState({
            password: ''
        });
    }

    render(){
        return(
            <div class="boxlogin">

                <p class="sign" align="center">LOGIN</p>
                <form onSubmit={this.onSubmit}>
                    <div class="form1">
                        <input class="un "
                               type = "string"
                               align="center" 
                               placeholder="Username"
                               required
                               value = {this.state.username}
                               onChange = {this.onChangeUsername}
                        />
                    </div>
                    <div class="form1">
                        <input 
                               class="un "
                               align="center" 
                               type = "password"
                               placeholder="Password"
                               required
                               value = {this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form1" >
                        <input type ="submit" value = "Login" className="submit"align="center" />
                    </div>
                </form>
            </div>

        )
    }
}

