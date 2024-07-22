import React, {useState, useEffect} from "react";
import '../styles.css'
import {Link, Redirect} from "react-router-dom";
import Logo from '../../../assets/favicon-eye.png'
import SearchBar from "../../SearchBar/SearchBar";
import avatarImg from "../../../assets/defaultProfilePic.png";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {If} from "../../If";
import api from "../../../API/BaseURL/BaseURL"
import {Menu, Dropdown, Divider, Button} from 'antd';
import {Avatar, Badge} from 'antd';
import {Header} from "antd/es/layout/layout";
import {DownOutlined, LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";

library.add(faStar);

function NavbarJobSeeker() {
    const [isSignedOut, setIsSignedOut] = useState(false);
    const tagline = "asdhdfgsdfsdfSDFadfdgdfshgsdghsdfgdgafg"

    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const handleMenuClick = (e) => {
        // 处理菜单项点击事件
        setSelectedKeys([e.key]);
    };


    const handleSignOut = () => {
        localStorage.clear();
        setIsSignedOut(true);
    };

    const [userFirstName, setUserFirstName] = useState()
    // const getApi = () => {
    //     api.get('user/create/profile/Id/')
    //     .then(function (Response){
    //         setUserFirstName(Response);
    //     })
    //     .catch(function (error){
    //         console.log(error);
    //     })
    // }


    let UserProfile = {
        id: 1
    }
    useEffect(() => {
        api.post('user/create/profile/Id/', UserProfile)
            .then((Res) => {
                console.log(1);
                console.log(Res.data);
                setUserFirstName(Res.data.firstName);
                // if(Response.status === 302){
                //     setUserFirstName(Response.data);
                // }
            })
            .catch((err) => {
                console.log(2);
                console.log(err);
            })
    })

    const menu = (
        <Menu style={{width: '266px', height: 'auto', marginTop: '20px'}}>
            <Menu.Item>
                <div className="navUserProfHead">
                    <Link to="/profile">
                        <Avatar shape="square" icon="B"
                                style={{color: '#fff', backgroundColor: 'rgb(120, 80, 420)'}}/>
                        {/*<img className="navDropdownProfImg" src={avatarImg}/>*/}
                    </Link>
                    <div className="navContent">
                        <Link to="/profile">
                            <div className="name">{userFirstName}</div>
                        </Link>
                        <div className="tagline" style={{
                            width: "166px",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word"
                        }}>{tagline}</div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item>
                <Divider style={{borderColor: '#5e5e5e'}}>
                    <span className="btnPremium">Premium</span>
                </Divider>
            </Menu.Item>
            <Menu.Item>
                <Link className="dropAccountOptions" to="/favorite">
                    <FontAwesomeIcon icon={faStar}/>
                    <span className="text">List</span>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <div className="dropAccountOptions" onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faRightToBracket}/>
                    <span className="text">Sign out</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            style={{background: "white", display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <If test={isSignedOut}>
                <Redirect to='/'/>
            </If>

            <div className="logo">
                <Link to="/profile">
                    <img src={Logo} alt="Logo"/>
                </Link>
                <div>
                    <SearchBar/>
                </div>
            </div>

            <div/>

            <Menu theme="light" mode="horizontal" selectedKeys={selectedKeys} onClick={handleMenuClick}>
                <Menu.Item key="1">
                    <Link to="/profile">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/partners">
                        Partners
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/jobs">
                        Jobs
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/resources">
                        Resources
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/messages">
                        Messages
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Link to="/profile">
                            {/*<img className="navDropdown" src={avatarImg}/>*/}
                            <span>
                                        <Badge dot>
                                            {/*TODO: 将icon的“B”替换为{UserFirstName}的大写首字母*/}
                                            <Avatar shape="square" icon="B"
                                                    style={{color: '#fff', backgroundColor: 'rgb(120, 80, 420)'}}/>
                                        </Badge>
                                    </span>
                        </Link>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default NavbarJobSeeker;