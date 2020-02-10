
const initialState = {
    user: {}
}


const USER_LOGGEDIN = 'USER_LOGGEDIN'; 
export const userLogged = user => {
    console.log('user reducer: ', user)
    return {
        type: USER_LOGGEDIN, 
        payload: user
    }
}


const USER_LOGGEDOUT = 'USER_LOGGEDOUT';
export const userLogOut = () => {
   return {
      type: USER_LOGGEDOUT, 
      payload: {}
   }
}


export default function userReducer (state=initialState, action) {
    const { type, payload } = action; 
    switch(type) {
        case USER_LOGGEDIN : return {...state, user: payload}
        case USER_LOGGEDOUT : return {...state, user: payload}
        default: return state
    }
}