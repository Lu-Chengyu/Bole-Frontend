import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Discover from "./pages/Discover";
import AboutUs from "./pages/AboutUs";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Partners from "./pages/Partners";
import Jobs from "./pages/Jobs";
import Resources from "./pages/Resources";
import Talents from "./pages/Talents";
import Messages from "./pages/Messages/Messages";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/Login/ForgotPassword/index"
import JobApplyForm from "./pages/Jobs/JobApplyForm";
import LoginOTP from "./pages/Login/LoginOTP/LoginOTP"
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin  } from "@react-oauth/google";

const routes = [
    {
        path: "/",
        exact: true,
        component: LandingPage,
    },
    {
        path: "/discover",
        exact: true,
        component: Discover,
    },
    {
        path: "/partners",
        exact: true,
        component: Partners,
    },
    {
        path: "/resources",
        exact: true,
        component: Resources,
    },
    {
        path: "/jobs",
        exact: true,
        component: Jobs,
    },
    {
        path: "/talents",
        exact: true,
        component: Talents,
    },
    {
        path: "/messages",
        exact: true,
        component: Chat,
    },
    {
        path: "/profile",
        exact: true,
        component: Profile,
    },
    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/forgotPassword",
        exact: true,
        component: ForgotPassword,
    },
    // {
    //     path: "/loginOTP",
    //     exact: true,
    //     component: LoginOTP,
    // },

    // {
    //     path: "/forgotPassword/:id",
    //     exact: true,
    //     render: (props) => <ForgotPassword key={props.location.pathname} {...props} />,
    // },
    // {
    //     path: "/userSignup/:id",
    //     exact: true,
    //     render: (props) => <LoginOTP key={props.location.pathname} {...props} />,
    // },
    {
        path: "/register",
        exact: true,
        component: Register,
    },
    {
        path: "/about",
        exact: true,
        component: AboutUs,
    },
    {
        path: "/jobs/apply/:id",
        exact: true,
        render: (props) => <JobApplyForm key={props.location.pathname} {...props} />,
    },
    {
        // Catch-all must be last
        component: NotFound,
    },
];

class App extends React.Component {
    render() {
        return (
            <GoogleOAuthProvider clientId="1088785554915-f89749drvd0g6c72bh82drtft303t3vk.apps.googleusercontent.com">
                <BrowserRouter>
                    <Switch>
                        {routes.map((routeData) => {
                            const {path} = routeData;
                            return <Route key={path || "404"} {...routeData} />;
                        })}
                    </Switch>
                </BrowserRouter>
            </GoogleOAuthProvider>
        );
    }
}

export default App;
