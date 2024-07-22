import React from "react";
import "./styles.css"
import avatarImg from "../../../assets/defaultProfilePic.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket, faBookmark, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const NavSidebox = () => {
    return (
        <div className="nav-side-box">
            <div className="nav-content">
                <div className="content-item">
                    <FontAwesomeIcon icon={faBookmark}/>
                    <Link to="myApplications" className="text-myApplication">My applications</Link>
                </div>
                <br/><br/>
                <div className="content-item">
                    <FontAwesomeIcon icon={faStar}/>
                    <Link to="savedJobs"  className="text">Saved jobs</Link>
                </div>
                <br/><br/>
                <div className="content-item">
                    <FontAwesomeIcon icon={faStar}/>
                    <Link to="savedResources" className="text">Saved resources</Link>
                </div>
                <br/><br/>
                <div className="content-item">
                    <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                    {/*onClick*/}
                    <span className="text-resume">Resume update</span>
                </div>
                <br/><br/>
                <div className="content-item">
                    <FontAwesomeIcon icon={faRightToBracket}/>
                    {/*onClick*/}
                    <span className="text-signout">Sign out</span>
                </div>
            </div>
        </div>
    );
};

export default NavSidebox;
