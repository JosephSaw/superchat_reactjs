import { FETCH_USERS } from './types';

export const fetchUsers = (db, dispatch) => {
    try {
        db.collection('Users').get().then((querySnapshot) => {
            let tempUserArray = [];
            querySnapshot.forEach((doc) => {
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