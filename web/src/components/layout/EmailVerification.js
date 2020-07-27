import React, {Component} from 'react';
import { verifyEmail, retoken } from '../../api/auth';

export default class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.onChangeVerificationCode = this.onChangeVerificationCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        const searchParams = new URLSearchParams(window.location.search);
        const email = searchParams.get('email');

        this.state = {
            verificationCode : '',
            email,
            errorText: '',
        };
    }

    onChangeVerificationCode(e) {
        this.setState({
            verificationCode : e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault()




        verifyEmail(this.state.verificationCode)
            .then(res => {
                window.location.href = "/login";
            })
            .catch((err) => {
                this.setState({ errorText: 'Invalid code' });
            });


        this.setState({ verificationCode : '' });
    }

    resendEmail() {
        const { email } = this.state;
        retoken(email).then((res) => {
            this.setState({ errorText: 'Email resent. Check your inbox.' });
        }).catch((err) => {
            this.setState({ errorText: 'There was a problem resending the email.' });
        });
    }

    render() {

        const { email, errorText } = this.state;
        if(!localStorage.getItem('user'))
        {
            return (
                <div><br/>
                    <h3>Verify Your Email</h3><br/>
                    <p>Check your email at <b>{email}</b>, or enter the code from the email in the field below:</p><br/>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Verify Code: </label>
                            <input
                                type="string"
                                required
                                className="form-control"
                                value={this.state.verificationCode}
                                onChange={this.onChangeVerificationCode}
                            />
                            <p style={{color: 'red'}}>{errorText}</p>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Verify" className="btn btn-primary"/>
                            <input type="button" value="Resend" className="btn btn-primary"
                                   onClick={() => this.resendEmail()}/>
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div><br/>
                <h3>Verify Your Email</h3><br/>
                <p>Check your email or Resend</p><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Verify Code: </label>
                        <input
                            type="string"
                            required
                            className="form-control"
                            value={this.state.verificationCode}
                            onChange={this.onChangeVerificationCode}
                        />
                        <p style={{color: 'red'}}>{errorText}</p>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Verify" className="btn btn-primary"/>
                        <input type="button" value="Resend" className="btn btn-primary"
                               onClick={() => this.resendEmail()}/>
                    </div>
                </form>
            </div>
        )
    }
}

