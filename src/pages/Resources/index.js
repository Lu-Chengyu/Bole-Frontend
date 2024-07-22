import React, {useState} from "react";
import './styles.css';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ResourceMidbox from "../../components/Midbox/ResourceMidbox";
import ResourcePost from "./ResourcePost";
import {Avatar, Layout, List, Pagination, Skeleton} from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import SideboxConditionalRender from "../Profile/ProfileList/SideBox/SideboxConditionalRender";
import ProfileConditionalRender from "../Profile/ProfileConditionalRender/ProfileConditionalRender";
import Sider from "antd/es/layout/Sider";

const IconText = ({icon, text}) => (
    React.createElement(
        React.Fragment,
        null,
        React.createElement(icon, {style: {marginRight: 8}}),
        text
    )
);

const listData = [
    {
        id: 1,
        href: 'https://ant.design',
        title: `ant design part1`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子',
        starText: '156',
        likeText: '156',
        messageText: '20'
    },
    {
        id: 2,
        href: 'https://ant.design',
        title: `hello2`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '156',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 3,
        href: 'https://ant.design3',
        title: `test`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '66',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 11,
        href: 'https://ant.design',
        title: `ant design part4`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子',
        starText: '156',
        likeText: '156',
        messageText: '20'
    },
    {
        id: 12,
        href: 'https://ant.design5',
        title: `hello`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '156',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 13,
        href: 'https://ant.design6',
        title: `test`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '66',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 12,
        href: 'https://ant.design7',
        title: `hello`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '156',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 13,
        href: 'https://ant.design8',
        title: `test`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '66',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 12,
        href: 'https://ant.design9',
        title: `hello`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '156',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 13,
        href: 'https://ant.design10',
        title: `test`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '66',
        likeText: '12',
        messageText: '1'
    },
];

const itemsPerPage = 6; // Number of items per page
// const paginationHeight = 32; // Height of the Pagination component in pixels

const Resources = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = listData.slice(startIndex, endIndex);


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Layout><Navbar/></Layout>
            <Layout>
                <Sider
                    style={{backgroundColor: 'transparent'}}
                >
                    <SideboxConditionalRender/>
                </Sider>
                <Layout>
                    <div style={{ width: '100%', height: '78vh', overflow: 'auto' }}>
                        <List
                            style={{ width: '80%', marginLeft: '10%' }}
                            itemLayout="vertical"
                            size="large"
                            dataSource={displayedData}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <IconText icon={StarOutlined} text={item.starText} key="list-vertical-star-o" />,
                                        <IconText icon={LikeOutlined} text={item.likeText} key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text={item.messageText} key="list-vertical-message" />,
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                >
                                    <Skeleton loading={false} active avatar>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={<a href={item.href}>{item.title}</a>}
                                            description={item.description}
                                        />
                                        {item.content}
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </div>

                    <Pagination
                        defaultCurrent={1}
                        total={listData.length}
                        pageSize={itemsPerPage}
                        current={currentPage}
                        onChange={onPageChange}
                        style={{marginTop: '16px', textAlign: 'center'}}
                    />
                </Layout>
            </Layout>
            <Layout><Footer/></Layout>
        </Layout>
    );

}

export default Resources;
