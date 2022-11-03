import { createStore } from 'redux';

import getRootReducer from './reducers';

const store = createStore(getRootReducer);

export default store;
