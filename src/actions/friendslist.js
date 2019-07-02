import { UPDATE_FRIENDS_LIST } from './types';

export const subscribeToFriendsList = (db, dispatch, currentUserId) => {
    db.collection('Users').doc(currentUserId).collection('Friends').onSnapshot(querySnapshot => {
        let friendsList = querySnapshot.docs.map(docSnapshot => docSnapshot.data());

        dispatch({ type: UPDATE_FRIENDS_LIST, payload: friendsList });
    })
}
