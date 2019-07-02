import React from 'react';
import './App.css';
import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/home-page';
import LoginPage from './components/login-page';
import ProtectedRoute from './components/protected-route';

function App() {
  // console.log(process.env)
  // fetch()
  // console.log(firebase)
  const firebaseConfig = {
    apiKey: "AIzaSyBH4N0jy5LLUwAA2UDu7Z4fJn_RSR5ryVk",
    authDomain: "superchat-4cac7.firebaseapp.com",
    databaseURL: "https://superchat-4cac7.firebaseio.com",
    projectId: "superchat-4cac7",
    storageBucket: "superchat-4cac7.appspot.com",
    messagingSenderId: "936959713239",
    appId: "1:936959713239:web:00e0caf5bf505eac"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const notifs = firebase.messaging();
  const functions = firebase.functions();

  // props.db.collection('Rooms').doc('-Lhy7E9p09XGkv8bZDIE').collection('Messages').get().then((querySnapshot) => {
  //     // console.log(querySnapshot.data())
  //     querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} =>`);
  //         console.log({ data: doc.data() })
  //     });
  // });

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <ProtectedRoute path="/app" exact component={HomePage} componentProps={{ db: db, firebase: firebase, functions, auth, notif: notifs }} /> {/* UNCOMMENT */}
            {/* <Route path="/app" exact render={() => <HomePage db={db} />} /> */}
            {/* <ProtectedRoute exact path="/" component={LoginPage} /> */}
            <Route path="/" exact render={(props) => <LoginPage db={db} auth={auth} notif={notifs} {...props} />} /> {/* UNCOMMENT */}
            {/* <Route path="/" exact render={(props) => <HomePage db={db} functions={functions} firebase={firebase} auth={auth} notif={notifs} {...props} />} /> */}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
