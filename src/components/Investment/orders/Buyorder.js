import React, { Component } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import axios from 'axios'
import './Orders.css'
import 'react-toastify/dist/ReactToastify.css'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import Modal from 'react-modal';
// toast.configure(); 


const customStyles = {
   content : {
     width: '150px', 
     height: '150px', 
     margin: 'auto',
     display: 'flex', 
     flexDirection: 'column',
     justifyContent: 'space-around'
   }
 };

class Buyorders extends Component {
    constructor(props){
        super(props); 

        this.state = {
            buyorders: [],
            buyClicked: true,
            isUpdated: this.props.isUpdated,
            buyOrderId: '', 
            type: 'limit',
            price: '',
            modalIsOpen: false, 
            buy_order_id: ''
         }
    }

    getBuyOrders = () => axios.get(`/api/getbuyorders/${this.props.user.customer_id}`).then(res=>this.setState({buyorders: res.data}))
   
    componentDidMount(){
       if (this.props.user.customer_id){
          this.getBuyOrders(); 
       }
    }
    
   componentDidUpdate(prevProps){
      if (prevProps !== this.props) {
         this.getBuyOrders(); 
      }
   }


   openModal = buy_order_id => {
      this.setState({modalIsOpen: true, buy_order_id: buy_order_id});
    }
   
    closeModal = () => {
       this.setState({modalIsOpen: false})
    }

   edit = buy_order_id => this.setState({buyOrderId: buy_order_id})
   handleSelect = e => this.setState({type: e.target.value})
   handleChange = e => this.setState({[e.name]: e.value})

   submit = () => {
      const {buyOrderId, type, price} = this.state
      axios.put('/api/editbuyorder', {buyOrderId, type, price})
      .then(res => {
         this.getBuyOrders()
         this.setState({buyOrderId: '', type: 'limit', price: ''})
      })
      .catch(err => console.log(err))
   }
   delete = () => {
      this.closeModal()
      axios.delete(`/api/deletebuyorder/${this.state.buy_order_id}`)
      .then(res => {
         this.getBuyOrders(); 
         this.setState({buy_order_id: ''})
      })
      .catch(err => console.log(err))
   }

    render() {
       const { buyOrderId, price } = this.state
       console.log(this.props.user)
        return (
            <div className='buyorders-box' style={{marginRight: '40px'}} >
               <Modal
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}
               style={customStyles}
               contentLabel="Example Modal"
               >
               <div style={{display: 'flex', justifyContent: 'center'}} >Do want you to delete? </div>
               <div style={{display: 'flex', justifyContent: 'space-between'}} >
                  <button onClick={this.closeModal}>Cencel</button>
                  <button onClick={this.delete}>Submit</button>
               </div>
               </Modal>
                <table className='buyorders-table'>
                <thead><td colSpan='6'>Buy orders</td></thead>
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
                           <td> {order.qty} </td>  
                           <td> {buyOrderId === order.buy_order_id ? <input style={{width: '30px'}} name='price' value={price} onChange={e => this.handleChange(e.target)} /> : order.wanted_price} </td> 
                           <td> {buyOrderId === order.buy_order_id ? <button onClick={() => this.submit()} >Submit </button> : <MdModeEdit onClick={() => this.edit(order.buy_order_id)} ></MdModeEdit>} </td>
                           <td><MdDelete onClick={() => this.openModal(order.buy_order_id)} ></MdDelete> </td> 
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
      isUpdated: state.ordersReducers.isUpdated
   }
}

export default connect(mapStateToProps)(Buyorders)

