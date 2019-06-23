import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Users from './users';

function getUsers(db, users, setUsers) {
    db.collection('Users').get().then((querySnapshot) => {
        let tempUserArray = [];
        querySnapshot.forEach((doc) => {
            let userObj = doc.data();
            userObj.uid = doc.id
            tempUserArray.push(userObj);
        });
        setUsers([...users, ...tempUserArray]);
    });
};

export default function HomePage(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers(props.db, users, setUsers)
    }, []);

    return (
        <Container>
            <Row>
                <Col sm={4}><Users users={users} /></Col>
                <Col sm={8}>sm8</Col>
            </Row>
        </Container>
    )
}
