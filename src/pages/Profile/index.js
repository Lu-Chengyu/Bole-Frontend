import React, {useState} from 'react';
import Footer from '../../components/Footer'
import {
    MenuUnfoldOutlined, MenuFoldOutlined,
} from '@ant-design/icons';
import {Avatar, Button, Card, Layout, Menu, theme} from 'antd';
import ProfileConditionalRender from "./ProfileConditionalRender/ProfileConditionalRender";
import Navbar from "../../components/Navbar";
import SideboxConditionalRender from "./ProfileList/SideBox/SideboxConditionalRender";

const {Sider} = Layout;


const Profile = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Layout><Navbar/></Layout>
            <Layout>
                <Sider
                    style={{
                    backgroundColor: 'transparent', width: collapsed ? 80 : 300, transition: 'width 0.2s',}}
                        // trigger={null} collapsible collapsed={collapsed}
                >
                    <SideboxConditionalRender/>

                    {/*<Button*/}
                    {/*    type="text"*/}
                    {/*    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}*/}
                    {/*    onClick={() => setCollapsed(!collapsed)}*/}
                    {/*    style={{*/}
                    {/*        fontSize: '16px',*/}
                    {/*        width: 64,*/}
                    {/*        height: 64,*/}
                    {/*    }}*/}
                    {/*/>*/}
                </Sider>
                <Layout>
                    <ProfileConditionalRender/>
                </Layout>
            </Layout>
            <Layout><Footer/></Layout>
        </Layout>
    );
};

export default Profile;
