import React, { useState } from 'react'

import '../App.css';
import '../homepage.css';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog as fasCog, faSearch as fasSearch, faUsers as fasUsers } from "@fortawesome/free-solid-svg-icons";
import { faComments as farComments } from '@fortawesome/free-regular-svg-icons';

import { fetchMessages } from '../actions/messages';
import DiscoverColumn from './discover-column';
import FriendsColumn from './friends-column';
import ChatroomsColumn from './chatrooms-column';

function UserHeader() {
    return (
        <Row>
            <Col sm={8}>
                <div className="user-profile-img">
                    <div className="user-profile-img-container">

                        <Image src="https://picsum.photos/id/237/200/300" roundedCircle />
                    </div>
                </div>
            </Col>

            <Col sm={4}>
                <Button>
                    <FontAwesomeIcon icon={fasCog} />
                </Button>
            </Col>

        </Row>
    );
}

function loadMessages(user, currentUser, dispatch, db) {
    db.collection('Users').doc(currentUser.id).collection('RoomsController').where('isPrivate', '==', true).where('users', 'array-contains', user.id).get().then(async (querySnapshot) => {
        var roomId = '';
        //Check if private chat room exists
        if (querySnapshot.docs.length === 0) {
            let roomControllerObj = { users: [currentUser.id, user.id], isPrivate: true, isBlocked: false };
            // If private chatroom does not exist
            // Create new private chat room for Current User
            const docSnapshot = await db.collection('Users').doc(currentUser.id).collection('RoomsController').add(roomControllerObj);

            // Create new private chat room for Other User
            db.collection('Users').doc(user.id).collection('RoomsController').doc(docSnapshot.id).set(roomControllerObj);

            db.collection('Rooms').doc(docSnapshot.id).set({ users: [currentUser.id, user.id], isPrivate: true });

            roomId = docSnapshot.id;
        } else {
            roomId = querySnapshot.docs[0].id
        }

        fetchMessages(db, dispatch, roomId, user.username);
    })

}

function UserCard(user, currentUser, dispatch, db) {

    return (
        <Col key={user.id} sm={12} className="user-card" onClick={(e) => loadMessages(user, currentUser, dispatch, db)}>
            <div className="user-profile-img">
                <div className="user-profile-img-container">

                    <Image src="https://picsum.photos/id/237/200/300" roundedCircle />
                </div>
                {/* <img src="https://picsum.photos/id/237/200/300" /> */}

            </div>
            <div style={{ flexGrow: '3' }}>
                <div className="user-content-alignment">
                    <span className="user-content-main user-username" >{user.username}</span>
                    <span className="user-content-support user-timestamp">8:28am</span>
                </div>
                <div className="user-content-alignment">
                    <span className="user-content-main user-last-message">Have a good weekend</span>
                    <span className="user-content-support">
                        {/* <Badge variant="primary">12</Badge> */}
                    </span>
                    {/* <span className="user-content-support user-last-message">4</span> */}
                </div>
            </div>
        </Col>
    );
}

function switchNav(tabName, setTabName) {
    setTabName(tabName);
}

export default function Users(props) {
    const [tabName, setTabName] = useState('chatrooms');

    let column;

    switch (tabName) {
        case 'chatrooms':
            column = <ChatroomsColumn db={props.db} currentUser={props.currentUser} />;
            break;

        case 'discover':
            column = <DiscoverColumn db={props.db} dispatch={props.dispatch} functions={props.functions} currentUser={props.currentUser} />
            break;

        case 'friends':
            column = <FriendsColumn db={props.db} functions={props.functions} currentUser={props.currentUser} />
            break;
    }

    return (
        <Container style={{ padding: '0', backgroundColor: '#fff', position: 'relative' }} fluid className="app-container">
            {/* <UserHeader /> */}

            {/* <Row> */}

            <Nav fill justify variant="tabs" defaultActiveKey={tabName} onSelect={(e) => { switchNav(e, setTabName) }}>
                <Nav.Item>
                    <Nav.Link eventKey="chatrooms"><FontAwesomeIcon icon={farComments} /></Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="discover"><FontAwesomeIcon icon={fasSearch} /></Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="friends"><FontAwesomeIcon icon={fasUsers} /></Nav.Link>
                </Nav.Item>
            </Nav>

            <Container>
                <Row>
                    {column}
                </Row>
            </Container>

            <Container style={{ position: 'absolute', bottom: '0' }}>
                <Row>
                    <Button variant="outline-success" style={{margin: '0 auto'}} block onClick={props.handleTutorialModal}>Tutorial</Button>
                </Row>
            </Container>

            {/* <Col sm={8}>
                    <Form>
                        <Form.Group controlId="userSearch">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={4}>
                    <Button variant="primary">Primary</Button>
                </Col> */}

            {/* </Row> */}

            {/* <Row> */}
            {/* {props.users[0] ? UserCard(props.users[0]) : <div></div>} */}
            {/* {props.users.map((user) => user.id != props.currentUser.id ? UserCard(user, props.currentUser, props.dispatch, props.db) : <div key={props.currentUser.id}></div>)} */}
            {/* </Row> */}
            {/* <ul>
                
            </ul> */}
        </Container>

    )
}
