import React, {useState} from 'react';
import {Avatar, Layout, List, Skeleton, Switch} from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';

const IconText = ({ icon, text }) => (
    React.createElement(
        React.Fragment,
        null,
        React.createElement(icon, { style: { marginRight: 8 } }),
        text
    )
);

const listData = [
    {
        id: 1,
        href: 'https://ant.design',
        title: `ant design part`,
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
        title: `hello`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子',
        starText: '156',
        likeText: '12',
        messageText: '1'
    },
    {
        id: 3,
        href: 'https://ant.design',
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
        title: `ant design part`,
        avatar: 'https://i.pravatar.cc/150?img=1',
        description: '前端工程师',
        content: '这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子这是一条LinkedIn帖子',
        starText: '156',
        likeText: '156',
        messageText: '20'
    },
    {
        id: 12,
        href: 'https://ant.design',
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
        href: 'https://ant.design',
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
        href: 'https://ant.design',
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
        href: 'https://ant.design',
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
        href: 'https://ant.design',
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
        href: 'https://ant.design',
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
const paginationHeight = 32; // Height of the Pagination component in pixels

function ResourcePost() {
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentListData = listData.slice(startIndex, endIndex);

    const halfLength = Math.ceil(currentListData.length / 2);
    const leftListData = currentListData.slice(0, halfLength);
    const rightListData = currentListData.slice(halfLength);

    const totalHeight = itemsPerPage * (60 + 10) + paginationHeight;


    return (
        <Layout>
        <div style={{width: '80%', height: totalHeight, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: 1 }}>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
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
                style={{ marginTop: '16px', textAlign: 'center' }}
            />
        </div>
        </Layout>
    );
}

export default ResourcePost;
