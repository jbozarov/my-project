

import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './reducers/userReducer'
import sidebarReducer from './reducers/sidebarReducer'
import accReducer from './reducers/accReducer'
import searchReducer from './reducers/filterReducer'

const rootReducer = combineReducers({
    userReducer,
    sidebarReducer,
    account: accReducer,
    searchInput: searchReducer,
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware)); 