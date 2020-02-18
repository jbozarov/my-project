import React, { Component } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import axios from 'axios'
import './Orders.css'
import 'react-toastify/dist/ReactToastify.css'
import { MdDelete, MdModeEdit } from 'react-icons/md'
// toast.configure(); 


class Sellorders extends Component {
    constructor(props){
        super(props); 

        this.state = {
            buyorders: [],
            buyClicked: true,
            ticker: '',
            price: '',
            qty: 0, 
            isUpdated: this.props.isUpdated
        }
    }

    componentDidMount(){
       this.getBuyOrders(); 
    }
    
   componentDidUpdate(prevProps){
      if (prevProps !== this.props) {
         this.getBuyOrders(); 
      }
   }

   delete = buy_order_id => {
      axios.delete(`/api/deletebuyorder/${buy_order_id}`)
      .then(res => {
         this.getBuyOrders(); 
      })
   }
   
   getBuyOrders(){
      axios.get('/api/getbuyorders').then(res=>this.setState({buyorders: res.data}))
   }
    render() {
        return (
            <div>
                <table className='buyorders-table'>
                <thead><tr><td colSpan='6'>Buy orders</td></tr></thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {this.state.buyorders.length>=1 && this.state.buyorders.map(order =>
                        <tr key={order.buy_order_id} >
                            <td> {order.ticker}</td>
                            <td> {order.order_type} </td>
                            <td> {order.qty} </td> 
                            <td> {order.wanted_price} </td> 
                            <td><MdModeEdit ></MdModeEdit></td>
                            <td><MdDelete onClick={() => this.delete(order.buy_order_id)} ></MdDelete> </td>
                        </tr>)}
                </table>
            </div>
        )
    }
}

function mapStateToProps (state) {
   console.log(state)
   return {
      user: state.userReducer.user, 
      searchInput: state.searchInput, 
      isUpdated: state.ordersReducers.isUpdated
   }
}

export default connect(mapStateToProps)(Sellorders)