import React, {useState} from 'react';
import user1 from '../../assets/user1.jpg'
import user2 from '../../assets/user2.jpg'
import user3 from '../../assets/user3.jpg'
import './styles.css'
import {If} from "../If";

// 示例联系人列表数据
const contacts = [
    {id: 1, name: 'Alice', avatar: user1},
    {id: 2, name: 'Bob', avatar: user2},
    {id: 3, name: 'Charlie', avatar: user3},
];

// 示例聊天记录数据
const messages = [
    {text: 'Hello Alice!', sent: false},
    {text: 'Hi Bob, what\'s up?', sent: true},
    {text: 'Not much, just hanging out.', sent: false},
];

function MessageBox() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [messageList, setMessageList] = useState(messages);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = e => {
        e.preventDefault();
        if (inputValue.trim()) {
            setMessageList([
                ...messageList,
                {text: inputValue, sent: true},
            ]);
            setInputValue('');
        }
    };

    return (
        <div className="messageBody">
            <div className="sidebox">
                <h2>Contacts</h2>
                <ul>
                    {contacts.map(contact => (
                        <li
                            key={contact.id}
                            className={selectedContact === contact ? 'selected' : ''}
                            onClick={() => setSelectedContact(contact)}
                        >
                            <img src={contact.avatar} alt={contact.name}/>
                            {contact.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chatbox">
                {selectedContact ? (
                    <>
                        <div className="header">
                            {/*<img src={selectedContact.avatar} alt={selectedContact.name}/>*/}
                            <h2>{selectedContact.name}</h2>
                        </div>
                        <div className="message-list">
                            {messageList.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.sent ? 'sent' : 'received'}`}
                                >
                                    <If test={message.sent}>
                                        <img
                                            src={contacts.find(c => c.id === selectedContact.id).avatar}
                                            alt={'You'}
                                        />
                                        <div className="msg-text">{message.text}</div>
                                    </If>
                                    <div className="msg-text">{message.text}</div>
                                    <img
                                        src={selectedContact.avatar}
                                        alt={selectedContact.name}
                                    />
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Type a message"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </>
                ) : (
                    <p>Please select a contact to start chatting</p>
                )}
            </div>
        </div>
    );
}

export default MessageBox;