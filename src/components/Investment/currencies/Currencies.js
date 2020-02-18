import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import axios from 'axios'
import './Currencies.css'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


class Currencies extends Component {
    constructor(props){
        super(props); 

        this.state = {
            currencies: [],
            buyClicked: true,
            ticker: '',
            price: '',
            qty: 0, 
            searchInput: props.searchInput, 
            isOrdersUpdated: ''
        }
    }

    
   componentDidMount(){
      axios.get('https://financialmodelingprep.com/api/v3/forex').then(res=>this.setState({currencies: res.data.forexList}))
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
        const { currencies, buyClicked, ticker } = this.state
        let filteredCurr; 
        if (this.props.searchInput.searchInput) {
         filteredCurr = currencies.filter(money => money.ticker.includes(this.props.searchInput.searchInput.toUpperCase()))
      } else {
         filteredCurr=currencies
      }
      console.log(filteredCurr)
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
                <table className='currencies-table' >
                    <tr>
                        <th>Pair</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th >Last updated</th>
                        <th >Buy</th>
                    </tr>
                    {filteredCurr.length>=1 && filteredCurr.map(money =>
                        <tr key={money.ticker} >
                            <td className='first'> {money.ticker}</td>
                            <td> {money.bid} </td>
                            <td style={{fontWeight: '900', color: money.changes>0 ? 'green' : 'red'}} >{parseFloat(money.changes).toFixed(3)}</td>
                            <td className='date-column'> {money.date.slice(0, 10)} </td>
                            {buyClicked ? 
                              <td className='last-cur-column' > {money.exchange} <button onClick={()=>this.buy(money.ticker, money.bid)} >Buy</button></td>
                              :
                              ticker===money.ticker ? 
                              <td className='last-cur-column' > {money.exchange} 
                                    <input type='number' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleChange(e.target.value)} /> 
                                    <button onClick={()=>this.add()} >Add</button></td>
                              : 
                              <td className='last-cur-column' > {money.exchange} <button onClick={()=>this.buy(money.ticker, money.bid)} >Buy</button></td>
                           }     
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

export default connect(mapStateToProps)(Currencies)