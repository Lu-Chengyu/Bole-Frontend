import React from "react";
import {Link, Redirect} from "react-router-dom";
import "../styles.css";
import Logo from '../../../assets/favicon-eye.png'
import SearchBar from "../../SearchBar/SearchBar";
import {Header} from "antd/es/layout/layout";
import {If} from "../../If";
import {Avatar, Badge, Dropdown, Menu} from "antd";

function NavbarHome() {

    return (
            <Header
                style={{background: "white", display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo"/>
                    </Link>
                    <div>
                        <SearchBar/>
                    </div>
                </div>

                <div/>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">
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
                        <button className="buttonSignIn">
                            <Link to="/login">
                                Log In
                            </Link>
                        </button>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <button className="buttonSignUp">
                            <Link to="/register">
                                Sign Up
                            </Link>
                        </button>
                    </Menu.Item>
                </Menu>
            </Header>

    );
}

export default NavbarHome;