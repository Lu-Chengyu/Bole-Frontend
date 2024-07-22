import React, {Component} from "react";
import NavbarHome from "../NavbarList/NavbarHome";
import NavbarStartup from "../NavbarList/NavbarStartup";
import NavbarJobSeeker from "../NavbarList/NavbarJobSeeker";

class NavbarConditionalRender extends Component {
    state = {
        isLoggedIn: null,
        isStartup: null,
    };

    componentDidMount() {
        let logStatus = localStorage.getItem("logStatus");
        let setStartup = localStorage.getItem("isStartup");
        // console.log("logStatus: ", logStatus);
        // console.log("setStartup: ", setStartup);

        // if(logStatus === "true"){
        //     console.log("logStatus: string");
        // }
        // if(logStatus === true){
        //     console.log("logStatus: bool");
        // }
        //
        // if(setStartup === "false"){
        //     console.log("setStartup: string");
        // }
        // if(setStartup === false){
        //     console.log("setStartup: bool");
        // }
        if (logStatus !== null) {
            this.setState({isLoggedIn: logStatus});
        }
        if (setStartup !== null) {
            this.setState({isStartup: setStartup});
        }
    }

    render() {
        let navData = <NavbarHome/>;
        if (this.state.isLoggedIn === "true") {
            if (this.state.isStartup === "true") {
                navData = <NavbarStartup/>;
            }else{
                navData = <NavbarJobSeeker/>;
            }
        }

        return (
            <>
                {navData}
            </>
        );
    }
}
export default NavbarConditionalRender;