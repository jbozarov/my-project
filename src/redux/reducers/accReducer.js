import actionTypes from '../actionTypes'
const { CREATE_ACC } = actionTypes


const initialState = {
    newAccount: {}
}


export const createNewAcc = newAccount => {
    return {
        type: CREATE_ACC, 
        payload: newAccount
    }
}



export default function accReducer(state=initialState, action) {
    const { type, payload } = action
    switch(type) {
        case CREATE_ACC : return {...state, newAccount: payload }
        default: return state
    }
}
