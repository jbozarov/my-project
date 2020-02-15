
const initialState = {
   isUpdated: false
}

const BUY_UPDATE = 'BUY_UPDATE'; 
export const buyUpdate = (t) => {
   console.log('hit buy update ', t)
   return {
      type: BUY_UPDATE,
      payload: t
   }
}


// const SELL_UPDATE = 'SELL_UPDATE'; 
// export const sellUpdate = () => {
//    return {
//       type: SELL_UPDATE,
//       payload: true
//    }
// }





export default function ordersReducers (state = initialState, action) {
   const { type, payload } = action 
   switch(type) {
      case BUY_UPDATE : return { ...state, isUpdated: payload }
      // case SELL_UPDATE : return { ...state, isUpdated: payload }
      default: return state
   }
}