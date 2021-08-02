import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReCAPTCHA from "react-google-recaptcha";
import { signup, login } from "../utils/requests";

import 'react-notifications/lib/notifications.css';

import 'react-tabs/style/react-tabs.css';
import { GOOGLE_PUBLIC_SECRET } from "../utils/constants";


export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    recaptchaChange = (recaptcha) => {
        this.setState({recaptcha})
    }

    handleSignup = async (e) => {

        const {NotificationManager} = this.props;
        e.preventDefault();

        let form = e.target.elements;
        let name = form[0].value;
        let email = form[1].value;
        let passwd = form[2].value;
        let passwd2 = form[3].value;

        if (passwd !== passwd2) {return NotificationManager.error('Password does not match', 'Password Error');}

        if (name && email && passwd && passwd === passwd2) {
            if (this.state.recaptcha) { // remove this

                const results = await signup(name, email, passwd, this.state.recaptcha, localStorage.getItem("referral"))
                if (results.error) {
                    NotificationManager.error('Error', results.message[0].messages[0].message);
                } else {
                    NotificationManager.success("You can log in to your account now", 'Account created');
                    this.props.closeModal()
                    this.props.setLogin(results.data)
                }
            } else {
                NotificationManager.error('Please verify the recaptcha', 'Recaptcha Error');
            }
        } else {
            NotificationManager.error('Please enter your informations', 'Invalid');
        }
    }

    handlePasswordStrengh = (e) => {
    }

    handleLogin = async (e) => {
        const {NotificationManager} = this.props;

        e.preventDefault();

        let form = e.target.elements;
        let email = form[0].value;
        let passwd = form[1].value;

        if (email && passwd) {
            const results = await login(email, passwd)


            if (results.error) {
                NotificationManager.error(results.message[0].messages[0].message, 'Error');
            } else {
                NotificationManager.success("Welcome", 'Log in');
                this.props.closeModal()
                this.props.setLogin(results.data)
                // setTimeout(() => window.location.reload(false), 2000)
            }
        } else {
            NotificationManager.error('Please enter your informations', 'Invalid');
        }
    }

    render() {
        const {language} = this.props;
        return <Tabs>
        <TabList>
          <Tab>{language?language?.signup:'Sign UP'}</Tab>
          <Tab>{language?language?.login:'Log In'}</Tab>
        </TabList>
    
        <TabPanel>
            <form onSubmit={this.handleSignup} className="input">
                <div className="info-card info-card__content">
                    <h3 className="info-card__header">{language?language?.create_an_account:'Create an account'}</h3>
                    <input type="text" name="username" className="input__main" placeholder={language?language?.username:"Username"} />
                    <input type="email" name="email" className="input__main" placeholder={language?language?.email:"Email"} />
                    <input type="password" onChange={this.handlePasswordStrengh} name="passwd" className="input__main" placeholder={language?language?.password:"Password"} />
                    <input type="password" name="passwd2" className="input__main" placeholder={language?language?.confirm_password:"Confirm Password"} />
                    <ReCAPTCHA
                        sitekey={GOOGLE_PUBLIC_SECRET}
                        onChange={this.recaptchaChange}
                    />
                    <button type="submit" className="btn__big btn_content">
                        <span className="btn__big--front">
                            {language?language?.signup:'Sign Up'}
                        </span>
                    </button>
                    <br/>
                    {this.state.Err?<><span className="span-error">{this.state.Err}</span><br/></>:""}

                </div>
            </form>
        </TabPanel>
        <TabPanel>
        <form onSubmit={this.handleLogin} className="input">
                <div className="info-card info-card__content">
                    <h3 className="info-card__header">{language?language?.login_to_your_account:'Login to your account'}</h3>
                    <input type="text" name="email" className="input__main" placeholder={language?language?.email_or_username:"Email or Username"} />
                    <input type="password" name="password" className="input__main" placeholder={language?language?.password:"Password"} />
                    <button type="submit" className="btn__big btn_content">
                        <span className="btn__big--front">
                            {language?language?.login:'Log In'}
                        </span>
                    </button>
                    <br/>
                    {this.state.Err?<><span className="span-error">{this.state.Err}</span><br/></>:""}

                </div>
            </form>
        </TabPanel>
      </Tabs>
    }
}