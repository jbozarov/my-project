


const initialState = {
    sidebarOpen: false
}

const OPEN_SIDEBAR = 'OPEN_SIDEBAR'; 
export const openSideBar = open => {
    return {
        type: OPEN_SIDEBAR, 
        payload: open
    }
}


const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'; 
export const closeSideBar = close => {
    return {
        type: CLOSE_SIDEBAR, 
        payload: close
    }
}

export default function sidebarReducer(state=initialState, action) {
    const { type, payload } = action 
    switch(type) {
        case OPEN_SIDEBAR : return {...state, sidebarOpen: payload }
        case CLOSE_SIDEBAR : return {...state, sidebarOpen: payload }
        default: return state
    }
}