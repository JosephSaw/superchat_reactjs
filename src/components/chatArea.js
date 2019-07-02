import React from 'react'
import '../App.css';
import '../homepage.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

const sendMsg = (e, props) => {
    e.preventDefault();
    let sendMessage = props.functions.httpsCallable('sendMessage');

    let newMessage = document.getElementById('messageField').value
    sendMessage({ message: newMessage, type:"text", roomId: props.currentRoom.currentRoomId }).then(response => {
        console.log(response);
        document.getElementById('messageField').value = "";
    })
}

export default function ChatArea(props) {
    console.log(props);

    return (
        <div className="app-container" style={{ position: 'relative', overflowY: 'hidden' }}>
            <div className="chat-header">
                <Row>
                    <Col sm={12}><h1>{props.currentRoom.roomName !== '' ? props.currentRoom.roomName : 'Click on a user to start a chat with them.'}</h1></Col>
                </Row>
            </div>
            <div id="chatroom-area">
                {props.currentRoom.messages.map(message => props.currentUserID === message.from ? currentUserTextBox(message) : otherUserTextBox(message))}
            </div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', left: '0', height: "5%" }}>
                <Form onSubmit={(e) => sendMsg(e, props)} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Group style={{ flexGrow: '4' }}>
                        <Form.Control required id="messageField" type="text" placeholder="Send message..." />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ flexGrow: '1', height: '100%' }}>
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    )
}
