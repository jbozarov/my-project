import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'


const Cart = props => {
const [ cartItems, setCartItems ] = useState([])
const [ amount, setAmount ] = useState(0)

useEffect( () => {
   axios.get(`/api/cart/${props.user.customer_order_id}`)
   .then(items => setCartItems(items.data))
   .catch(err => console.log(err))
}, [])

console.log('Cart line 14: ', cartItems, props.user.customer_order_id)
const items = cartItems.map(item => (
   <CartItem key={item.cart_id} > 
      <p> {item.ticker} </p>
      <p> {item.qty} </p>
      <p> {item.price} </p>
      <p> {item.total} </p>
   </CartItem>
))


// const onOpened=()=>{
//    console.log('this is opened')
//  }

// const onClosed=()=>{
//    console.log('this is closed')
//  }

const onToken = (token) => {
   console.log(token)
   let { amount } = this.state
   amount /= 100
   console.log(amount)
   token.card = void 0
   axios.post('/api/payment', { token, amount: this.state.amount }).then(res => {
     console.log(res)
     alert(`Congratulations you paid Kevin ${amount}!`)
   })
 }

 const yourTotal = cartItems.reduce((a, b) => parseInt(a) + parseInt(b.total), 0); 
 console.log(yourTotal)

   return (
      <div>
         {items}
         <h3> Your total is: {yourTotal} </h3>
         <button>Checkout</button>
         <button>Checkout</button>

         <StripeCheckout
          name='CLass' //header
         //  image={imageUrl}
          description='This is stuff going beneath the header' //subtitle - beneath header
          stripeKey={process.env.REACT_APP_STRIPE_KEY} //public key not secret key
          token={onToken} //fires the call back
          amount={amount} //this will be in cents
          currency="USD" 
          // image={imageUrl} // the pop-in header image (default none)
          // ComponentClass="div" //initial default button styling on block scope (defaults to span)
          panelLabel="Submit Payment" //text on the submit button
          locale="en" //locale or language (e.g. en=english, fr=french, zh=chinese)
         //  opened={onOpened} //fires cb when stripe is opened
         //  closed={onClosed} //fires cb when stripe is closed
          allowRememberMe // "Remember Me" option (default true)
          billingAddress={false}
          // shippingAddress //you can collect their address
          zipCode={false}
        >
          {/* <button>Checkout</button> */}
        </StripeCheckout>

      </div>
   )
}

function mapStateToProps (state) {
   return {
      user: state.userReducer.user
   }
}

export default connect(mapStateToProps)(Cart); 

const CartItem = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between; 
   align-items: center; 
   max-width: 80vw; 
   margin: auto; 
`;