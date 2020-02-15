

const initialState = {
   searchInput: ''
}


const UPDATE_STATE = 'UPDATE_STATE'; 
export const filterState = searchValue => {
   console.log(`searchReducer: ${searchValue}`)
   return {
      type: UPDATE_STATE,
      payload: searchValue
   }
}


export default function searchReducer (state = initialState, action) {
   const { type, payload } = action 
   switch(type) {
      case UPDATE_STATE : return { ...state, searchInput: payload }
      default: return state
   }
}