import React, {useState} from "react";
import "./styles.css"
import {Redirect} from "react-router-dom";
import ProfileFormModal from "./ProfileFormModal";
import {If} from "../../../../../components/If";
import {
    DesktopOutlined,
    LogoutOutlined,
    PieChartOutlined,
    TeamOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {Avatar, Card, Menu} from 'antd';

const {Meta} = Card;

const cardData = {
    avatar: <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" size="large"/>,
    title: "User Name",
    description: "This is my tagline",
};

const SideboxJobSeeker = () => {
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
    };
    return (
        <div>
            <If test={isSignedOut}>
                <Redirect to='/'/>
            </If>
            <div style={{width: 240}}>
                <Card style={{borderRadius: 0}}>
                    <Meta
                        avatar={cardData.avatar}
                        title={cardData.title}
                        description={cardData.description}
                        onClick={openModal}
                        style={{cursor: 'pointer'}}
                    />
                    <ProfileFormModal className="profile-modal" isOpen={showPopup} closeModal={closeModal}/>
                </Card>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        My applications
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        Saved Jobs
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined/>}>
                        Upload resume
                    </Menu.Item>
                    {/*<Menu.SubMenu key="sub1" icon={<UploadOutlined />} title="Upload resume">*/}
                    {/*    <Menu.Item key="3">Tom</Menu.Item>*/}
                    {/*    <Menu.Item key="4">Bill</Menu.Item>*/}
                    {/*    <Menu.Item key="5">Alex</Menu.Item>*/}
                    {/*</Menu.SubMenu>*/}
                    <Menu.SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="9" icon={<LogoutOutlined/>} onClick={handleSignOut}>
                        Sign out
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default SideboxJobSeeker;
