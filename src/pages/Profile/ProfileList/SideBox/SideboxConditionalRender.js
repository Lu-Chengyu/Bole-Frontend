import React, {Component} from "react";
import SideboxStartup from "./ProfileSidebox/SideboxStartup";
import SideboxJobSeeker from "./ProfileSidebox/SideboxJobSeeker";
import {
    DesktopOutlined,
    LogoutOutlined,
    PieChartOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined
} from "@ant-design/icons";

class SideboxConditionalRender extends Component {
    state = {
        userId: null,
        isLoggedIn: false,
        isStartup: false,
    };

    componentDidMount() {
        let logStatus = localStorage.getItem("logStatus");
        let setStartup = localStorage.getItem("isStartup");
        let user_Id = localStorage.getItem("userId")
        if (logStatus !== null) {
            this.setState({isLoggedIn: logStatus});
        }
        if (setStartup !== null) {
            this.setState({isStartup: setStartup});
        }
        if(user_Id !== null){
            this.setState({userId: user_Id});
        }
    }

    render() {
        let proData = null;
        if (this.state.isLoggedIn === "true") {
            if (this.state.isStartup === "true") {
                proData = <SideboxStartup/>;
            }else{
                proData = <SideboxJobSeeker/>;
            }
        }
        return (
            <>
                {proData}
            </>
        );
    }
}
export default SideboxConditionalRender;