import React, { useState } from "react";
import "./styles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import api from '../../../../API/BaseURL/BaseURL'
import avatar from "../../../../assets/defaultProfilePic.png";
import {
    faImage,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
//import { usePostContext } from "../../PostContext";

const PartnerModal = ({isOpen, handleCloseModal}) => {
    const [state, setState] = React.useState({category: ""});
    const [titleValue, settitleValue] = useState('');
    const [textareaValue, settextareaValue] = useState('');
    // const { addNewPost } = usePostContext(); //貌似是这个的源头

    const handleSubmit = (event) => {
        event.preventDefault();              //prevent page refresh
        console.log(textareaValue);
        let post = {
            postUserId: localStorage.getItem("userId"),
            fullName: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"),
            headline: localStorage.getItem("headline"),
            postContent: textareaValue,
            postTitle: titleValue,
            saveNumber: 0,
        }
        console.log("post:",post);
        api.post('/api/partners',post)                   //api address
           .then((res) => {
            if(res.status === 200){
                console.log("post saved!");
                //addNewPost(post);

            }
           }) 
           .catch((err) => {
                console.log(err.response.status);
                console.log(err.response);
           })
           handleCloseModal();
           window.location.reload();
           
        
    }

    const formValue = (event) => {
        setState({...state, [event.target.name]: event.target.value.trim()});
    };
    const category = React.useRef(null);

    return (
        <Modal isOpen={isOpen} className="modal" overlayClassName="Overlay">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <div className="postBoxHead">
                <span>Create a Post</span>
            </div>
            {/* <hr className="line"></hr> */}
            <div className="postBoxUser">
                <img src={avatar} alt="avatar" className="post-image"></img>
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
            {/* <div>
                <textarea
                    className="post-inputBox"
                    placeholder="Post something"
                />
            </div> */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="post-titleBox"
                    placeholder="Enter a title"
                    value={titleValue}
                    onChange={(event) => settitleValue(event.target.value)}
                />
                <textarea
                    className="post-inputBox"
                    placeholder="Post something"
                    value={textareaValue}
                    onChange={(event) => settextareaValue(event.target.value)}
                />
                <div className="postbox_button">
                    <button><FontAwesomeIcon icon={faImage}/></button>
                    <button><FontAwesomeIcon icon={faLocationDot}/></button>
                    <button className="postBoxRoot-botton" type="submit">Post</button>
                </div>
            </form>

            {/* <div className="postBoxRoot">
                <button><FontAwesomeIcon icon={faImage}/></button>
                <button><FontAwesomeIcon icon={faLocationDot}/></button>
                <botton className="postBoxRoot-botton">Post</botton>
            </div> */}
        </Modal>

    );
};

export default PartnerModal;
