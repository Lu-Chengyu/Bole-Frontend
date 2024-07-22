import React, {useState, useEffect } from "react";
import "./styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import avatar from "../../../assets/defaultProfilePic.png"
import {
    faAngleDown,
    faArrowUpFromBracket, faBookmark,
    faImage,
    faLocationDot,
    faPlus,
    faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import {Dropdown, Menu} from "antd";
import {Link} from "react-router-dom";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import PartnerModal from "./PartnerModal";
import { usePartnerContext } from "../PartnerContext";

const PartnerTopMenu = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { showSavedPosts, setShowSavedPosts, currentPage, setCurrentPage } = usePartnerContext();
    // const [currentPage, setCurrentPage] = usePartnerContext();
    const [partnerPostStatus, setPartnerPostStatus] = useState(
        localStorage.getItem("partnerPostStatus") === "true"
      );

    const handleOpenModal = () => {
        setShowPopup(true);
    }
    const handleCloseModal = () => {
        setShowPopup(false);
    }

    const handleShowSavedPosts = () => {
        setShowSavedPosts(true);
        //console.log('handleShowSavedPosts',showSavedPosts);
        localStorage.setItem('partnerPostStatus', true);
        setPartnerPostStatus(true);
        setCurrentPage(0);
    };

    const handleShowAllPosts = () => {
        setShowSavedPosts(false);
        //console.log('handleShowAllPosts',showSavedPosts);
        localStorage.setItem('partnerPostStatus', false);
        setPartnerPostStatus(false);
        setCurrentPage(0);
    };

    const [state, setState] = React.useState({category: ""});
    const formValue = (event) => {
        setState({...state, [event.target.name]: event.target.value.trim()});
    };
    const category = React.useRef(null);

    const [isSignedOut, setIsSignedOut] = useState(false);
    const handleSignOut = () => {
        localStorage.clear();
        setIsSignedOut(true);
    };

    useEffect(() => {
        const storedStatus = localStorage.getItem("partnerPostStatus");
        if (storedStatus === "true") {
          setPartnerPostStatus(true);
        } else {
          setPartnerPostStatus(false);
        }

        return () => {
            setPartnerPostStatus(false);
          };
      }, []);

      

    const menu = (
        <Menu style={{width: '240px', height: 'auto', marginTop: '10px'}}>
            {/* <Menu.Item>
                <FontAwesomeIcon icon={faBookmark}/>
                <Link to="myApplications" className="text-myApplication">My applications</Link>
            </Menu.Item> */}
            <Menu.Item className={!partnerPostStatus ? "ant-menu-item-selected" : ""} onClick={handleShowAllPosts}>
                <FontAwesomeIcon icon={faStar}/>
                <span className="text" >All posts</span>
            </Menu.Item>
            <Menu.Item className={partnerPostStatus ? "ant-menu-item-selected" : ""} onClick={handleShowSavedPosts}>
                <FontAwesomeIcon icon={faStar}/>
                <span className="text" >Saved posts</span>
            </Menu.Item>
            {/* <Menu.Item>
                <FontAwesomeIcon icon={faStar}/>
                <Link to="savedResources" className="text">Saved resources</Link>
            </Menu.Item> */}
            {/* <Menu.Item>
                <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                <span className="text-resume">Resume update</span>
            </Menu.Item> */}
            {/* <Menu.Item>
                <FontAwesomeIcon icon={faRightToBracket}/>
                <span className="text" onClick={handleSignOut}>Sign out</span>
            </Menu.Item> */}
        </Menu>
    );

    return (
        <>
            <div className="par-side-box">
                {/* <Dropdown overlay={menu} placement="bottomRight">
                    <FontAwesomeIcon className="par-dropdown-toggle" icon={faAngleDown}/>
                </Dropdown> */}
                <div>{menu}</div>
                <div className="par-icon-post">
                    <FontAwesomeIcon className="par-icon-plus" icon={faPlus} onClick={handleOpenModal}/>
                    <input
                        className='par-post'
                        type='text'
                        placeholder='Start a post'
                        onClick={handleOpenModal}
                    />
                </div>
                <PartnerModal isOpen={showPopup} handleCloseModal={handleCloseModal} />
            </div>
            {/*<Modal isOpen={showPopup} className="modal" overlayClassName="Overlay">*/}
            {/*    <span className="close" onClick={handleCloseModal}>&times;</span>*/}
            {/*    <div className="postBoxHead">*/}
            {/*        <span>Create a Post</span>*/}
            {/*    </div>*/}
            {/*    <hr className="line"></hr>*/}
            {/*    <div className="postBoxUser">*/}
            {/*        <img src={avatar} alt="avatar" className="post-image"></img>*/}
            {/*        <div className="post-name">*/}
            {/*            <p>user</p>*/}
            {/*            <select*/}
            {/*                ref={category}*/}
            {/*                onChange={formValue}*/}
            {/*                name="category"*/}
            {/*                value={state.category}*/}
            {/*                className="post-authority"*/}
            {/*            >*/}
            {/*                <option>Anyone</option>*/}
            {/*                <option value="First Choice">Friends</option>*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*    <textarea*/}
            {/*        className="post-inputBox"*/}
            {/*        placeholder="Post something"*/}
            {/*    />*/}
            {/*    </div>*/}
            {/*    <div className="postBoxRoot">*/}
            {/*        <button><FontAwesomeIcon icon={faImage}/></button>*/}
            {/*        <button><FontAwesomeIcon icon={faLocationDot}/></button>*/}
            {/*        <botton className="postBoxRoot-botton">Post</botton>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </>
    );
};

export default PartnerTopMenu;
