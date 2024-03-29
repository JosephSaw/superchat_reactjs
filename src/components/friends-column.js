import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { fetchMessages } from '../actions/messages';
import { changeRoom } from '../actions/chatrooms';



const startChat = (e, functions, currentUser, friend, db, dispatch) => {
    let startChat = functions.httpsCallable('startChat');

    startChat({ friendUserId: friend.id, friendUsername: friend.username, currentUsername: currentUser.username, currentUserFcmToken: currentUser.fcmToken }).then((response) => {

        if (!response.data.success)
            return;

        changeRoom(dispatch, response.data.payload.roomId, '', currentUser.id, db);
    });
}

const renderFriendsList = (friends, functions, currentUser, db, dispatch) => {
    return (
        <div>
            <h5>Click on a user to start a chat</h5>
            {friends.map(friend =>
                <Card key={friend.id} onClick={(e) => startChat(e, functions, currentUser, friend, db, dispatch)} className="chatroom-card">
                    <Card.Body>
                        <Card.Title>{friend.username}</Card.Title>
                    </Card.Body>
                </Card>
            )}
        </div>);
}

export default function FriendsColumn(props) {
    const friendsList = useSelector(state => state.friendsList);
    const dispatch = useDispatch();

    return (
        <Col sm={12}>
            {friendsList.length > 0 ? renderFriendsList(friendsList, props.functions, props.currentUser, props.db, dispatch) : <p>You currently have no friends added</p>}
        </Col>
    );
}