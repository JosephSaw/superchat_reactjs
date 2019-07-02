import { FETCH_USERS } from './types';

export const fetchUsers = (db, dispatch, currentUserId) => {
    try {
        db.collection('Users').get().then((querySnapshot) => {
            let tempUserArray = [];
            querySnapshot.forEach((doc) => {
                // db.collection('Users').doc(doc.id).collection('RoomsController').get().then(roomsControllerSnapshot => {
                //     // console.log({ roomsControllerSnapshot })
                // })
                let userObj = doc.data();
                userObj.id = doc.id
                tempUserArray.push(userObj);
            });
            dispatch({ type: FETCH_USERS, payload: [...tempUserArray] });
        });
    } catch (error) {
        console.log(error)
    }
}