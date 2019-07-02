import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck as fasCheck, faTimes as fasTimes, faUserPlus as fasUserPlus } from "@fortawesome/free-solid-svg-icons";

const filterUsers = (query, queryResults, setfilteredUsers) => {
    setfilteredUsers(queryResults.filter(userData => userData.username.toLowerCase().includes(query.toLowerCase())));
}

const queryFirestore = async (query, queryResults, setQueryResults, filteredUsers, setfilteredUsers, db) => {

    if (queryResults.length > 0) {
        filterUsers(query, queryResults, setfilteredUsers);
        return;
    }

    let querySnapshot = await db.collection('Users').where('searchKey', '==', query.charAt(0).toUpperCase()).get();

    let tempQueryResults = querySnapshot.docs.map(docSnapshot => {
        let tempObj = docSnapshot.data();

        tempObj.id = docSnapshot.id;
        return tempObj;
    });

    setQueryResults(tempQueryResults)

    filterUsers(query, tempQueryResults, setfilteredUsers);

}

const acceptFriendRequest = (e, newUser, currentUser, functions) => {
    let acceptFriendRequest = functions.httpsCallable('acceptFriendRequest');

    acceptFriendRequest({ newFriendId: newUser.newFriendId, newFriendUsername: newUser.newFriendUsername, currentUsername: currentUser.username });
}

const sendFriendRequest = (e, newUser, currentUser, functions, ) => {
    let sendFriendRequest = functions.httpsCallable('sendFriendRequest');


    sendFriendRequest({ newFriendId: newUser.id, newFriendUsername: newUser.username, currentUsername: currentUser.username })
}

const renderFilteredUsers = (filteredUsers, functions, currentUser) => {
    return (
        <div>
            <h5>Search Results</h5>
            {filteredUsers.length > 0 ? filteredUsers.map(data =>
                <Card key={data.id}>
                    <Card.Body>
                        <Card.Title>{data.username}</Card.Title>
                        <Card.Subtitle style={{ textAlign: 'end' }}>
                            <OverlayTrigger placement='top' overlay={<Tooltip>Add as friend</Tooltip>}>
                                <Button style={{ marginRight: '15px' }} onClick={(e) => sendFriendRequest(e, data, currentUser, functions)} variant="outline-secondary"><FontAwesomeIcon icon={fasUserPlus} /></Button>
                            </OverlayTrigger>
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            ) : <p>No users found with that query.</p>}
        </div>
    );
}

const renderPendingFriendRequests = (friendsList) => {

    return (
        <div>
            <h5>Pending friend requests</h5>
            {friendsList.map(data =>
                <Card key={data.newFriendId}>
                    <Card.Body>
                        <Card.Title>{data.newFriendUsername}</Card.Title>
                        <Card.Subtitle>Friend Request sent on {data.friendRequestSentOn}</Card.Subtitle>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

const renderReceivedFriendRequests = (friendsList, functions, currentUser) => {

    return (
        <div>
            <h5>Received friend requests</h5>
            {friendsList.map(data =>
                <Card key={data.newFriendId}>
                    <Card.Body>
                        <Card.Title>{data.newFriendUsername}</Card.Title>
                        <Card.Subtitle style={{ textAlign: 'end' }}>
                            <OverlayTrigger placement='top' overlay={<Tooltip>Reject friend request</Tooltip>}>
                                <Button style={{ marginRight: '15px' }} variant="outline-secondary"><FontAwesomeIcon icon={fasTimes} /></Button>
                            </OverlayTrigger>

                            <OverlayTrigger placement='top' overlay={<Tooltip>Accept friend request</Tooltip>}>
                                <Button><FontAwesomeIcon icon={fasCheck} onClick={(e) => acceptFriendRequest(e, data, currentUser, functions)} /></Button>
                            </OverlayTrigger>

                        </Card.Subtitle>
                    </Card.Body>

                    <Card.Footer>Friend Request sent on {data.friendRequestSentOn}</Card.Footer>
                </Card>
            )}
        </div>
    );
}

export default function DiscoverColumn(props) {
    const receivedFriendRequests = useSelector(state => state.receivedFriendRequests);
    const pendingFriendRequests = useSelector(state => state.pendingFriendRequests);

    const [query, setQuery] = useState('');
    const [lastQuery, setLastQuery] = useState('');
    const [queryResults, setQueryResults] = useState([]);
    const [filteredUsers, setfilteredUsers] = useState([]);

    console.log(props);

    if (query === '' && queryResults.length > 0) {
        setQueryResults([]);
        setfilteredUsers([]);
    } else if (query !== '' && lastQuery !== query) {
        setLastQuery(query);
        queryFirestore(query, queryResults, setQueryResults, filteredUsers, setfilteredUsers, props.db);
    }
    return (
        <Col sm={12}>
            <Form>
                <InputGroup className="mb-3">
                    <Form.Control type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Enter a name to search for users" />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>

            {query !== '' ? renderFilteredUsers(filteredUsers, props.functions, props.currentUser) : <h5>Enter a query to search for friends</h5>}

            {receivedFriendRequests.length > 0 ? renderReceivedFriendRequests(receivedFriendRequests, props.functions, props.currentUser) : null}
            {pendingFriendRequests.length > 0 ? renderPendingFriendRequests(pendingFriendRequests) : null}

        </Col>
    );
}