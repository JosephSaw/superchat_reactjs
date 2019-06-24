import { FETCH_MESSAGES } from './types';

export const fetchMessages = (db, dispatch) => {
    try {
        db.collection('Rooms/-Li-diDo8cqwYq1chYUQ/Messages').orderBy('timestamp').onSnapshot((querySnapshot => {
            let tempMessageArray = [];
            querySnapshot.forEach(doc => {
                let messageObj = doc.data();
                messageObj.id = doc.id;
                tempMessageArray.push(messageObj);
            });
            dispatch({ type: FETCH_MESSAGES, payload: [...tempMessageArray] });
        }))
    } catch (error) {
        console.log(error);
    }
}