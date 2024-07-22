import React, {useEffect, useState, useRef} from 'react';
import './styles.css';
import defaultInstitute from "../../../assets/defaultProfilePic.png"
import {If} from "../../../components/If";
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import {ExclamationCircleFilled} from '@ant-design/icons';
import {Button, Modal, Space} from 'antd';
const {confirm} = Modal;

const JOBS_DATA = [
    {
        id: 1,
        companyImg: defaultInstitute,
        title: 'Front-end Developer',
        company: 'HELLO WORLD',
        location: 'San Francisco, CA',
        postedAt: '2023-04-09T10:30:00Z',
        sponsor: "No Sponsor",
        visa: 'OPT',
        type: 'Full-time',
        level: 'Entry-level',
        numOfApplicants: 14,
        description: 'We are seeking a talented Front-end Developer to join our team... Requirements: 2+ years of experience in front-end development...',
    },
    {
        id: 2,
        companyImg: defaultInstitute,
        title: 'Full-stack Developer',
        company: 'XYZ Company',
        location: 'New York, NY',
        postedAt: '2023-04-09T10:30:00Z',
        sponsor: 'Sponsor',
        visa: null,
        type: 'Full-time',
        level: 'Entry-level',
        numOfApplicants: 14,
        description: 'We are seeking a highly skilled Full-stack Developer to work on our next-generation platform... Requirements: 5+ years of experience in full-stack development...',
    },
    {
        id: 3,
        companyImg: defaultInstitute,
        title: 'accounting assistant',
        company: 'AZXC Company',
        location: 'New York, NY',
        postedAt: '2023-04-09T10:30:00Z',
        sponsor: 'Sponsor',
        visa: null,
        type: 'Full-time',
        level: 'Entry-level',
        numOfApplicants: 5,
        description: 'accounting accounting accounting accounting... Requirements: 5+ years of experience in full-stack development...',
    },
    {
        id: 4,
        companyImg: defaultInstitute,
        title: 'Full-stack Developer',
        company: 'dhasjdhk',
        location: 'New York, NY',
        postedAt: '2023-04-09T10:30:00Z',
        sponsor: 'No Sponsor',
        visa: 'H1B',
        type: 'Full-time',
        level: 'Entry-level',
        numOfApplicants: 5,
        description: 'We are seeking a highly skilled Full-stack Developer to work on our next-generation platform...Requirements: 5+ years of experience in full-stack development...',
    },
];

function Jobs(info) {
    // const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState(JOBS_DATA);
    const [redirect, setRedict] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const containerRef = useRef(null);
    const userId = localStorage.getItem("userId");

    //
    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);
    //     const filteredJobs = JOBS_DATA.filter(job => job.title.toLowerCase().includes(event.target.value.toLowerCase())
    //      || job.description.toLowerCase().includes(event.target.value.toLowerCase()));
    //     setJobs(filteredJobs);
    // };

    function ApplyButton({children, job}) {
        const storeScroll = () => {
            const scrollPosition = containerRef.current.scrollTop;
            localStorage.setItem('scrollPosition', scrollPosition.toString());
        };
        const showConfirm = () => {
            confirm({
                title: 'Already a Boler?',
                icon: <ExclamationCircleFilled/>,
                content: 'Login and apply easy at BoLe!',
                okText: 'Login',
                centered: true,
                onOk() {
                    // console.log('OK');
                    localStorage.setItem("jobId", job.id);
                    localStorage.setItem("jobTitle", job.title);
                    localStorage.setItem("jobCompany", job.company);
                    // state: {id: job.id,title: job.title, company: job.company}
                    storeScroll();
                    setRedict("login");
                },
                onCancel() {
                    // console.log('Cancel');
                },

            });
        };

        return (
            <>
                <If test={userId}>
                    <Link to={{pathname: `/jobs/apply/${job.id}`, state: {id: job.id,title: job.title, company: job.company}}}>
                        <button onClick={storeScroll}>
                            {children}
                        </button>
                    </Link>
                </If>
                <If test={!userId}>
                    <button onClick={showConfirm}>
                        {children}
                    </button>
                </If>
            </>
        )
    }

    useEffect(() => {
        const scrollToY = () => {
            const back = location.state && location.state.back;
            if (info.window || back) {
                const scrollPosition = localStorage.getItem('scrollPosition');
                if (scrollPosition) {
                    containerRef.current.scrollTo(0, scrollPosition);
                }
            }
        };
        scrollToY();
    }, []);

    useEffect(() => {
        if (!info.window){
            const handleBeforeUnload = () => {
                // Clear the location.state before the page refreshes
                // So that page returns to top when refresh
                history.replace({ ...location, state: undefined });
            };
            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [location, history]);

    if (redirect === 'login') {
        return <Redirect to='/login'/>
    }

    return (
        <div>
            {/*<div className="jobs-header">*/}
            {/*    <input type="text" placeholder="Search for jobs" value={searchTerm} onChange={handleSearch}/>*/}
            {/*</div>*/}

            <div ref={containerRef} className="jobs-container">
                <div className="jobs-list">
                    {jobs.map(job => {
                        // Calculate job posting time
                        const jobDate = new Date(job.postedAt);
                        const currentDate = new Date();
                        const hoursDiff = Math.abs(currentDate - jobDate) / 36e5;
                        const timeAgo = hoursDiff < 24 ? `${Math.round(hoursDiff)} hours ago` : `${Math.round(hoursDiff / 24)} days ago`;

                        return (
                            <div className="job-card" key={job.id}>
                                <div className="company-logo">
                                    <img src={job.companyImg} alt={job.company}/>
                                </div>
                                <div className="job-details">
                                    <h2>{job.title} </h2>
                                    <div>{job.company} · {job.location} · {timeAgo}</div>
                                    <div className="sponsor-status">{job.sponsor}
                                        <If test={job.visa}>
                                            <span> · Accept {job.visa}</span>
                                        </If>
                                    </div>
                                    <div className="types-level">{job.type} · {job.level}</div>
                                    <p>{job.description}</p>
                                    <div>
                                        <ApplyButton job={job}>
                                            Apply
                                        </ApplyButton>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Jobs;