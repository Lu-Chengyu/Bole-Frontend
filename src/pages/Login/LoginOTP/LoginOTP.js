import React, {Component} from 'react';
import '../styles.css';
import {Link, Redirect} from 'react-router-dom';
import api from "../../../API/BaseURL/BaseURL"
import Navbar from "../../../components/Navbar";
import {Checkbox, Form, Input, Button, Col, Row, Select, message, Space} from "antd";
import {LockOutlined, RedoOutlined, UserOutlined} from "@ant-design/icons";

class MessageHolder extends React.Component {
    open = (messageConfig) => {
        message.open(messageConfig);
    };

    render() {
        return null;
    }
}


class LoginOTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            otp: "",
            isOtpSent: false,
            isOtpValid: false,
            isStartup: false,
            loading: null,
            redirect: null,
            showSuccessPopup: false,
            // onCountdownComplete: false,
            countdown: 0,
            isCounting: false,
            isFirstTime: true,
        };
        this.messageRef = React.createRef();
        this.timer = null;
    }

    formRef = React.createRef();

    success = () => {
        this.messageRef.current.open({
            type: 'success',
            content: 'Register successfully!',
        });
    };

    startCountdown = () => {
        this.setState({countdown: 60, isCounting: true, isFirstTime: false});
        this.timer = setInterval(() => {
            this.setState((prevState) => ({
                countdown: prevState.countdown - 1,
            }), () => {
                if (this.state.countdown === 0) {
                    clearInterval(this.timer);
                    this.setState({isCounting: false});
                }
            });
        }, 1000);
    };

    sendOTP = () => {
        let values_email = this.formRef.current.getFieldValue('email');
        if (!values_email) {
            alert("Please enter your email!");
        } else {
            api
                .post('user/create/sendOTP', {email: values_email})
                .then((res) => {
                    if (res.status === 200) {
                        // alert("OTP sent successfully!");
                        this.setState({isOtpSent: true});
                        if (!this.state.isCounting) {
                            this.startCountdown();
                        }
                    }
                })
                .catch((err) => {
                    alert(err);
                })
        }
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    redirectToOtpVerifcation = () => {
        this.setState({redirect : 'forgotPassword'});
    }


    handleSubmit = (values) => {
        console.log("values", values);
        let userData = {
            email: values["email"],
        }

        // console.log("userData: ", userData);
        api.post('user/create/verifyOTP/', {email: values["email"], otp: values["captcha"]})
            .then((res) => {
                if (res.status === 200) {
                    api
                        .post('user/create/', userData)
                        .then((res) => {
                            if (res.status === 200) {
                                let userId = res.data.userId;
                                localStorage.setItem('userId', userId);
                                localStorage.setItem('logStatus', true);
                                // this.setState({loading: true});
                                this.success();
                                setTimeout(() => {
                                    this.setState({redirect: 'home'})
                                }, 1000 * 3)
                            } else if (res.status === 409) {
                                alert("User with this E-Mail already exists!");
                                this.setState({loading: false})
                            }
                        })
                        .catch((err) => {
                            alert("Something went wrong!");
                            this.setState({loading: false})
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({loading: false});
                if (err.response.status === 400) {
                    alert('OTP expired!');
                }
                if (err.response.status === 403) {
                    alert('Wrong OTP entered!');
                }
            })
    }


    render() {
        const {countdown, isCounting, isFirstTime} = this.state;
        if (this.state.redirect === 'home') {
            return <Redirect to='/profile'/>
        }
        if (this.state.redirect === 'forgotPassword') {
            return <Redirect to='/forgotPassword'/>
        }

        return (
            <div>
                <Navbar/>
                <MessageHolder ref={this.messageRef}/>
                <div className='signupBody'>

                        <div className='signupForm'>
                            <Form
                                name="normal_login"
                                className="login-form"
                                ref={this.formRef}
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
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Email"/>
                                </Form.Item>

                                <Form.Item>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="captcha"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter the captcha you got!'
                                                    },
                                                    {
                                                        len: 6,
                                                        message: 'captcha must be 6 number!'
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="captcha"/>
                                            </Form.Item>
                                        </Col>
                                        <Row span={12}>
                                            <Button onClick={this.sendOTP} disabled={isCounting}>
                                                {!isFirstTime && <RedoOutlined/>} Get captcha
                                                {isCounting && ` (${countdown})`}
                                            </Button>
                                        </Row>
                                    </Row>
                                </Form.Item>

                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <a className="login-form-forgot" onClick={this.redirectToOtpVerifcation}>
                                        Forgot password
                                    </a>
                                </Form.Item>

                                <Form.Item>
                                    <button type="primary" htmlType="submit" className="login-form-button">
                                        Login
                                    </button>
                                </Form.Item>
                                {/*<div className="linkLogin">*/}
                                {/*    Already on BoLe?*/}
                                {/*    <Link to="/login">*/}
                                {/*        <span className='"signupFont'> Log in!  </span>*/}
                                {/*    </Link>*/}
                                {/*    |  Login with password*/}
                                {/*</div>*/}

                                <div className="linkSignup">
                                    New to BoLe?
                                    <Link to="/register">
                                        <span className='"signupFont'> Join us!</span>
                                    </Link>
                                        <span className='"signupFont'>  |  Login with </span>
                                    <Link to="/register">
                                        <span className='"signupFont'> password!</span>
                                    </Link>

                                </div>
                            </Form>
                        </div>

                </div>
            </div>
        );
    }
}


export default LoginOTP;