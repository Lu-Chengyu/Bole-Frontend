import React, {useState} from 'react';
import './styles.css';


const partners_data = [
    {
        id: 1,
        content: '这是一条LinkedIn帖子',
        image: 'https://picsum.photos/id/100/800/400',
        author: {
            name: '小明',
            jobTitle: 'software engineer',
            statue: 'F-1 OPT',
            location: 'New york',
            college: 'NanXiang University',
            salary: '10k',
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
            jobTitle: 'software engineer',
            statue: 'F-1 OPT',
            location: 'New york',
            college: 'NanXiang University',
            salary: '10k',
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
            jobTitle: 'software engineer',
            statue: 'F-1 OPT',
            location: 'New york',
            college: 'NanXiang University',
            salary: '10k',
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
            jobTitle: 'software engineer',
            statue: 'F-1 OPT',
            location: 'New york',
            college: 'NanXiang University',
            salary: '10k',
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
            jobTitle: 'back-end software engineer',
            statue: 'F-1 OPT',
            location: 'New york',
            college: 'NanXiang University',
            salary: '10k',
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
            jobTitle: 'back-end software engineer',
            statue: 'F-1 OPT',
            location: 'New york',
            college: 'NanXiang University',
            salary: '10k',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        likes: 20,
        comments: ['非常有启发性', '点赞', '支持一下'],
    },
];

const softwareEngineers = partners_data.filter((item) => item.author.jobTitle === 'software engineer');

function Candidate(props) {
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
                </div>
                <button>Save</button>
                <button>Chat</button>
            </div>
            <div className="post-content">
                <h4>Role: <nobr>{props.author.jobTitle}</nobr></h4>
                <h4>Status: <nobr>{props.author.statue}</nobr></h4>
                <h4>Location: <nobr>{props.author.location}</nobr></h4>
                <h4>School: <nobr>{props.author.college}</nobr></h4>
                <h4>Expected salary: <nobr>{props.author.salary}</nobr></h4>

            </div>
        </div>
    );
}


function TalentsMidbox(props) {
    const [partners, setPartners] = useState(softwareEngineers);
    return (
        <div>
            <div className="post-list">
                {partners.map((partner) => (
                    <Candidate key={partner.id} {...partner} />
                ))}
            </div>
        </div>
    );
}

export default TalentsMidbox;