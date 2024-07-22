// import React from "react";
// import {Link} from "react-router-dom";
// import "./styles.css";
// import Logo from '../../assets/favicon.png'
// import NavbarHome from "../../components/NavbarHome";
//
//
// function AboutUs() {
//     return (
//         <header className="header">
//             <div className="container">
//                 <nav className="navigation">
//                     <div className="logo">
//                         <Link to="/">
//                             <img src={Logo} alt="Logo"/>
//                         </Link>
//                     </div>
//                 </nav>
//             </div>
//         </header>
//     );
// }
//
// export default AboutUs;

import React, {Component} from 'react';
import Skeleton from "react-loading-skeleton";
import "./styles.css"
import {NavLink} from "react-router-dom";
import Navbar from "../../components/Navbar";
import PostJobs from "../../components/PostJobs";
import RecommendSidebox from "../../components/Sidebox/RecommendSidebox";

class About extends Component {
    render() {
        let style = null;
        let data = (
            <>
                <Skeleton
                    circle={true}
                    style={{margin: "20px"}}
                    height={65}
                    width={65}
                />
                <Skeleton style={{marginLeft: "18px"}} width={180} height={12}/>
                <Skeleton
                    style={{marginLeft: "18px", marginBottom: "25px"}}
                    width={150}
                    height={10}
                />
                {/* <Skeleton style={{marginLeft:'18px'}} width={150} height={10}/> */}
                {/* <Skeleton style={{marginLeft:'18px'}} width={180} height={12}/> */}
                <Skeleton style={{marginLeft: "18px"}} width={150} height={10}/>
                <Skeleton style={{marginLeft: "18px"}} width={150} height={10}/>
                <Skeleton style={{marginLeft: "18px"}} width={150} height={10}/>
                <Skeleton
                    style={{marginLeft: "18px", marginBottom: "18px"}}
                    width={150}
                    height={10}
                />
                <Skeleton style={{marginLeft: "18px"}} width={150} height={12}/>{" "}
                <Skeleton
                    style={{marginLeft: "18px", marginBottom: "15px"}}
                    width={150}
                    height={10}
                />
            </>
        )

        return (
            <div className="body feedBody">
                <Navbar />
                <div className="sideBox2">
                    <div style={style} className={"profileSideBox"}>
                        {data}
                    </div>
                </div>

                <div className="postColumn">
                    <hr style={{margin: "0px", marginBottom: "12px"}}/>
                    hello world!
                </div>

                <PostJobs />

            </div>
        )
    }
}

export default About;
