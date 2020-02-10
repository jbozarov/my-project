import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './Stocks.css'
import logo from './apple.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


export class Stocks extends Component {
    constructor(pro){
        super(); 

        this.state = {
            stocks: [],
            buyClicked: true,
            ticker: '',
            price: '',
            qty: 0
        }
    }

    
   componentDidMount(){
      axios.get('/api/stocks').then(res=>this.setState({stocks: res.data}))
   }
      
   handleChange = quantity => this.setState({qty: quantity })

    buy = (tick, price) => this.setState({buyClicked: !this.state.buyClicked, ticker: tick, price: price })
    add = () => {
       const { ticker, price, qty } = this.state 
       axios.post('/api/add', {
          customer_order_id: this.props.user.customer_order_id,
          ticker, 
          qty, 
          price, 
          total: eval(price*qty)
       }).then(res => {
         toast.success(`${qty} of ${ticker} is added `, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
       }).catch(err=>{
          toast.error('Something went wrong', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
          console.log(err)
       })
       this.setState({buyClicked: false, ticker: '', price: '', qty: ''})
    }

    render() {
       console.log('stocks line 34: ', this.props.user.customer_id)
        const { stocks, buyClicked, ticker } = this.state
        return (
            <div className='stocks' >
            <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl
               pauseOnVisibilityChange
               draggable
               pauseOnHover />

                <table className='stocks-table' >
                    <tr>
                        <th></th>
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>Exchange Market</th>
                    </tr>
                    {stocks.length>1 && stocks.map(stock =>
                        <tr key={stock.ticker} >
                            <td className='first'> <img src={logo} style={{width: '20px'}} /> </td>
                            <td> {stock.ticker} </td>
                            <td> {stock.name} </td>
                            <td> {stock.price} </td>
                            {buyClicked ? 
                              <td className='last-column'> {stock.exchange} <button onClick={()=>this.buy(stock.ticker, stock.price)} >Buy</button></td>
                              :
                              ticker===stock.ticker ? 
                              <td className='last-column'> {stock.exchange} 
                                    <input type='number' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleChange(e.target.value)} /> 
                                    <button onClick={()=>this.add()} >Add</button></td>
                              : 
                              <td className='last-column'> {stock.exchange} <button onClick={()=>this.buy(stock.ticker)} >Buy</button></td>
                           }     
                        </tr>)}
                </table>
            </div>
        )
    }
}

function mapStateToProps (state) {
   return {
      user: state.userReducer.user
   }
}

export default connect(mapStateToProps)(Stocks)
