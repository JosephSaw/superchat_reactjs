import { UPDATE_CHATROOMS } from './types';

export const subscribeToChatrooms = (db, dispatch, currentUserId) => {
    db.collection('Users').doc(currentUserId).collection('RoomsController').onSnapshot(querySnapshot => {
        let chatrooms = querySnapshot.docs.map(docSnapshot => {
            let tempChatroomObj = docSnapshot.data();
            tempChatroomObj.roomId = docSnapshot.id;

            return tempChatroomObj;
        })

        dispatch({ type: UPDATE_CHATROOMS, payload: chatrooms });
    })
}