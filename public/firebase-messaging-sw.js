importScripts('https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.3/firebase-messaging.js');

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

const messaging = firebase.messaging();

