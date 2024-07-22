import React, {Component} from "react";
import defaultUserPic from "../../assets/defaultProfilePic.png";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {connect} from "react-redux";

const Message = ({text, senderId, user, otherUserPicture, myPic}) => {
    let self = false;
    let MyId = localStorage.getItem('profileID');
    if (MyId == senderId) {
        self = true;
    }

    if (!self) {
        return (
            <div className="message other-message">
                <div>
                    <img src={otherUserPicture}/>
                </div>
                <div className="message-text">
                    <span>{user}</span>
                    <h6>{text}</h6>
                </div>
            </div>
        );
    }
    return (
        <div className="message self-message">
            <div className="message-text">
                <span>{user}</span>
                <h6>{text}</h6>
            </div>
            <div>
                <img src={myPic}/>
            </div>
        </div>
    );
};

let accessToken = localStorage.getItem("accessToken");

class MessageWindow extends Component {
    state = {
        messages: [],
        typedMsg: "",
        counter: 0,
        chatId: this.props.chatId,
    };

    client = new W3CWebSocket(`ws://localhost:8002/${localStorage.getItem('profileID')}/${this.state.chatId}/`);


    onButtonClick = (e) => {
        e.preventDefault();
        console.log("Send msg!");
        this.client.send(
            JSON.stringify({
                text: this.state.typedMsg,
            })
        );
        this.setState({typedMsg: ""});
    };

    componentDidMount() {
        console.log(this.state);
        this.client.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        this.setState({counter: 0});
        this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log("got reply! ", dataFromServer);

            console.log(this.state.counter);

            if (this.state.counter === 0) {
                let msgs = dataFromServer.messages;
                this.setState({messages: msgs.reverse(), counter: 1});
            } else {
                let newMsg = dataFromServer;
                let newMsgArray = this.state.messages;
                newMsgArray.push(newMsg);
                // this.setState({newMsgArray});
                this.setState({messages: newMsgArray})
                console.log(this.state.messages);
            }
        };
    }

    render() {
        if (this.props.user === null) {
            return <h6>Iniial screen</h6>;
        }

        let headerPic = this.props.user.user_avatar;
        if (headerPic === null) {
            headerPic = defaultUserPic;
        }

        let myPic = null;
        if (this.props.data !== null && this.props.data !== undefined) {
            myPic = this.props.data.img;
        }
        if (myPic === null) {
            myPic = defaultUserPic;
        }

        return (
            <>
                <div className="msgWindowHeader">
                    <img src={headerPic}/>
                    <h6>{this.props.user.user_name}</h6>
                </div>
                <div className="msgWindowScreen" ref={this.messageWindow}>
                    {this.state.messages.map((msg, index) => {
                        // if(index === this.state.messages.length - 1){
                        //   return null;
                        // }
                        return (
                            <Message
                                myPic={myPic}
                                userPic={headerPic}
                                text={msg.text}
                                senderId={msg.sender_id}
                                user={msg.sender}
                                otherUserPicture={headerPic}
                            />
                        );
                    })}
                </div>

                <div className="input-bar">
                    <form onSubmit={this.onButtonClick}>
                        <input
                            type="text"
                            placeholder="Send message..."
                            value={this.state.typedMsg}
                            onChange={(e) => this.setState({typedMsg: e.target.value})}
                        />
                    </form>
                    <div onClick={this.onButtonClick} className="sendMessage">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.prof.userData,
    };
};

export default connect(mapStateToProps)(MessageWindow);