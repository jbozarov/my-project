import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { ToastContainer, toase, toast } from 'react-toastify'
import axios from 'axios'
import { connect } from 'react-redux'
import styled from 'styled-components'


const Cart = props => {
const [ cartItems, setCartItems ] = useState([])

useEffect( () => {
   getCart()
}, [])

function getCart() {
   axios.get(`/api/cart/${props.user.customer_order_id}`)
   .then(items => setCartItems(items.data))
   .catch(err => console.log(err))
}

const remove = ticker => {
   axios.delete(`/api/removefromcart/${ticker}`)
   .then(() => getCart())
   .catch(err => console.log(err))
}


// const onOpened=()=>{
//    console.log('this is opened')
//  }

// const onClosed=()=>{
//    console.log('this is closed')
//  }

const onToken = (token) => {
   console.log('line 38 is: ', token)
   axios.post('/api/payment', { token, amount: (yourTotal*100).toFixed(), customer_order_id: props.user.customer_order_id, customer_id: props.user.customer_id })
   .then(res => {
      toast.success(`Congratulations you paid ${props.user.first_name} ${yourTotal}!`)
   })
   .then(err => {
      toast.error('Error occured')
   })
 }

 const yourTotal = cartItems.reduce((a, b) => parseFloat(a) + parseFloat(b.total), 0); 

   return (
      <div>
         <ToastContainer position="top-right" autoClose={1200} hideProgressBar={false} newestOnTop={false}
         closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
         {console.log('this is: ', props.user.customer_id)}
         {cartItems.length < 1 ? 
            <h3> Your cart is empty </h3>
         :
         cartItems.map(item => (
            <CartItem key={item.cart_id} > 
               <p> {item.ticker} </p>
               <p> {item.qty} </p>
               <p> {item.price} </p>
               <p> {item.total} </p>
               <button onClick={() => remove(item.ticker)} >Remove from card </button>
            </CartItem>
         ))}
         <h3> Your total is: {yourTotal} </h3>
         <StripeCheckout
          name='bankname' //header
         //  image={imageUrl}
          description='making a payment' //subtitle - beneath header
          stripeKey={process.env.REACT_APP_STRIPE_KEY} //public key not secret key
          token={onToken} //fires the call back
          amount={yourTotal*100} //this will be in cents
         //  currency="USD" 
          image={imageUrl} // the pop-in header image (default none)
          // ComponentClass="div" //initial default button styling on block scope (defaults to span)
          panelLabel="Submit Payment" //text on the submit button
         //  locale="en" //locale or language (e.g. en=english, fr=french, zh=chinese)
         //  opened={onOpened} //fires cb when stripe is opened
         //  closed={onClosed} //fires cb when stripe is closed
          allowRememberMe={true} // "Remember Me" option (default true)
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

const imageUrl = 'https://img.favpng.com/7/23/21/logo-atom-bank-brand-portfolio-company-png-favpng-6u9CEmCiGejDKMjtGsYpHUUFw.jpg'