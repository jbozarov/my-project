import React, { Component } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import axios from 'axios'
import './Orders.css'
import 'react-toastify/dist/ReactToastify.css'
import { MdDelete, MdModeEdit } from 'react-icons/md'
// toast.configure(); 


class Buyorders extends Component {
    constructor(props){
        super(props); 

        this.state = {
            buyorders: [],
            buyClicked: true,
            isUpdated: this.props.isUpdated,
            buyOrderId: '', 
            type: 'limit',
            qty: '', 
            price: '',
         }
    }

    getBuyOrders = () => axios.get('/api/getbuyorders').then(res=>this.setState({buyorders: res.data}))
   
    componentDidMount(){
       this.getBuyOrders(); 
    }
    
   componentDidUpdate(prevProps){
      if (prevProps !== this.props) {
         this.getBuyOrders(); 
      }
   }

   edit = buy_order_id => this.setState({buyOrderId: buy_order_id})
   handleSelect = e => this.setState({type: e.target.value})
   handleChange = e => this.setState({[e.name]: e.value})

   submit = () => {
      const {buyOrderId, type, qty, price} = this.state
      console.log('front 44: ', buyOrderId, type, qty, price)
      axios.put('/api/editbuyorder', {buyOrderId, type, qty, price})
      .then(res => {
         this.getBuyOrders()
         this.setState({buyOrderId: '', type: 'limit', qty: '', price: ''})
      })
      .catch(err => console.log(err))
   }
   delete = buy_order_id => {
      axios.delete(`/api/deletebuyorder/${buy_order_id}`)
      .then(res => {
         this.getBuyOrders(); 
      })
      .catch(err => console.log(err))
   }

    render() {
       const { buyOrderId, qty, price } = this.state
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
                           <td> {buyOrderId === order.buy_order_id ? <select onChange={e => this.handleSelect(e)} > <option value='limit' >Limit</option> <option value='stop limit' >Stop Limit</option> </select>: order.order_type }</td>  
                           <td> {buyOrderId === order.buy_order_id ?  <input style={{width: '20px'}} name='qty' value={qty} onChange={e => this.handleChange(e.target)} /> : order.qty } </td>  
                           <td> {buyOrderId === order.buy_order_id ? <input style={{width: '30px'}} name='price' value={price} onChange={e => this.handleChange(e.target)} /> : order.wanted_price} </td> 
                           <td> {buyOrderId === order.buy_order_id ? <button onClick={() => this.submit()} >Submit </button> : <MdModeEdit onClick={() => this.edit(order.buy_order_id)} ></MdModeEdit>} </td>
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

export default connect(mapStateToProps)(Buyorders)



// <ToastContainer
// position="top-right"
// autoClose={1000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl
// pauseOnVisibilityChange
// draggable
// pauseOnHover />