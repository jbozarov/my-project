import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components' 
import { connect } from 'react-redux'
import axios from 'axios'
import './MutualFunds.css'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


class MutualFunds extends Component {
    constructor(props){
        super(props); 

        this.state = {
            mutualfunds: [],
            buyClicked: true,
            ticker: '',
            price: '',
            qty: 0
        }
    }

    
   componentDidMount(){
      axios.get('https://financialmodelingprep.com/api/v3/symbol/available-mutual-funds')
      .then(res=>this.setState({mutualfunds: res.data.slice(0, 20)}))
   }
      
   handleChange = quantity => this.setState({qty: quantity })

    buy = (tick, price) => this.setState({buyClicked: !this.state.buyClicked, ticker: tick, price: price })
    add = () => {
       const { ticker, price, qty } = this.state 
       console.log(ticker, price, qty)
       axios.post('/api/add', {
          customer_order_id: this.props.user.customer_order_id,
          ticker, 
          qty, 
          price, 
          total: eval(price*qty)
       }).then(res => {
         toast.success(`${qty} of ${ticker} is added `);
       }).catch(err=>{
          toast.error('Something went wrong')
          console.log(err)
       })
       this.setState({buyClicked: false, ticker: '', price: '', qty: ''})
    }

    render() {
        const { mutualfunds, buyClicked, ticker } = this.state
        console.log(this.state)
        return (
            <div className='currencies' >
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

                <table className='mutual-table' >
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Market</th>
                    </tr>
                    {mutualfunds.length>1 && mutualfunds.map(fund =>
                        <tr key={fund.symbol} >
                            <td> {fund.symbol}</td>
                            <td> {fund.name} </td>
                            <td> {fund.stockExchange} </td>    
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

export default connect(mapStateToProps)(MutualFunds)