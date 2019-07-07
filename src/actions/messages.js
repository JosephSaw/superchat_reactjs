import { FETCH_MESSAGES, SEND_MESSAGE } from './types';

import { sendMessagesToServer } from './messagesSnapshot';

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

            dispatch({ type: FETCH_MESSAGES, payload: { messages: tempMessageArray, roomId } });
        }))

    } catch (error) {
        console.error(error);
    }
}
// (firebase, db, dispatch, roomId, message, currentUserId)
export const sendMessage = (message, roomId, dispatch, currentMessages, currentUserId, httpSendMessage) => {
    let newMessageObj = { message, from: currentUserId, type: 'text', sending: true, id: message }
    currentMessages.push(newMessageObj);

    dispatch({ type: SEND_MESSAGE, payload: { currentMessages, roomId } });

    httpSendMessage({ message, type: "text", roomId }).then(response => {
    });
    // .then(response => {
    //     document.getElementById('messageField').value = "";
    //     setDisabled(false);
    // })

}