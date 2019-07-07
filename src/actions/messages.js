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
        console.log(error);
    }
}
// (firebase, db, dispatch, roomId, message, currentUserId)
export const sendMessage = (message, roomId, dispatch, currentMessages, currentUserId, httpSendMessage) => {
    let newMessageObj = { message, from: currentUserId, type: 'text', sending: true, id: message }
    currentMessages.push(newMessageObj);
    console.log(currentMessages)

    dispatch({ type: SEND_MESSAGE, payload: { currentMessages, roomId } });

    console.log('test');
    httpSendMessage({ message, type: "text", roomId }).then(response => {
        console.log({ response })
        console.log('sent successful!');
    });
    // .then(response => {
    //     document.getElementById('messageField').value = "";
    //     setDisabled(false);
    // })

}