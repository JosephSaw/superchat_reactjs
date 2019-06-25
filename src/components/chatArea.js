import React from 'react'
import '../App.css';
import '../homepage.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { sendMessage } from '../actions/messages';

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
        <div className="app-container" style={{ position: 'relative', overflowY:'hidden' }}>
            <div style={{ height: '95%', position: 'absolute', top:'0', width: '100%', overflowY: 'scroll'}}>
                {props.currentRoom.messages.map(message => props.currentUserID === message.from ? currentUserTextBox(message) : otherUserTextBox(message))}
            </div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', left: '0', height: "40px" }}>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    let newMessage = document.getElementById('messageField').value
                    sendMessage(props.firebase, props.db, props.dispatch, props.currentRoom.currentRoomId, newMessage, props.currentUserID);
                    document.getElementById('messageField').value = "";
                }} style={{ display: 'flex', justifyContent: 'space-between', height:'5%' }}>
                    <Form.Group style={{ flexGrow: '4' }}>
                        <Form.Control required id="messageField" type="text" placeholder="Send message..." />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ flexGrow: '1' }}>
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    )
}
