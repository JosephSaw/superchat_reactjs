import React, { useState, useEffect } from 'react'
import '../App.css';
import '../homepage.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { sendMessage } from '../actions/messages';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';

function otherUserTextBox(message) {
    return (
        <div key={message.id} className="chat-other-user">
            <div className="chat-box chat-other-user-box">
                <p>{message.message}</p>
            </div>
        </div>
    )
}

function currentUserTextBox(message) {
    return (
        <div key={message.id} className="chat-current-user">
            <div className="chat-box chat-current-user-box">
                <div style={{ display: 'flex', alignItems: ' flex-end' }}>
                    <p>{message.message}</p>  {message.sending ? <FontAwesomeIcon style={{ marginLeft: '10px' }} size="xs" icon={farClock} /> : null}
                </div>
            </div>
        </div>
    );
}

const sendMsg = (e, props) => {
    e.preventDefault();
    let httpSendMessage = props.functions.httpsCallable('sendMessage');
    let formField = document.getElementById('messageField')

    let newMessage = formField.value;
    sendMessage(newMessage, props.roomId, props.dispatch, props.messages, props.currentUserID, httpSendMessage);
    formField.value = "";
}

export default function ChatArea(props) {

    useEffect(() => {
        var el = document.querySelector('#chatroom-area');
        el.scrollTo({
            top: el.scrollHeight,
            behavior: 'smooth'
        });
    });

    return (
        <div className="app-container" style={{ position: 'relative', overflowY: 'hidden' }}>
            <div className="chat-header">
                <Row>
                    <Col sm={12}>
                        <div>
                            <h3 style={{ marginLeft: '20px' }}>{props.roomName !== '' ? props.roomName : 'Click on a user to start a chat with them.'}</h3>
                        </div>
                    </Col>
                </Row>
            </div>
            <div id="chatroom-area">
                {props.messages.map(message => props.currentUserID === message.from ? currentUserTextBox(message) : otherUserTextBox(message))}
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
