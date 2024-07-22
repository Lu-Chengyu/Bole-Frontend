import React, {Component} from 'react';
import './styles.css';
import Loader from '../../components/Loader/Loader';
import {Link, Redirect, BrowserRouter, Route, Switch} from 'react-router-dom';
import api from "../../API/BaseURL/BaseURL";
import Navbar from "../../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import {Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {If} from "../../components/If";
import LoginGoogle from '../../components/Login/LoginGoogle';
import LinkedInPage from '../../components/Login/LoginLinkedin'
import { LinkedInCallback } from "react-linkedin-login-oauth2";
const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";


class Login extends Component {
    constructor(props, ...args) {
        super(props, ...args);
        this.state = {
            errors: {},
            callback: "not fired",
            value: "[empty]",
            verify: true,
            expired: "false",
            loading: false,
            redirect: null,
            jobId: localStorage.getItem("jobId"),
            jobTitle: localStorage.getItem("jobTitle"),
            jobCompany: localStorage.getItem("jobCompany"),
            scrollPosition: null,
        };
        this._reCaptchaRef = React.createRef();
    }

    passwordValidationRules = (getFieldValue) => ({
        validator(_, value) {
            // if (!value || value.length < 6) {
            //     return Promise.reject('Password must be at least 6 characters long');
            // }
            if (/\s/.test(value)) {
                return Promise.reject('Password cannot contain spaces!');
            }
            return Promise.resolve();
        },
    });

    handleSubmit = (values) => {
        // e.preventDefault();
        // console.log("Form values:", values);
        // console.log("Form values[email]:", values["email"]);\
        if(this.state.jobId) {
            this.setState({scrollPosition: localStorage.getItem('scrollPosition')});
        }

        localStorage.clear();
        let userData = {
            email: values["email"],
            password: values["password"],
            loginType: "normal",
        }

        if (this.state.value !== null && this.state.value !== "[empty]") {
            api.post('user/login/', userData)
                .then((res) => {
                    console.log("login res: ", res.data);
                    if (res.status === 200) {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        localStorage.setItem('refreshToken', res.data.refreshToken);
                        localStorage.setItem('userId', res.data.userId);
                        localStorage.setItem('isStartup', res.data.isStartup);
                        // console.log("setuserId: ", res.data.userId)
                        // console.log("setisStartup: ", res.data.startup)
                        localStorage.setItem('logStatus', true);
                        this.setState({loading: true});
                        if(this.state.jobId) {
                            this.setState({redirect: 'jobs'});
                            localStorage.setItem('scrollPosition', this.state.scrollPosition)
                        }else {
                            this.setState({redirect: 'home'});
                        }
                        // this.setState({redirect: this.props.location.state.jobId
                        //         ? this.props.location.state.jobId
                        //         : 'home'
                        // });
                        // setTimeout(() => {
                        //     this.setState({redirect: 'home'})
                        // }, 1000 * 3)
                    }
                })
                .catch((err) => {
                    console.log(err.response.status);
                    console.log(err.response);
                    let errorStatus = err.response.status;
                    this.setState({loading: false});
                    if (errorStatus === 400) {
                        alert('No account found, linked to this email!');
                    }
                    if (errorStatus === 401) {
                        alert('Password entered is incorrect!');
                    }
                    console.log(err);
                })
        } else {
            this.setState({verify: false});
        }
    };


    handleRecaptchaChange = (value) => {
        // console.log("Captcha value:", value);
        this.setState({value});
        // if value is null recaptcha expired
        if (value === null) this.setState({expired: "true"});
    };

    redirectToOtpVerifcation = () => {
        this.setState({redirect : 'forgotPassword'});
    }

    render() {
        if (this.state.redirect === 'home') {
            return <Redirect to='/profile'/>
        }
        if (this.state.redirect === 'forgotPassword') {
            return <Redirect to='/forgotPassword'/>
        }
        if (this.state.redirect === 'jobs') {
            return <Redirect to={{
                pathname: `/jobs/apply/${this.state.jobId}`,
                state: {
                    id: this.state.jobId,
                    title: this.state.jobTitle,
                    company: this.state.jobCompany,
                    refresh: true
                }
            }}/>
        }

        return (
            <div>
                <Navbar/>
                <div className='loginBody'>
                    {/*{this.state.loading ?*/}
                    {/*    <Loader/> :*/}
                    <div className='loginForm'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={this.handleSubmit}
                        >
                            <h5 className="formOneHead">We've missed you!</h5>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please enter your email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your Password!'
                                    },
                                    {
                                        min: 6,
                                        message: 'Password must be at least 6 characters!'
                                    },
                                    this.passwordValidationRules(Form.getFieldValue)
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" onClick={this.redirectToOtpVerifcation}>
                                    Forgot password
                                </a>
                            </Form.Item>
                            <div className="recaptcha">
                                {/*<h5>Recaptcha value: {value}</h5>*/}
                                {/*<h5>Expired: {expired}</h5>*/}
                                <ReCAPTCHA
                                    style={{display: "inline-block"}}
                                    theme="light"
                                    ref={this._reCaptchaRef}
                                    sitekey={TEST_SITE_KEY}
                                    onChange={this.handleRecaptchaChange}
                                />
                                <If test={this.state.verify === false}>
                                    <div className="text-danger">Please verify your recaptcha!</div>
                                </If>
                            </div>
                            <br/>
                            <Form.Item>
                                <button type="primary" className="login-form-button">
                                    Log in
                                </button>
                            </Form.Item>
                            <div className='login-btn'>
                                {/* <LinkedInPage /> */}
                                <BrowserRouter>
                                    <Switch>
                                        <Route path="/linkedin" component={LinkedInCallback} />
                                        <Route path="/" component={LinkedInPage} />
                                    </Switch>
                                </BrowserRouter>
                                <LoginGoogle />
                            </div>
                            <div className="linkSignup">
                                New to BoLe?
                                <Link to="/register">
                                    <span className='"signupFont'> Join us!</span>
                                </Link>
                                {/*<span>  |  Or login with</span>*/}
                                {/*<Link to="/loginOTP">*/}
                                {/*    <span className='"signupFont'> email verification!</span>*/}
                                {/*</Link>*/}
                            </div>
                        </Form>
                    </div>
                    {/*}*/}
                </div>
            </div>
        );
    }
}

export default Login;