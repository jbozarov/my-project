import accReducer from './accReducer'
import actionTypes from '../actionTypes'
const { CREATE_ACC } = actionTypes


describe('Acc reducer', () => {

   it("Should return default state", () => {
      const newState = accReducer({}, '')
      expect(newState).toEqual({})
   }); 

   it("Should return new state", () => {
      const newAccount = {}
      const newUser = {
         name: 'John', 
         last: 'Bozarov', 
         age: 34
      }

      const expectedState = {
         newAccount: {
            name: 'John', 
            last: 'Bozarov', 
            age: 34
         }
      }

      const newState = accReducer(newAccount, {
         type: CREATE_ACC, 
         payload: newUser
      })
      expect(newState).toStrictEqual(expectedState)
   })
})