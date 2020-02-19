
const initialState = {
   isUpdated: false
}

const BUY_UPDATE = 'BUY_UPDATE'; 
export const buyUpdate = bool => {
   return {
      type: BUY_UPDATE,
      payload: bool
   }
}


const SELL_UPDATE = 'SELL_UPDATE'; 
export const sellUpdate = bool => {
   console.log('hit sell update ', bool)
   return {
      type: SELL_UPDATE,
      payload: bool
   }
}





export default function ordersReducers (state = initialState, action) {
   const { type, payload } = action 
   switch(type) {
      case BUY_UPDATE : return { ...state, isUpdated: payload }
      case SELL_UPDATE : return { ...state, isUpdated: payload }
      default: return state
   }
}