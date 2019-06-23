import React from 'react'
import '../App.css';
import '../homepage.css';

function otherUserTextBox(message) {
    return (
        <div key={message.id} className="chat-other-user">
            <p>{message.message}</p>
        </div>
    )
}
function currentUserTextBox(message) {
    return (
        <div key={message.id} className="chat-current-user">
            <p>{message.message}</p>
        </div>
    );
}

export default function ChatArea(props) {
    return (
        <div className="app-container">
            <div>
                {props.messages.map(message => props.currentUserID === message.from ? currentUserTextBox(message) : otherUserTextBox(message))}
            </div>
        </div>
    )
}
