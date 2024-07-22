import React, { useState, Component, useEffect } from 'react';
import styled from "styled-components";
import { LinkedIn, useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import {Link, Redirect} from 'react-router-dom';
import api from "../../../API/BaseURL/BaseURL"
import jwt_decode from "jwt-decode";

class LinkedInPage extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
        errors: {},
        callback: "not fired",
        loading: false,
        redirect: null,
        jobId: localStorage.getItem("jobId"),
        jobTitle: localStorage.getItem("jobTitle"),
        jobCompany: localStorage.getItem("jobCompany"),
        scrollPosition: null,
        userInfo: null
    };
  }

  responseLindedin = (code) => {
    console.log(code);
    useEffect(() => {
      const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
      const clientId = '86s6s90egxn2u3';
      const clientSecret = 'uqoYBLCve2oA4VP1';
      const redirectUri = 'http://localhost:3000/linkedin';
      const tokenParams = new URLSearchParams();
      tokenParams.append('grant_type', 'authorization_code');
      tokenParams.append('code', code);
      tokenParams.append('redirect_uri', redirectUri);
      tokenParams.append('client_id', clientId);
      tokenParams.append('client_secret', clientSecret);
  
      fetch(tokenUrl, {
        method: 'POST',
        body: tokenParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((tokenData) => {
          const accessToken = tokenData.access_token;
          const expiresIn = tokenData.expires_in;
  
          console.log('Access Token:', accessToken);
          console.log('Expires In (seconds):', expiresIn);
          const userInfoEndpoint = 'https://api.linkedin.com/v2/me';
          fetch(userInfoEndpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(userInfo => {
            console.log(userInfo);
            this.setState({userInfo: userInfo})
          })
          .catch(error => {
            console.error('Error fetching user information:', error);
          });

        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);

    console.log("Login Success", this.state.userInfo);
    localStorage.setItem('user', JSON.stringify(this.state.userInfo));
    const { name, email } = this.state.userInfo;

    if(this.state.jobId) {
      this.setState({scrollPosition: localStorage.getItem('scrollPosition')});
    }

    localStorage.clear();
    let userData = {
        email: email,
        loginType: "linkedin",
    }
    console.log(this.state)

    api.post('user/login/', userData)
        .then((res) => {
            console.log("login res: ", res.data);
            if (res.status === 200) {
                localStorage.setItem('accessToken', res.data.access);
                localStorage.setItem('refreshToken', res.data.refresh);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('isStartup', res.data.startup);
                localStorage.setItem('logStatus', true);
                this.setState({loading: true});
                if(this.state.jobId) {
                    this.setState({redirect: 'jobs'});
                    localStorage.setItem('scrollPosition', this.state.scrollPosition)
                }else {
                    this.setState({redirect: 'home'});
                }
            }
        })
        .catch((err) => {
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
                  // this.success();
                  this.setState({redirect: 'home'})
              } else if (res.status === 409) {
                  alert("User with this E-Mail already exists!");
                  this.setState({loading: false})
              }
          })
          .catch((err) => {
              alert("Something went wrong!");
              this.setState({loading: false})
          })
        })
  }
  responseLinkedinError = (error) => {
    console.log("Login failed", error);
  };

  render(){
    if (this.state.redirect === 'home') {
      return <Redirect to='/profile'/>
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
      <LinkedIn
        // response_type='code'
        clientId="86s6s90egxn2u3"
        redirectUri={`${window.location.origin}/linkedin`}
        // redirectUri={`${window.location.origin}`}
        scope="profile+email+w_member_social" 
        onSuccess={this.responseLindedin}
        onError={this.responseLinkedinError}
      >
        {({ linkedInLogin }) => (
          <img
            onClick={linkedInLogin}
            src={linkedin}
            alt="Sign in with Linked In"
            style={{ maxWidth: '180px', cursor: 'pointer' }}
          />
        )}
      </LinkedIn>
    );
  }

}

// function LinkedInPage() {
//   const { linkedInLogin } = useLinkedIn({
//     clientId: "86s6s90egxn2u3",
//     redirectUri: `${window.location.origin}/linkedin`,
//     onSuccess: (code) => {
//       console.log(code);
//       setCode(code);
//       setErrorMessage("");
//     },
//     scope: "profile email w_member_social",
//     onError: (error) => {
//       console.log(error);
//       setCode("");
//       setErrorMessage(error.errorMessage);
//     },
//   });
//   const [code, setCode] = React.useState("");
//   const [errorMessage, setErrorMessage] = React.useState("");

//   return (
//     <Wrapper>
//       <img
//         onClick={linkedInLogin}
//         src={linkedin}
//         alt="Log in with Linked In"
//         style={{ maxWidth: "180px", cursor: "pointer" }}
//       />

//       {!code && <div>No code</div>}
//       {window.location.origin}
//       {code && (
//         <div>
//           <div>Authorization Code: {code}</div>
//           <div>
//             Follow{" "}
//             <Link
//               target="_blank"
//               href="https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS#step-3-exchange-authorization-code-for-an-access-token"
//               rel="noreferrer"
//             >
//               this
//             </Link>{" "}
//             to continue
//           </div>
//         </div>
//       )}
//       {errorMessage && <div>{errorMessage}</div>}
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Link = styled.a`
//   font-size: 20px;
//   font-weight: bold;
// `;


export default LinkedInPage;

// import React from "react";
// import styled from "styled-components";
// import { useLinkedIn } from "react-linkedin-login-oauth2";
// import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";

// function LinkedInPage() {
//   const { linkedInLogin } = useLinkedIn({
//     clientId: "86s6s90egxn2u3",
//     redirectUri: `${window.location.origin}/login/linkedin`,
//     onSuccess: (code) => {
//       console.log(code);
//       setCode(code);
//       setErrorMessage("");
//     },
//     scope: "email profile",
//     onError: (error) => {
//       console.log(error);
//       setCode("");
//       setErrorMessage(error.errorMessage);
//     },
//   });
//   const [code, setCode] = React.useState("");
//   const [errorMessage, setErrorMessage] = React.useState("");

//   return (
//     <Wrapper>
//       <img
//         onClick={linkedInLogin}
//         src={linkedin}
//         alt="Log in with Linked In"
//         style={{ maxWidth: "180px", cursor: "pointer" }}
//       />

//       {!code && <div>No code</div>}
//       {code && (
//         <div>
//           <div>Authorization Code: {code}</div>
//           <div>
//             Follow{" "}
//             <Link
//               target="_blank"
//               href="https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS#step-3-exchange-authorization-code-for-an-access-token"
//               rel="noreferrer"
//             >
//               this
//             </Link>{" "}
//             to continue
//           </div>
//         </div>
//       )}
//       {errorMessage && <div>{errorMessage}</div>}
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Link = styled.a`
//   font-size: 20px;
//   font-weight: bold;
// `;

// export default LinkedInPage;
