import React from 'react';
import './App.css';
import * as firebase from 'firebase';

import HomePage from './components/home-page';


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
  var db = firebase.firestore();

  // props.db.collection('Rooms').doc('-Lhy7E9p09XGkv8bZDIE').collection('Messages').get().then((querySnapshot) => {
  //     // console.log(querySnapshot.data())
  //     querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} =>`);
  //         console.log({ data: doc.data() })
  //     });
  // });
  return (
    <div className="App">
      <HomePage db={db} />
    </div>
  );
}

export default App;
