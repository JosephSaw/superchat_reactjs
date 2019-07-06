import { FETCH_MESSAGES, SEND_MESSAGE } from './types';

export const fetchMessages = (db, dispatch, roomId = "") => {
    try {
        if (roomId === "")
            return;

        db.collection('Rooms/' + roomId + '/Messages').orderBy('timestamp').onSnapshot((querySnapshot => {
            let tempMessageArray = [];
            querySnapshot.forEach(doc => {
                let messageObj = doc.data();
                messageObj.id = doc.id;
                tempMessageArray.push(messageObj);
            });
            let payload = {};
            payload[roomId] = tempMessageArray;

            dispatch({ type: FETCH_MESSAGES, payload });
        }))

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