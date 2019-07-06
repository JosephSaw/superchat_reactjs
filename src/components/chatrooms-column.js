import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../actions/messages';
import { changeRoom } from '../actions/chatrooms';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const renderChatrooms = (chatrooms, db, currentUser, dispatch) => {
    return (<div>
        <h5>Chatrooms</h5>
        {chatrooms.map(chatroom =>
            <Card key={chatroom.roomId} onClick={(e) => changeRoom(dispatch, chatroom.roomId, chatroom.roomName)} className="chatroom-card">
                <Card.Body>
                    <Card.Title>{chatroom.roomName}</Card.Title>
                    <Card.Subtitle>{chatroom.previousMessage}</Card.Subtitle>
                </Card.Body>
            </Card>
        )
        }
    </div >);
}

const ChatroomsColumn = (props) => {
    const chatrooms = useSelector(state => state.chatrooms);
    const dispatch = useDispatch();

    return (
        <Col sm={12}>
            {chatrooms.chatrooms.length > 0 ? renderChatrooms(chatrooms.chatrooms, props.db, props.currentUser, dispatch) : <p>No chatrooms found, add a friend to get started!</p>}

        </Col>
    );
}

export default ChatroomsColumn