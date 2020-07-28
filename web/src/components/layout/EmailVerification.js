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
        return(
            <div class="boxverify">
                <p class="sign" align="center">Verify Your Email</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form1">
                    <p class="sign" align="center">Check your email at <b>{email}</b>, or enter the code from the email in the field below:</p>

                        <input class="un "
                            align="center" 
                            type="string"
                            placeholder="Verify Code"
                            required
                            value={this.state.verificationCode}
                            onChange={this.onChangeVerificationCode}
                        />
                        <p style={{ color: 'red' }}>{errorText}</p>
                    </div>
                    <div className="form1">
                        <input type="submit" value="Verify" align="center" className="submit"/>
                        <input type="button" value="Resend" align="center" className="submitresend" onClick={() => this.resendEmail()}/>
                    </div>
                </form>
            </div>
        )
    }
}

