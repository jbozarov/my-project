const initialState = {
   showHide: true
}

const HIDE = 'HIDE'; 
export const hidebuyorder = bool => {
   return {
      type: HIDE,
      payload: bool
   }
}

const SHOW = 'SHOW'; 
export const showbuyorder = bool => {
   return {
      type: SHOW,
      payload: bool
   }
}


export default function showhideReducer (state = initialState, action) {
   const { type, payload } = action 
   switch(type) {
      case HIDE : return { ...state, showHide: payload }
      case SHOW : return { ...state, showHide: payload }
      default: return state
   }
}