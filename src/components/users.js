import React from 'react'

import '../App.css';
import '../homepage.css';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

function UserCard(user) {
    return (
        <Col key={user.uid} sm={12} className="user-card">
            <div className="user-profile-img">
                <div className="user-profile-img-container">

                    <Image src="https://picsum.photos/id/237/200/300" roundedCircle />
                </div>
                {/* <img src="https://picsum.photos/id/237/200/300" /> */}

            </div>
            <div style={{ width: '80%', flexGrow: '3' }}>
                <div className="user-content-alignment">
                    <span className="user-content-main user-username" >{user.username}</span>
                    <span className="user-content-support user-timestamp">8:28am</span>
                </div>
                <div className="user-content-alignment">
                    <span className="user-content-main user-last-message">Have a good weekend</span>
                    <span className="user-content-support">
                        <Badge variant="primary">12</Badge>
                    </span>
                    {/* <span className="user-content-support user-last-message">4</span> */}
                </div>
            </div>
        </Col>
    );
}

export default function users(props) {
    console.log(props)
    let tempArray = [];

    for (var i = 0; i < 100; i++)
        tempArray.push(i);

    return (
        <Container fluid="true" className="app-container">

            <Row>

                <Col sm={8}>
                    <Form>
                        <Form.Group controlId="userSearch">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={4}>
                    <Button variant="primary">Primary</Button>
                </Col>

            </Row>

            <Row>
                {props.users[0] ? UserCard(props.users[0]) : <div></div>}
                {/* {props.users.map((user) => UserCard(user))} */}
            </Row>
            {/* <ul>
                
            </ul> */}
        </Container>

    )
}
