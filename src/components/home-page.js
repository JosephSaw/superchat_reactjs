import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Users from './users';

import ChatArea from './chatArea';

function getUsers(db, users, setUsers) {
    db.collection('Users').get().then((querySnapshot) => {
        let tempUserArray = [];
        querySnapshot.forEach((doc) => {
            let userObj = doc.data();
            userObj.id = doc.id
            tempUserArray.push(userObj);
        });
        setUsers([...users, ...tempUserArray]);
    });
};

function getMessages(db, setMessages) {
    db.collection('Rooms/-Li-diDo8cqwYq1chYUQ/Messages').orderBy('timestamp').onSnapshot((querySnapshot => {
        let tempMessageArray = [];
        querySnapshot.forEach(doc => {
            let messageObj = doc.data();
            messageObj.id = doc.id;
            tempMessageArray.push(messageObj);
        });
        setMessages([...tempMessageArray]);
    }))
}

export default function HomePage(props) {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getUsers(props.db, users, setUsers);
        getMessages(props.db, setMessages);
    }, []);

    return (
        <Container fluid="true">
            <Row>
                <Col sm={4}><Users users={users} /></Col>
                <Col sm={8}><ChatArea messages={messages} currentUserID="A4kagVAwvNW38bHf0GIakhPp3Vb2" /></Col>
            </Row>
        </Container>
    )
}
