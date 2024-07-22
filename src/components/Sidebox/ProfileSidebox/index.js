import React from "react";
import "./styles.css"
import avatarImg from "../../../assets/defaultProfilePic.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const ProfileSidebox = ({name, tagline, location, about, connections}) => {
    return (
        <div className="profile-side-box">
            <div className="profilePic-container">
                <img className="profile-picture" src={avatarImg} alt="Profile Picture"/>
            </div>
            <div className="profile-header">
                <div className="profile-info">
                    <div className="profile-name">{name}</div>
                    <div className="profile-title">{tagline}</div>
                    <div className="profile-location">{location}</div>
                </div>
            </div>
            <div className="profile-about">
                {/*<h3>About</h3>*/}
                <div>{about}</div>
            </div>
            <br/>
            <div className="profile-content">
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
                    <FontAwesomeIcon icon={faRightToBracket}/>
                    <span className="text">Sign out</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebox;
