import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};
const allStoreEnhancers = compose(applyMiddleware(thunk));
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(
    rootReducer,
    initialState,
    allStoreEnhancers
)

export default store;