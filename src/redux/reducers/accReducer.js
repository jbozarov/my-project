

const initialState = {
    newAccount: {}
}

const CREATE_ACC = 'CREATE_ACC'; 
export const createNewAcc = newAccount => {
    console.log(newAccount); 
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
