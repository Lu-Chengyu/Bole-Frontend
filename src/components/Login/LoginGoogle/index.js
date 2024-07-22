import React,{Component} from "react";
import axios from 'axios';
import "./styles.css";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin  } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { FcGoogle } from 'react-icons/fc';
import api from "../../../API/BaseURL/BaseURL"
import {Link, Redirect} from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const LoginGoogle = () => {
  const responseGoogle = (response) => {
    console.log("Login Success", response);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    console.log(this);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    // 在这里处理 Google 注册成功后的逻辑
    // client.createIfNotExists(doc).then(() => {
    //   navigate('/', { replace: true });
    // });
  };

  const responseGoogleError = (error) => {
    console.log("Login failed", error);
    // 在这里处理 Google 注册失败后的逻辑
  };

  let login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
        console.log(codeResponse);
        const tokens = await axios.post(
            'http://localhost:3001/user/auth/google', {
                code: codeResponse.code,
            });

        console.log(tokens);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div className="LoginGoogle">
      <form>
        {/* 在这里放置其他注册表单字段 */}
        {/* <GoogleLogin
          // clientId="1793847094@11.com"
          clientId="1088785554915-f89749drvd0g6c72bh82drtft303t3vk.apps.googleusercontent.com"
          buttonText="使用 Google 账号注册"
          onSuccess={responseGoogle}
          onFailure={responseGoogleError}
          cookiePolicy={'single_host_origin'}
        /> */}
        {/* <GoogleOAuthProvider clientId="1088785554915-f89749drvd0g6c72bh82drtft303t3vk.apps.googleusercontent.com"> */}
          <Button onClick={() => login()}>Sign in with Google 🚀</Button>
          {/* <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" /> Sign in with google
              </button>
            )}
            buttonText="使用 Google 账号注册"
            onSuccess={responseGoogle}
            onFailure={responseGoogleError}
            cookiePolicy="single_host_origin"
          /> */}
        {/* </GoogleOAuthProvider> */}
      </form>
    </div>
  );
};

// class LoginGoogle extends Component {
//   constructor(props, ...args) {
//     super(props, ...args);
//     this.state = {
//         errors: {},
//         callback: "not fired",
//         loading: false,
//         redirect: null,
//         jobId: localStorage.getItem("jobId"),
//         jobTitle: localStorage.getItem("jobTitle"),
//         jobCompany: localStorage.getItem("jobCompany"),
//         scrollPosition: null,
//     };
//   }

//   responseGoogle = (response) => {
//     console.log(response);
//     const userObject = jwt_decode(response.credential);
//     console.log("Login Success", userObject);
//     localStorage.setItem('user', JSON.stringify(userObject));
//     const { name, sub, picture, email } = userObject;

//     if(this.state.jobId) {
//       this.setState({scrollPosition: localStorage.getItem('scrollPosition')});
//     }

//     localStorage.clear();
//     let userData = {
//         email: email,
//         loginType: "google",
//     }
//     console.log(this.state)

//     api.post('user/login/', userData)
//         .then((res) => {
//             console.log("login res: ", res.data);
//             if (res.status === 200) {
//                 localStorage.setItem('accessToken', res.data.access);
//                 localStorage.setItem('refreshToken', res.data.refresh);
//                 localStorage.setItem('userId', res.data.userId);
//                 localStorage.setItem('isStartup', res.data.startup);
//                 localStorage.setItem('logStatus', true);
//                 this.setState({loading: true});
//                 if(this.state.jobId) {
//                     this.setState({redirect: 'jobs'});
//                     localStorage.setItem('scrollPosition', this.state.scrollPosition)
//                 }else {
//                     this.setState({redirect: 'home'});
//                 }
//             }
//         })
//         .catch((err) => {
//           api
//           .post('user/create/', userData)
//           .then((res) => {
//               if (res.status === 200) {
//                   let userId = res.data.userId;
//                   let isStartup = res.data.isStartup;
//                   localStorage.setItem('userId', userId);
//                   localStorage.setItem('isStartup', isStartup);
//                   localStorage.setItem('logStatus', true);
//                   // this.setState({loading: true});
//                   // this.success();
//                   this.setState({redirect: 'home'})
//               } else if (res.status === 409) {
//                   alert("User with this E-Mail already exists!");
//                   this.setState({loading: false})
//               }
//           })
//           .catch((err) => {
//               alert("Something went wrong!");
//               this.setState({loading: false})
//           })
//         })
//   };

//   responseGoogleError = (error) => {
//     console.log("Login failed", error);
//     // 在这里处理 Google 注册失败后的逻辑
//   };

//   render(){
//     if (this.state.redirect === 'home') {
//       return <Redirect to='/profile'/>
//     }
//     if (this.state.redirect === 'jobs') {
//       return <Redirect to={{
//           pathname: `/jobs/apply/${this.state.jobId}`,
//           state: {
//               id: this.state.jobId,
//               title: this.state.jobTitle,
//               company: this.state.jobCompany,
//               refresh: true
//           }
//       }}/>
//     }
//     return (
//       <div className="LoginGoogle">
//         <form>
//           {/* 在这里放置其他注册表单字段 */}
//           {/* <GoogleLogin
//             // clientId="1793847094@11.com"
//             clientId="1088785554915-f89749drvd0g6c72bh82drtft303t3vk.apps.googleusercontent.com"
//             buttonText="使用 Google 账号注册"
//             onSuccess={responseGoogle}
//             onFailure={responseGoogleError}
//             cookiePolicy={'single_host_origin'}
//           /> */}
//           <GoogleOAuthProvider clientId="1088785554915-f89749drvd0g6c72bh82drtft303t3vk.apps.googleusercontent.com">
//             <GoogleLogin
//               render={(renderProps) => (
//                 <button
//                   type="button"
//                   className=""
//                   onClick={renderProps.onClick}
//                   disabled={renderProps.disabled}
//                 >
//                   <FcGoogle className="" /> Sign in with google
//                 </button>
//               )}
//               buttonText="使用 Google 账号注册"
//               onSuccess={this.responseGoogle}
//               onFailure={this.responseGoogleError}
//               cookiePolicy="single_host_origin"
//             />
//             {/* <useGoogleLogin/> */}
//           </GoogleOAuthProvider>
//         </form>
//       </div>
//     );
//   }

// };

export default LoginGoogle;
