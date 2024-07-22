import React, {Component} from 'react';
import './styles.css';
import Loader from '../../components/Loader/Loader';
import {Link, Redirect} from 'react-router-dom';
import api from "../../API/BaseURL/BaseURL"
import Navbar from "../../components/Navbar";
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


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            otp: "",
            showPassword: false,
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
        console.log("values", values);
        let userData = {
            email: values["email"],
            password: values["password"],
            isStartup: (values["isStartup"] === "Startup"),
            loginType:"normal",
        }

        console.log("userData: ", userData);
        api.post('user/create/verifyOTP/', {email: values["email"], otp: values["captcha"]})
            .then((res) => {
                if (res.status === 200) {
                    api
                        .post('user/create/', userData)
                        .then((res) => {
                            if (res.status === 200) {
                                let userId = res.data.userId;
                                let isStartup = res.data.isStartup;
                                localStorage.setItem('userId', userId);
                                localStorage.setItem('isStartup', isStartup);
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

        return (
            <div>
                <Navbar/>
                <MessageHolder ref={this.messageRef}/>
                <div className='signupBody'>
                    {this.state.loading ?
                        <Loader/> :
                        <div className='signupForm'>
                            <Form
                                name="normal_login"
                                className="login-form"
                                ref={this.formRef}
                                initialValues={{remember: true}}
                                onFinish={this.handleSubmit}
                            >
                                <h5 className="formOneHead">Begin Opening Limitless Exploration at BoLe</h5>

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
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!'
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

                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                                    type="password"
                                                    placeholder="Confirm Password"/>
                                </Form.Item>

                                <Form.Item
                                    name="isStartup"
                                    // hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your account type!'
                                        }
                                    ]}
                                >
                                    <Select placeholder="Account Type">
                                        <Select.Option value="Startup">Startup</Select.Option>
                                        <Select.Option value="JobSeeker">Job Seeker</Select.Option>
                                    </Select>
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

                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    className="agreement_check"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Please read the agreement!')),
                                        },
                                    ]}
                                >
                                    <Checkbox>
                                        I have read the <a href="">agreement</a>
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <button type="primary" htmlType="submit" className="login-form-button">
                                        Register
                                    </button>
                                </Form.Item>
                                <div className="linkLogin">
                                    Already on BoLe?
                                    <Link to="/login">
                                        <span className='"signupFont'> Log in!</span>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export default Register;