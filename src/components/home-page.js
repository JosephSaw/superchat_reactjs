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
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers(props.db, dispatch);
        fetchMessages(props.db, dispatch);
    }, []);

    return (
        <Container fluid="true">
            <Row>
                <Col sm={4}><Users users={users} currentUser={currentUser} dispatch={dispatch} db={props.db}/></Col>
                <Col sm={8}><ChatArea messages={messages} currentUserID="A4kagVAwvNW38bHf0GIakhPp3Vb2" /></Col>
            </Row>
        </Container>
    )
}
