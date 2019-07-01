import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../actions/users';
import { fetchMessages } from '../actions/messages';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Users from './users';

import ChatArea from './chatArea';

export default function HomePage(props) {
    const users = useSelector(state => state.users);
    const currentUser = useSelector(state => state.currentUser);
    const currentRoom = useSelector(state => state.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers(props.db, dispatch, currentUser.id);
    }, []);

    return (
        <Container fluid="true" style={{padding:'0'}}>
            <Row noGutters>
                <Col sm={4}><Users users={users} currentUser={currentUser} dispatch={dispatch} db={props.db}/></Col>
                <Col sm={8}><ChatArea currentRoom={currentRoom} currentUserID={currentUser.id} dispatch={dispatch} db={props.db} firebase={props.firebase} /></Col>
            </Row>
        </Container>
    )
}
