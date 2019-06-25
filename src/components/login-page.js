import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../loginpage.css';

import { useSpring, animated } from 'react-spring'
import { FlareComponent } from 'flare-react';
import teddy from '../assets/Teddy.flr';
import baby_sam from '../assets/baby_sam.flr';
import chomper from '../assets/chomper.flr';
import chat_welcome from '../assets/chat_welcome.flr'
import login_background from '../assets/login_background.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { SUCCESSFUL_LOGIN } from '../actions/types';

const getAvatar = () => {

    let obj = {
        type: 'FlareComponent',
        props: { animationName: 'idle', width: 200, height: 260, file: teddy }
    }

    obj = JSON.stringify(obj);
    return obj;
}

function createProfile(props, dispatch) {
    let profileName = document.getElementById('profileForm').value
    props.auth.signInAnonymously().then((firebaseUser) => {
        props.db.collection('Users').doc(firebaseUser.user.uid).set({ username: profileName, avatar: 2 }).then(() => {
            props.db.collection('Users').doc(firebaseUser.user.uid).get().then(docSnapshot => {
                let userData = docSnapshot.data()
                dispatch({ type: SUCCESSFUL_LOGIN, payload: { id: firebaseUser.user.uid, username: userData.username, loggedIn: true } });
                props.history.push('/app');
            })
        })

    })

}


export default function LoginPage(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const animatedWelcome = useSpring({ opacity: 0, from: { opacity: 1 }, delay: 5000, duration: 1000 });
    const staticBackground = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 5000, duration: 200 });
    const loginForm = useSpring({ transform: " translateY(0px)", from: { transform: "translateY(-800px)" }, delay: 6000, duration: 800 });

    return (
        <div className="main-container">
            {/* <h1>Login Page</h1> */}
            <animated.div style={animatedWelcome} className="login_background_animation">
                <FlareComponent animationName='starting' width={window.innerWidth} height={window.innerHeight} file={chat_welcome} />
            </animated.div>

            <animated.div style={staticBackground} >

                <img style={{ width: '100vw', height: '100vh', opacity: 0.8, objectFit: 'cover', position: 'absolute', zIndex: '-10' }} src={login_background} />

                <animated.div style={loginForm} >
                    <div style={{ position: 'absolute', height: '100vh', width: '55%', backgroundColor: '#fff', right: 0 }}>
                        <Container>
                            <Row>
                                <Col sm={12}>
                                    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '80%', }}>
                                            <div>
                                                <h1>Create Profile</h1>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Card>
                                                    <Card.Img variant="top" src="https://picsum.photos/200/260" />
                                                    {/* <FlareComponent className="card-img-top" animationName='idle' width={200} height={260} file={chomper} /> */}

                                                    <Card.Body>
                                                        <Card.Text style={{ textAlign: 'center' }}>
                                                            Chomper
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card>
                                                    <Card.Img variant="top" src="https://picsum.photos/200/260" />
                                                    {/* <FlareComponent className="card-img-top" animationName='idle' width={200} height={260} file={teddy} /> */}
                                                    <Card.Body>
                                                        <Card.Text style={{ textAlign: 'center' }}>
                                                            Teddy
                                                         </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                <Card>
                                                    <Card.Img variant="top" src="https://picsum.photos/200/260" />
                                                    <Card.Body>
                                                        <Card.Text style={{ textAlign: 'center' }}>
                                                            Baby Sam
                                                         </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                            <p>Choose an avatar. (Avatars can only be seen in the mobile app version)</p>
                                            <Form onSubmit={(e) => {
                                                e.preventDefault()
                                                createProfile(props, dispatch);
                                            }}>
                                                <Form.Group>
                                                    <Form.Control id="profileForm" type="text" placeholder="Enter Username" />
                                                </Form.Group>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button variant="primary" type="submit" >
                                                        Continue
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </animated.div>
            </animated.div>
        </div>

    )
}
