import { FETCH_MESSAGES, SEND_MESSAGE } from './types';

export const fetchMessages = (db, dispatch, roomId = "", currentUserId) => {
    try {
        if (roomId === "")
            return;

        db.collection('Users').doc(currentUserId).collection('RoomsController').doc(roomId).get().then(docSnapshot => {
            let roomController = docSnapshot.data()
            db.collection('Rooms/' + roomId + '/Messages').orderBy('timestamp').onSnapshot((querySnapshot => {
                let tempMessageArray = [];
                querySnapshot.forEach(doc => {
                    let messageObj = doc.data();
                    messageObj.id = doc.id;
                    tempMessageArray.push(messageObj);
                });
                dispatch({ type: FETCH_MESSAGES, payload: { currentRoomId: roomId, messages: [...tempMessageArray], roomName: roomController.roomName } });

                var el = document.querySelector('#chatroom-area');
                el.scrollTo({
                    top: el.scrollHeight,
                    behavior: 'smooth'
                });
            }))
        })

    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = (firebase, db, dispatch, roomId, message, currentUserId) => {
    db.collection('Rooms').doc(roomId).collection('Messages').add({ from: currentUserId, message: message, type: 'text', timestamp: firebase.firestore.Timestamp.fromDate(new Date()) }).then(docSnapshot => {
        db.collection('Rooms').doc(roomId).collection('Messages').doc(docSnapshot.id).get().then(doc => {
            let messageObj = doc.data();
            messageObj.id = doc.id;
        })

    })

}