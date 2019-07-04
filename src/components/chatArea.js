import React, { useState } from 'react'
import '../App.css';
import '../homepage.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function otherUserTextBox(message) {
    return (
        <div className="chat-other-user">
            <div key={message.id} className="chat-box chat-other-user-box">
                <p>{message.message}</p>
            </div>
        </div>
    )
}

function currentUserTextBox(message) {
    return (
        <div className="chat-current-user">
            <div key={message.id} className="chat-box chat-current-user-box">
                <p>{message.message}</p>
            </div>
        </div>
    );
}

const sendMsg = (e, props, setDisabled) => {
    e.preventDefault();
    setDisabled(true);
    let sendMessage = props.functions.httpsCallable('sendMessage');

    let newMessage = document.getElementById('messageField').value
    sendMessage({ message: newMessage, type: "text", roomId: props.currentRoom.currentRoomId }).then(response => {
        document.getElementById('messageField').value = "";
        setDisabled(false);
    })
}

export default function ChatArea(props) {
    const [disabled, setDisabled] = useState(false);

    return (
        <div className="app-container" style={{ position: 'relative', overflowY: 'hidden' }}>
            <div className="chat-header">
                <Row>
                    <Col sm={12}>
                        <div>
                            <h3 style={{ marginLeft: '20px' }}>{props.currentRoom.roomName !== '' ? props.currentRoom.roomName : 'Click on a user to start a chat with them.'}</h3>
                        </div>
                    </Col>
                </Row>
            </div>
            <div id="chatroom-area">
                {props.currentRoom.messages.map(message => props.currentUserID === message.from ? currentUserTextBox(message) : otherUserTextBox(message))}
            </div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', left: '0', height: "5%" }}>
                <Form onSubmit={(e) => sendMsg(e, props, setDisabled)} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Group style={{ flexGrow: '4' }}>
                        <Form.Control disabled={disabled} required id="messageField" type="text" placeholder="Send message..." />
                    </Form.Group>
                    <Button disabled={disabled} variant="primary" type="submit" style={{ flexGrow: '1', height: '100%' }}>
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    )
}
