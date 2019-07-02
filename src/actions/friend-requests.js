import { UPDATE_PENDING_FRIEND_REQUESTS, UPDATE_RECEIVED_FRIEND_REQUESTS } from './types';


export const subscribeToFriendRequests = (db, dispatch, currentUserId) => {
    db.collection('Users').doc(currentUserId).collection('FriendRequests').onSnapshot((querySnapshot) => {
        let pendingFriendRequests = [];
        let receivedFriendRequests = [];

        querySnapshot.forEach((docSnapshot) => {
            let friendRequestObj = docSnapshot.data();

            friendRequestObj.friendRequestSentOn = friendRequestObj.friendRequestSentOn.toDate().toString();

            if (friendRequestObj.type === 'sent') {
                pendingFriendRequests = [...pendingFriendRequests, friendRequestObj];
            } else if (friendRequestObj.type === 'received') {
                receivedFriendRequests = [...receivedFriendRequests, friendRequestObj];
            }
        })

        dispatch({ type: UPDATE_PENDING_FRIEND_REQUESTS, payload: pendingFriendRequests });
        dispatch({ type: UPDATE_RECEIVED_FRIEND_REQUESTS, payload: receivedFriendRequests });

    });
}