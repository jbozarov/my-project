import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Transactinos from '../components/transactions/Transactions'
// import Signin from '../components/signin/SignIn'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })


// const setUp = (initialStore={}) => {
//    const store = testStore(initialStore)
//    const wrapper = swallow(<Signin  store={store} />.childAt(0).dive())
//    console.log(wrapper.debug())
//    return wrapper 
// }
// describe('Tesing Transactions', () => {
//    it('Testing state property transactions is an array', () => {
//    const wrapper = setUp(initialStore)
//    const htwo = wrapper.find('h2')
//    expect(htwo.text()).toBe('Please Sign in')
//    })
// })


describe('Should render Transactions', () => {

   it('Should find div', () => {
      const component = shallow(<Transactinos />)
      const wrapper = component.find('.transactions-class')
      expect(wrapper.length).toBe(1)
   })
   
})