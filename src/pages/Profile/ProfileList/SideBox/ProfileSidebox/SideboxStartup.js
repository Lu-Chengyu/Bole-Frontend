import React, {useState} from "react";
import "./styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket, faBookmark, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {Link, Redirect} from "react-router-dom";
import ProfileFormModal from "./ProfileFormModal";
import {If} from "../../../../../components/If";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch, Divider } from 'antd';
const { Meta } = Card;


const cardData = {
    avatar: <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" size="large" />,
    title: "User Name",
    description: "This is my tagline",
};

const SideboxStartup = () => {
    const [isSignedOut, setIsSignedOut] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const openModal = () => {
        setShowPopup(true);
    }
    const closeModal = () => {
        setShowPopup(false);
    }

    const handleSignOut = () => {
        localStorage.clear();
        setIsSignedOut(true);
        setRedirect('home');
    };
    return (
        <div className="profile-side-box">
            <Card style={{ width: 240}}>
                <Meta
                    avatar={cardData.avatar}
                    title={cardData.title}
                    description={cardData.description}
                    onClick={openModal}
                    style={{cursor: 'pointer'}}
                />
                <ProfileFormModal className="profile-modal" isOpen={showPopup} closeModal={closeModal}/>
                <div className="profile-content">
                    <div className="profile-item">
                        <FontAwesomeIcon icon={faBookmark}/>
                        <Link to="myApplications" className="text-myApplication">My applications</Link>
                    </div>
                    <br/><br/>
                    <div className="profile-item">
                        <FontAwesomeIcon icon={faStar}/>
                        <Link to="savedJobs" className="text">Saved jobs</Link>
                    </div>
                    <br/><br/>
                    <div className="profile-item">
                        <FontAwesomeIcon icon={faStar}/>
                        <Link to="savedResources" className="text">Saved resources</Link>
                    </div>
                    <br/><br/>
                    <div className="profile-item">
                        <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                        {/*onClick*/}
                        <span className="text-resume">Resume update</span>
                    </div>
                    <br/><br/>
                    <div className="profile-item">
                        <FontAwesomeIcon icon={faRightToBracket}/>
                        {/*onClick*/}
                        <span className="text-signout" onClick={handleSignOut}>Sign out</span>
                        <If test={redirect === 'home'}>
                            <Redirect to='/'/>
                        </If>
                    </div>
                </div>
            </Card>



        </div>
    );
};

export default SideboxStartup;
