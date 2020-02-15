import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import axios from 'axios'
import './Orders.css'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


class Buyorders extends Component {
    constructor(props){
        super(props); 

        this.state = {
            buyorders: [],
            buyClicked: true,
            ticker: '',
            price: '',
            qty: 0, 
            isUpdated: props.isUpdated
        }
    }

    
   componentDidMount(){
      axios.get('/api/getbuyorders').then(res=>this.setState({buyorders: res.data}))
   }
    render() {
       console.log('buyorder: ', this.state)
        return (
            <div className='currencdies' >
            <ToastContainer
               position="top-right"
               autoClose={1000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl
               pauseOnVisibilityChange
               draggable
               pauseOnHover />

                <table className='buyorders-table' >
                <thead ><tr><td colSpan='4'>Buy orders</td> </tr></thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>QTY</th>
                        <th>Price</th>
                    </tr>
                    {this.state.buyorders.length>=1 && this.state.buyorders.map(order =>
                        <tr key={order.buy_order_id} >
                            <td> {order.ticker}</td>
                            <td> {order.order_type} </td>
                            <td> {order.qty} </td> 
                            <td> {order.wanted_price} </td> 
                        </tr>)}
                </table>
            </div>
        )
    }
}

function mapStateToProps (state) {
   return {
      user: state.userReducer.user, 
      searchInput: state.searchInput, 
      isUpdated: state.orderReducers, 
   }
}

export default connect(mapStateToProps)(Buyorders)
