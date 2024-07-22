import React, {useState} from "react";
import "./styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faPlus} from "@fortawesome/free-solid-svg-icons";

const JobsTopMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="job-side-box">
                <div className="job-icon-dropdown">
                    <FontAwesomeIcon className="job-dropdown-toggle" icon={faAngleDown}  onClick={toggleMenu}/>
                    {isMenuOpen && (
                    <ul className="job-dropdown-menu">
                        <li>选项一</li>
                        <li>选项二</li>
                        <li>选项三</li>
                        {/*<FontAwesomeIcon icon={faAngleUp}/>*/}
                    </ul>
                )}
                </div>
                <div className="job-icon-post">
                    <FontAwesomeIcon className="job-icon-plus" icon={faPlus} onClick={toggleMenu}/>
                    <input
                        className='job-post'
                        type='text'
                        placeholder='Start a post'
                        onClick={toggleMenu}
                    />
                </div>
            </div>
        </>
    );
};

export default JobsTopMenu;
