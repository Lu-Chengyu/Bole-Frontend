import React, {useState, useEffect, useRef} from 'react';
import "./styles.css";
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';
import {Link} from "react-router-dom";

function RegisterSuccess() {
    const [showPopup, setShowPopup] = useState(false);
    const closeModal = () => {
        setShowPopup(false)
    }

    useEffect(() => {
        let timeoutId;
        if (showPopup) {
            timeoutId = setTimeout(() => {
                return <Redirect to='/login'/>;
            }, 1000 * 5);  // automatically direct to login page after 5 seconds
            return () => clearTimeout(timeoutId);
        }

    }, []);

    return (
        <div>
            <Modal isOpen={showPopup} className="modal" overlayClassName="Overlay">
                {/*<span className="close" onClick={closeModal}>&times;</span>*/}
                <div className="modal_context">
                    <span>Congratulations!</span>
                    <br/>
                    <span>You have registered successfully!</span>
                    <br/>
                    <div className="buttons">
                        <Link to="/create-account">
                            <button className="signUp" type="primary">
                                <span style={{color: 'white'}}>Sign Up</span>
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="signIn">
                                <span style={{color: 'white'}}>Sign In</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default RegisterSuccess;