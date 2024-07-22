import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import './styles.css';
import {Link} from "react-router-dom";
import Modal from 'react-modal';

function PartnerPostMidbox() {
    const [showPopup, setShowPopup] = useState(false);
    const handleOpenModal = () => {
        setShowPopup(true);
    }
    const handleCloseModal = () => {
        setShowPopup(false);
    }

    const [state, setState] = React.useState({ category: "" });
    const formValue = (event) => {
        setState({ ...state, [event.target.name]: event.target.value.trim() });
      };
    const category = React.useRef(null);

      
    return (
        <div>
            <div className="PostCard">
                <div className='PostHead'>
                    <form className='Post_barbox'>
                        <div className="Box-icon">
                            <FontAwesomeIcon icon={faPen}/>
                        </div>
                        <input
                            className='post_inputbar'
                            type='text'
                            placeholder='Start a post'
                            onClick={handleOpenModal}
                        />
                    </form>
                </div>
                {/*<div className='PostRoot'>*/}
                {/*    <div className="Post-icon">*/}
                {/*        <FontAwesomeIcon icon={faSquarePlus}/>*/}
                {/*    </div>*/}
                {/*    <button>Post</button>*/}
                {/*</div>*/}
            </div>
            <Modal isOpen={showPopup} className="modal" overlayClassName="Overlay">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <div className="postBoxHead">
                    <span>Create a Post</span>
                </div>
                <hr className="line"></hr>
                <div className="postBoxUser">
                    <img src="https://picsum.photos/id/200/800/400"  className="post-image"></img>
                    <div className="post-name">
                        <p>user</p>
                        <select
                            ref={category}
                            onChange={formValue}
                            name="category"
                            value={state.category}
                            className="post-authority"
                        >
                            <option>Anyone</option>
                             <option value="First Choice">Friends</option>
                        </select>
                    </div>
                </div>
                <div>
                <textarea 
                        className="post-inputBox"
                        placeholder="Post something"
                />
                </div>
                <div className="postBoxRoot">
                    <button><FontAwesomeIcon icon={faImage} /></button>
                    <button><FontAwesomeIcon icon={faLocationDot} /></button>
                    <botton className="postBoxRoot-botton">Post</botton>
                </div>
            </Modal>
            
        </div>

);
}

export default PartnerPostMidbox;

