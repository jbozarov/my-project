import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components' 
import { connect } from 'react-redux'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


class crpto extends Component {
    constructor(props){
        super(props); 

        this.state = {
            crpto: [],
            buyClicked: true,
            ticker: '',
            price: '',
            qty: 0
        }
    }

    
   componentDidMount(){
      this.getCryptocurrencies(); 
   }
   
   getCryptocurrencies = () => {
      axios.get('https://financialmodelingprep.com/api/v3/cryptocurrencies').then(res=>this.setState({crpto: res.data.cryptocurrenciesList}))
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
         toast.success(`${qty} of ${ticker} is added `);
       }).catch(err=>{
          toast.error('Something went wrong')
          console.log(err)
       })
       this.setState({buyClicked: false, ticker: '', price: '', qty: ''})
    }

    render() {
        const { crpto, buyClicked, ticker } = this.state
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

                <table className='stocks-table3' >
                <thead ><td colSpan='8' style={{paddingLeft: '10px'}} >Cryptocurrencies</td></thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th >MarketCapitalization</th>
                    </tr>
                    {crpto.length>1 && crpto.map(crpt =>
                        <tr key={crpt.ticker} >
                            <td className='first'> {crpt.ticker}</td>
                            <td> {crpt.name} </td>
                            <td> {crpt.price} </td>
                            <td className='date-column' style={{fontWeight: '900', color: crpt.changes>0 ? 'green' : 'red'}} > {crpt.changes} </td>
                            {buyClicked ? 
                              <td className='last-cur-column' > {crpt.marketCapitalization} <button onClick={()=>this.buy(crpt.ticker, crpt.price)} style
                              ={{borderRadius: '5px', backgroundColor: 'white'}} >Buy</button></td>
                              :
                              ticker===crpt.ticker ? 
                              <td className='last-cur-column' > {crpt.marketCapitalization} 
                                    <input type='number' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleChange(e.target.value)} /> 
                                    <button onClick={()=>this.add()} >Add</button></td>
                              : 
                              <td className='last-cur-column' > {crpt.marketCapitalization} <button onClick={()=>this.buy(crpt.ticker, crpt.price)} style
                              ={{borderRadius: '51px'}} >Buy</button></td>
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

export default connect(mapStateToProps)(crpto)