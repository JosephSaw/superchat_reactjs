import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../actions/users';
import { fetchMessages } from '../actions/messages';
import { subscribeToFriendRequests } from '../actions/friend-requests';
import { subscribeToFriendsList } from '../actions/friendslist';
import { subscribeToChatrooms } from '../actions/chatrooms';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

import Users from './users';

import ChatArea from './chatArea';

import { HIDE_TOAST } from '../actions/types';

export default function HomePage(props) {
    const toast = useSelector(state => state.toast);
    const users = useSelector(state => state.users);
    const currentUser = useSelector(state => state.currentUser);
    const currentRoom = useSelector(state => state.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers(props.db, dispatch, currentUser.id);
        subscribeToFriendRequests(props.db, dispatch, currentUser.id);
        subscribeToFriendsList(props.db, dispatch, currentUser.id);
        subscribeToChatrooms(props.db, dispatch, currentUser.id);
    }, []);

    const handleToastClose = () => dispatch({ type: HIDE_TOAST, payload: { show: false } });

    return (
        <Container fluid="true" style={{ padding: '0', position: 'relative' }}>
            <div style={{ position: 'absolute', zIndex: '999', top: '25px', right: '50px' }}>
                <Toast autohide onClose={handleToastClose} show={toast.show} delay={5000} >
                    <Toast.Header closeButton={false}>
                        <strong className="mr-auto">{toast.header}</strong>
                        {/* <small>0 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>{toast.body}</Toast.Body>
                </Toast>
            </div>

            <Row noGutters>
                <Col sm={4}><Users users={users} currentUser={currentUser} dispatch={dispatch} db={props.db} functions={props.functions} /></Col>
                <Col sm={8}><ChatArea currentRoom={currentRoom} currentUserID={currentUser.id} dispatch={dispatch} db={props.db} firebase={props.firebase} functions={props.functions} /></Col>
            </Row>
        </Container>
    )
}
