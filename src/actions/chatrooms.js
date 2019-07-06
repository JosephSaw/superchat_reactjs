import { UPDATE_CHATROOMS, CHANGE_CURRENT_ROOM } from './types';

export const subscribeToChatrooms = (db, dispatch, currentUserId) => {
    db.collection('Users').doc(currentUserId).collection('RoomsController').onSnapshot(querySnapshot => {
        let chatrooms = querySnapshot.docs.map(docSnapshot => {
            let tempChatroomObj = docSnapshot.data();
            tempChatroomObj.roomId = docSnapshot.id;
            return tempChatroomObj;
        });

        console.log(chatrooms)

        dispatch({ type: UPDATE_CHATROOMS, payload: chatrooms });
    })
}

export const changeRoom = (dispatch, roomId, roomName, currentUserId = '', db = {}) => {
    if (roomName === '') {
        db.collection('Users').doc(currentUserId).collection('RoomsController').doc(roomId).get().then(docSnapshot => {
            let data = docSnapshot.data();
            dispatch({ type: CHANGE_CURRENT_ROOM, payload: { roomId, roomName: data.roomName } });
        })
    }
    dispatch({ type: CHANGE_CURRENT_ROOM, payload: { roomId, roomName } });
}