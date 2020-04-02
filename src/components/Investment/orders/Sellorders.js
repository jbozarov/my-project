import React, { Component } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import axios from 'axios'
import './Sellorders.css'
import 'react-toastify/dist/ReactToastify.css'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import Modal from 'react-modal';
// toast.configure(); 

const customStyles = {
   content : {
      width: '250px', 
      height: '200px', 
      margin: 'auto',
      display: 'flex', 
      borderRadius: '10px',
      flexDirection: 'column',
      justifyContent: 'space-around'
    }
 };

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
            sell_order_id: '',
            modalIsOpen: false
         }
    }

    getSellOrders = () => axios.get(`/api/getsellorders/${this.props.user.customer_id}`).then(res=>this.setState({sellorders: res.data}))
   
    componentDidMount(){
       if (this.props.user.customer_id){
           this.getSellOrders(); 
       }
      
    }
    
   componentDidUpdate(prevProps){
      if (prevProps !== this.props) {
         this.getSellOrders(); 
      }
   }

   openModal = sell_order_id => {
      this.setState({modalIsOpen: true, sell_order_id: sell_order_id});
    }
   
    closeModal = () => {
       this.setState({modalIsOpen: false})
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
   delete = () => {
      this.closeModal()
      axios.delete(`/api/deletesellorder/${this.state.sell_order_id}`)
      .then(res => {
         this.getSellOrders(); 
         this.setState({sell_order_id: ''})
      })
      .catch(err => console.log(err))
   }

    render() {
       const { sellorders, sellOrderId, price } = this.state
       console.log(this.state)
        return (
            <div className='sellorders-comp-2' >
               <Modal
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}
               style={customStyles}
               contentLabel="Example Modal"
               >
               <div style={{display: 'flex', justifyContent: 'center', fontSize: '20px'}} >Do you want to delete? </div>
               <div style={{display: 'flex', justifyContent: 'space-between'}} >
                  <button className='logout-are-you-sure-buttons' onClick={this.closeModal}>Cencel</button>
                  <button className='logout-are-you-sure-buttons' onClick={this.delete}>Submit</button>
               </div>
               </Modal>
                <table className='sellorders-table1'>
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
                           <td><MdDelete onClick={() => this.openModal(order.sell_order_id)} ></MdDelete> </td> 
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