import React, { useEffect, useState } from 'react'
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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Users from './users';

import ChatArea from './chatArea';

import { HIDE_TOAST } from '../actions/types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog as fasCog, faSearch as fasSearch, faUsers as fasUsers } from "@fortawesome/free-solid-svg-icons";
import { faComments as farComments } from '@fortawesome/free-regular-svg-icons';




export default function HomePage(props) {
    const toast = useSelector(state => state.toast);
    const users = useSelector(state => state.users);
    const chatrooms = useSelector(state => state.chatrooms);
    const currentUser = useSelector(state => state.currentUser);
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        fetchUsers(props.db, dispatch, currentUser.id);
        subscribeToFriendRequests(props.db, dispatch, currentUser.id);
        subscribeToFriendsList(props.db, dispatch, currentUser.id);
        subscribeToChatrooms(props.db, dispatch, currentUser.id);
    }, []);

    const handleToastClose = () => dispatch({ type: HIDE_TOAST, payload: { show: false } });

    let currentMessages = [];

    if (messages[chatrooms.currentRoomId] === undefined)
        fetchMessages(props.db, dispatch, chatrooms.currentRoomId, currentUser.id);
    else
        currentMessages = messages[chatrooms.currentRoomId];

    const handleModal = () => {
        setShowModal(!showModal);
    }

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
                <Col sm={4}><Users handleTutorialModal={handleModal} modal={{ showModal, setShowModal }} users={users} currentUser={currentUser} dispatch={dispatch} db={props.db} functions={props.functions} /></Col>
                <Col sm={8}><ChatArea messages={currentMessages} roomId={chatrooms.currentRoomId} roomName={chatrooms.currentRoomName} currentUserID={currentUser.id} dispatch={dispatch} db={props.db} firebase={props.firebase} functions={props.functions} /></Col>
            </Row>

            <Modal show={showModal} size="lg" onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Getting Started
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>1. Search for and add a friend</h4>
                    <p>
                        Click on the <FontAwesomeIcon icon={fasSearch} /> to search for a friend and send a friend request.
                    </p>

                    <h4>2. Accept friend request</h4>
                    <p>
                        Once your friend has accepted your request, click on the <FontAwesomeIcon icon={fasUsers} /> to look at your friends list and click on their name to start a chat.
                    </p>

                    <h4>3. Start chatting</h4>
                    <p>
                        Once you have started a chat, you can find all your active chatrooms under the following icon, <FontAwesomeIcon icon={farComments} />
                    </p>

                    <hr />
                    <p>
                        You can reopen this tutorial by clicking on the button at the bottom left.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
