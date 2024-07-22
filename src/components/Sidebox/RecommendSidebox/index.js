import React from "react";
import "./styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowUpFromBracket, faBookmark, faEye, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const RecommendSidebox = () => {
    return (
        <div className="rec-side-box">
            <div className="rec-content">
                <div className="rec-head">Trend domains</div>
                <div className="trend-item">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>#Web-Developers</Link>
                    <FontAwesomeIcon className="trend-icon-up" icon={faArrowUp}/>
                    <span className="trend-data">38,296 view</span>
                </div>
                <br/><br/>
                <div className="trend-item">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>#SDE</Link>
                    <FontAwesomeIcon className="trend-icon-up" icon={faArrowUp}/>
                    <span className="trend-data">38,296 view</span>
                </div>
                <br/><br/>
                <div className="trend-item">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>#Marketing</Link>
                    <FontAwesomeIcon className="trend-icon-up" icon={faArrowUp}/>
                    <span className="trend-data">38,296 view</span>
                </div>
                <br/><br/>
                <div className="trend-item">
                    <Link  to="/" style={{ textDecoration: 'none', color: 'inherit' }}>#Trader</Link>
                    <FontAwesomeIcon className="trend-icon-up" icon={faArrowUp}/>
                    <span className="trend-data">38,296 view</span>
                </div>
                <br/><br/>
                <div className="trend-item">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>#Partners</Link>
                    <FontAwesomeIcon className="trend-icon-up" icon={faArrowUp}/>
                    <span className="trend-data">38,296 view</span>
                </div>
            </div>
        </div>
    );
};

export default RecommendSidebox;
