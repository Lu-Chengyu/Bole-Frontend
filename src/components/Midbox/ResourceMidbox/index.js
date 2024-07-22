import React, {useState} from 'react';
import './styles.css';
import Navbar from "../../Navbar";
import {faHeart as farHeart, faStar, faComment as farComment} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from "@fortawesome/free-solid-svg-icons";

const partners_data = [
    {
        id: 1,
        content: '这是一条LinkedIn帖子',
        image: 'https://picsum.photos/id/100/800/400',
        author: {
            name: '小明',
            jobTitle: '前端工程师',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        likes: 10,
        comments: ['很好的帖子', '赞同你的观点'],
    },
    {
        id: 2,
        content: '这是另一条LinkedIn帖子',
        image: 'https://picsum.photos/id/200/800/400',
        author: {
            name: '小红',
            jobTitle: '后端工程师',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        likes: 20,
        comments: ['非常有启发性', '点赞', '支持一下'],
    },
    {
        id: 3,
        content: '这是另一条LinkedIn帖子',
        image: 'https://picsum.photos/id/200/800/400',
        author: {
            name: '小红',
            jobTitle: '后端工程师',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        likes: 20,
        comments: ['非常有启发性', '点赞', '支持一下'],
    },
    {
        id: 4,
        content: '这是另一条LinkedIn帖子',
        image: 'https://picsum.photos/id/200/800/400',
        author: {
            name: '小红',
            jobTitle: '后端工程师',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        likes: 20,
        comments: ['非常有启发性', '点赞', '支持一下'],
    },
        {
        id: 5,
        content: '这是一条LinkedIn帖子',
        image: 'https://picsum.photos/id/100/800/400',
        author: {
            name: '小明',
            jobTitle: '前端工程师',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        likes: 10,
        comments: ['很好的帖子', '赞同你的观点'],
    },
    {
        id: 6,
        content: '这是另一条LinkedIn帖子',
        image: 'https://picsum.photos/id/200/800/400',
        author: {
            name: '小红',
            jobTitle: '后端工程师',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        likes: 20,
        comments: ['非常有启发性', '点赞', '支持一下'],
    },
];


function Post(props) {
    const [term, setTerm] = useState("");
    const [submit, setSubmit] = useState(false);

    const onInputChange = (event) => {
        setTerm(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
        // alert(term);
        // props.search(term);
    };
    return (
        <div className="post">
            <div className="post-header">
                <img src={props.author.avatar} alt={props.author.name} className="post-avatar"/>
                <div className="post-info">
                    <h2>{props.author.name}</h2>
                    <p>{props.author.jobTitle}</p>
                </div>
                <div className="btn-container">
                    <button className="btn-follow">Follow</button>
                    <button className="btn-chat">Chat</button>
                </div>
            </div>
            <div className="post-content">
                <p>{props.content}</p>
                <img src={props.image} alt=""/>
            </div>
            <div className="downContainer">
                <div className="post-actions">
                    {/*Like */}
                    <button><FontAwesomeIcon icon={farHeart}/> {props.likes}</button>
                    {/*Save*/}
                    <button><FontAwesomeIcon icon={faStar}/> {props.comments.length}</button>
                    {/*Comments*/}
                    <button><FontAwesomeIcon icon={farComment}/></button>
                </div>
                <form className='comment_barbox' onSubmit={onFormSubmit}>
                    <div className="search-icon">
                        <FontAwesomeIcon icon={faPen}/>
                    </div>
                    <input
                        className='comment_inputbar'
                        type='text'
                        value={term}
                        onChange={onInputChange}
                        placeholder='Add a comment...'
                    />
                </form>
            </div>
        </div>
    );
}

function ResourceMidbox(props) {
    const [partners, setPartners] = useState(partners_data);
    return (
        <div>
            <div className="post-list">
                {partners.map((partner) => (
                    <Post key={partner.id} {...partner} />
                ))}
            </div>
        </div>
    );
}

export default ResourceMidbox;