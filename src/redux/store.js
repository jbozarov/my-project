
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './reducers/userReducer'
import sidebarReducer from './reducers/sidebarReducer'
import accReducer from './reducers/accReducer'
import searchReducer from './reducers/searchReducer'
import ordersReducers from './reducers/ordersReducers'
import showhideReducer from './reducers/showhideReducer'

const rootReducer = combineReducers({
    userReducer,
    sidebarReducer,
    account: accReducer,
    searchInput: searchReducer,
    ordersReducers,
    showhideReducer,
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware)); 