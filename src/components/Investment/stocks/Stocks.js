import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components' 
import { connect } from 'react-redux'
import { buyUpdate } from '../../../redux/reducers/ordersReducers'
import axios from 'axios'
import './Stocks.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


export class Stocks extends Component {
    constructor(props){
        super(props); 

        this.state = {
            stocks: [],
            searchInput: props.searchInput, 
            orderType: '', 
            ticker: '',
            price: '',
            qty: 0, 
            wantedPrice: 0
        }
    }

    
   componentDidMount(){
      axios.get('/api/stocks').then(res=>this.setState({stocks: res.data}))
   }

      
   handleQty = quantity => this.setState({qty: quantity })
   handlePrice = wantedPrice => this.setState({wantedPrice: wantedPrice })

   changeOrderType = (e, t, p) => this.setState({orderType: e.target.value, ticker: t, price: p})

    submit = () => {
       const { orderType, ticker, price, qty, wantedPrice } = this.state
       if (!this.props.user.customer_order_id) return alert('Please sign in')
       else if ( !qty ) return alert(' Please enter QUANTITY ')
       else {
            if (orderType === 'market') {
                  axios.post('/api/add', {
                     customer_order_id: this.props.user.customer_order_id,
                     ticker, 
                     qty, 
                     price, 
                     total: eval(price*qty)
                  }).then(res => {
                     toast.success(` ${qty} of ${ticker} is added `);
                  }).catch(err=>{
                     toast.error('Something went wrong')
                     console.log(err)
                     })
                  this.setState({orderType: '', ticker: '', price: '', qty: '', wantedPrice: ''})
            } else {
                  axios.post('/api/addbuyorders', {
                     customer_id: this.props.user.customer_id,
                     orderType,
                     ticker, 
                     qty, 
                     wantedPrice,
                  }).then(res => {
                     this.props.buyUpdate(true)
                     toast.success(`  `);
                  }).catch(err=>{
                     toast.error('could not add to orders ')
                     console.log(err)
                     })
                  
                  this.setState({orderType: '', ticker: '', price: '', qty: '', wantedPrice: ''})
            }
       }
    }

    render() {
       console.log(this.state, this.props.user)
       const { stocks } = this.state
       let filteredStocks;
       if (this.props.searchInput.searchInput) {
          filteredStocks = stocks.filter(stock => stock.ticker.includes(this.props.searchInput.searchInput.toUpperCase()))
       } else {
          filteredStocks=stocks
       }
       
        return (
            <div className='stocks' >
            <ToastContainer
               position="top-right"
               autoClose={800}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl
               pauseOnVisibilityChange
               draggable
               pauseOnHover />

                <table className='stocks-table' >
                  <thead ><tr><td colSpan='8'>Stocks</td> </tr></thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>Market</th>
                        <th>Orders</th>
                        <th>Quantity</th>
                        <th>Wanted price</th>
                        <th>Submit</th>
                    </tr>
                    {filteredStocks.length>=1 && filteredStocks.map(stock =>
                        <tr key={stock.ticker} >
                            <td> {stock.ticker} </td>
                            <td> <Link to={`/invest/history/${stock.ticker}`} style={{textDecoration:'none', color:'blue'}}>{stock.name}</Link> </td>
                            <td> {stock.price} </td>
                            <td> {stock.exchange}</td>
                           
                           <td> 
                              <select onChange={e => this.changeOrderType(e, stock.ticker, stock.price )} >
                                 <option >select </option>
                                 <option value='market' >Market </option>
                                 <option value='limit' >Limit </option>
                                 <option value='stop limit'>Stop limit</option>
                              </select> 
                           </td> 
                           <td> <input type='number' min='0' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleQty(e.target.value)} /></td> 
                           <td> <input type='number' min='0' placeholder='Price' style={{width: '60px'}} onChange={e=>this.handlePrice(e.target.value)} /></td> 
                           <td> <button disabled={ stock.ticker !== this.state.ticker } onClick={()=>this.submit()} > Submit </button> </td>  
                        </tr>)} 
                </table>
            </div>
        )
    }
}

function mapStateToProps (state) {
   return {
      user: state.userReducer.user, 
      searchInput: state.searchInput
   }
}

export default connect(mapStateToProps, { buyUpdate })(Stocks)






// {buyClicked ? 
//    <td className='last-column'> {stock.exchange} <button onClick={()=>this.buy(stock.ticker, stock.price)} >Buy</button></td>
//    :
//    ticker===stock.ticker ? 
//    <td className='last-column'> {stock.exchange} 
//          <input type='number' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleChange(e.target.value)} /> 
//          <button onClick={()=>this.add()} >Add</button></td>
//    : 
//    <td className='last-column'> {stock.exchange} <button onClick={()=>this.buy(stock.ticker)} >Buy </button></td>
// } 