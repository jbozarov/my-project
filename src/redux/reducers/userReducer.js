
const initialState = {
    user: {}
}


const USER_LOGGEDIN = 'USER_LOGGEDIN'; 
export const userLogged = user => {
    console.log(user)
    return {
        type: USER_LOGGEDIN, 
        payload: user
    }
}



export default function userReducer (state=initialState, action) {
    const { type, payload } = action; 
    switch(type) {
        case USER_LOGGEDIN : return {...state, user: payload}
        default: return state
    }
}