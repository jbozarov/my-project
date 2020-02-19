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
            sellorders: [],
            sellClicked: true,
            isUpdated: this.props.isUpdated,
            sellOrderId: '', 
            type: 'limit',
            price: '',
         }
    }

    getSellOrders = () => axios.get('/api/getsellorders').then(res=>this.setState({sellorders: res.data}))
   
    componentDidMount(){
       this.getSellOrders(); 
    }
    
   componentDidUpdate(prevProps){
      if (prevProps !== this.props) {
         this.getSellOrders(); 
      }
   }

   edit = sell_order_id => this.setState({sellOrderId: sell_order_id})
   handleSelect = e => this.setState({type: e.target.value})
   handleChange = e => this.setState({[e.name]: e.value})

   submit = () => {
      const {sellOrderId, type, price} = this.state
      console.log('front 44: ', sellOrderId, type, price)
      axios.put('/api/editsellorder', {sellOrderId, type, price})
      .then(res => {
         this.getSellOrders()
         this.setState({sellOrderId: '', type: 'limit', price: ''})
      })
      .catch(err => console.log(err))
   }
   delete = sell_order_id => {
      axios.delete(`/api/deletesellorder/${sell_order_id}`)
      .then(res => {
         this.getSellOrders(); 
      })
      .catch(err => console.log(err))
   }

    render() {
       const { sellorders, sellOrderId, price } = this.state
       console.log(this.state)
        return (
            <div>
                <table className='buyorders-table'>
                <thead><td colSpan='6'>Sell orders</td></thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {sellorders.length>=1 && sellorders.map(order =>
                        <tr key={order.sell_order_id} >
                           <td> {order.ticker}</td>
                           <td> {sellOrderId === order.sell_order_id ? <select onChange={e => this.handleSelect(e)} > <option value='limit' >Limit</option> <option value='stop limit' >Stop Limit</option> </select>: order.order_type }</td>  
                           <td> {order.qty} </td>  
                           <td> {sellOrderId === order.sell_order_id ? <input style={{width: '30px'}} name='price' value={price} onChange={e => this.handleChange(e.target)} /> : order.wanted_price} </td> 
                           <td> {sellOrderId === order.sell_order_id ? <button onClick={() => this.submit()} >Submit </button> : <MdModeEdit onClick={() => this.edit(order.sell_order_id)} ></MdModeEdit>} </td>
                           <td><MdDelete onClick={() => this.delete(order.sell_order_id)} ></MdDelete> </td> 
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