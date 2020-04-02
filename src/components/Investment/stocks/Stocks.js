import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { buyUpdate } from '../../../redux/reducers/ordersReducers'
import { hidebuyorder } from '../../../redux/reducers/showhideReducer'
import axios from 'axios'
import './Stocks.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


export class Stocks extends Component {
    constructor(props){
        super(props); 

        this.state = {
            currTicker: '',
            stocks: [],
            buyClicked: false,
            searchInput: props.searchInput, 
            orderType: 'select', 
            ticker: '',
            symbol: '',
            price: '',
            qty: 0, 
            wantedPrice: 0,
            v: false,
            showhidetoggle: false,
            euronextStocks: [],
        }
    }

    
   componentDidMount(){
      axios.get('/api/stocks').then(res=>this.setState({stocks: res.data}))
      axios.get('https://financialmodelingprep.com/api/v3/quotes/euronext').then(res=>this.setState({euronextStocks: res.data.slice(0, 50)}))
   }

   check = (t) => {
      if (t!==this.state.currTicker) {
         this.setState({[`${this.state.currTicker}qty`]: '', 
         [`${this.state.currTicker}wantedPrice`]: '',
         [`${this.state.currTicker}orderType`]: '',
         currTicker: t
      })
      }
   }
      
   handleQty = (t, quantity) => {
      this.check(t)
      this.setState({[`${t}qty`]: quantity, qty: quantity })
   }
   handlePrice = (t, wantedPrice) => {
      this.check(t)
      this.setState({[`${t}wantedPrice`]: wantedPrice, wantedPrice: wantedPrice })
   }

   changeOrderType = (e, t, p) => {
      this.check(t)
      this.setState({[`${t}orderType`]: e.target.value, ticker: t, price: p, orderType: e.target.value})
   }
   changeOrderTypeEuro = (e, t, p) => {
      this.check(t)
      this.setState({[`${t}orderType`]: e.target.value, symbol: t, price: p, orderType: e.target.value})
   }

   handleChange = quantity => this.setState({qty: quantity })
   buy = (tick, price) => this.setState({buyClicked: !this.state.buyClicked, ticker: tick, price: price })

   hidebuyorders = () => {
      const { showhidetoggle } = this.state; 
      this.props.hidebuyorder(showhidetoggle)
      this.setState({showhidetoggle: !this.state.showhidetoggle})
   }
   
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

    submit = () => {
       console.log('stocks 81 ', this.state)
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
                     toast.success(`You added ${qty} of ${ticker} stocks`);
                  }).catch(err=>{
                     toast.error('Something went wrong')
                     console.log(err)
                     })
                  this.setState({
                     orderType: 'select', 
                     ticker: '', 
                     price: '', 
                     qty: '', 
                     wantedPrice: '', 
                     [`${this.state.currTicker}qty`]: '', 
                     [`${this.state.currTicker}wantedPrice`]: '',
                     [`${this.state.currTicker}orderType`]: '',
                     currTicker: ''
                  })
            } else if (orderType === 'limit' || orderType === 'stop limit') {
                  let body = {
                     customer_id: this.props.user.customer_id,
                     orderType,
                     ticker, 
                     qty, 
                     wantedPrice,
                  }
                  axios.post('/api/addbuyorders', {
                     ...body
                  }).then(res => {
                     this.props.buyUpdate(this.state.v)
                     toast.success('Added to buy orders');
                  }).catch(err=>{
                     toast.error('could not add to orders ')
                     console.log(err)
                     })
                  this.setState({
                     orderType: 'select', 
                     ticker: '', 
                     price: '', 
                     qty: '', 
                     wantedPrice: '', 
                     [`${this.state.currTicker}qty`]: '', 
                     [`${this.state.currTicker}wantedPrice`]: '',
                     [`${this.state.currTicker}orderType`]: '',
                     currTicker: '', 
                     v: !this.state.v
                  })
            }
       }
    }

    render() {
       const { stocks, buyClicked, ticker, euronextStocks } = this.state
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
               autoClose={1200}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl
               pauseOnVisibilityChange
               draggable
               pauseOnHover/>

               <div className='desktop' >



               <div className="two-tables" >
                <table className='stocks-table3' >
                  <thead ><td colSpan='9' style={{paddingLeft: '10px'}} >Stocks</td></thead>
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
                            <td> <Link to={`/invest/history/${stock.ticker}`} onClick={()=>this.hidebuyorders()}  style={{textDecoration:'none', color:'blue'}}>{stock.name}</Link> </td>
                            <td> {stock.price} </td>
                            <td> {stock.exchange}</td>
                           <td> 
                              <select value={this.state[`${stock.ticker}orderType`]} onChange={e => this.changeOrderType(e, stock.ticker, stock.price )} >
                                 <option defaultValue >select</option>
                                 <option value='market' >Market </option>
                                 <option value='limit' >Limit </option>
                                 <option value='stop limit'>Stop limit</option>
                              </select> 
                           </td> 
                           <td> <input value={this.state[`${stock.ticker}qty`]} type='number' min='0' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleQty(stock.ticker, e.target.value)} /></td> 
                           <td> <input value={this.state[`${stock.ticker}wantedPrice`]} type='number' min='0' placeholder='Price' style={{width: '60px'}} onChange={e=>this.handlePrice(stock.ticker, e.target.value)} /></td> 
                           <td> <button disabled={ stock.ticker !== this.state.ticker } onClick={()=>this.submit()} > Submit </button> </td>  
                        </tr>)} 
                </table>
                <table className='stocks-table3' >
                  <thead ><td colSpan='8' style={{paddingLeft: '10px'}} >EURONEXT Stocks</td></thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>Market</th>
                        <th>Orders</th>
                        <th>Quantity</th>
                        <th>Wanted price</th>
                        <th>Submit</th>
                    </tr>
                    {euronextStocks.length>=1 && euronextStocks.map(stock =>
                        <tr key={stock.symbol} >
                            <td> {stock.symbol} </td>
                            <td> <Link to={`/invest/history/${stock.ticker}`} onClick={()=>this.hidebuyorders()}  style={{textDecoration:'none', color:'blue'}}>{stock.name}</Link> </td>
                            <td> {stock.price} </td>
                            <td> {stock.exhange}</td>
                           <td> 
                              <select value={this.state[`${stock.symbol}orderType`]} onChange={e => this.changeOrderTypeEuro(e, stock.symbol, stock.price )} >
                                 <option defaultValue >select</option>
                                 <option value='market' >Market </option>
                                 <option value='limit' >Limit </option>
                                 <option value='stop limit'>Stop limit</option>
                              </select> 
                           </td> 
                           <td> <input value={this.state[`${stock.symbol}qty`]} type='number' min='0' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleQty(stock.symbol, e.target.value)} /></td> 
                           <td> <input value={this.state[`${stock.symbol}wantedPrice`]} type='number' min='0' placeholder='Price' style={{width: '60px'}} onChange={e=>this.handlePrice(stock.symbol, e.target.value)} /></td> 
                           <td> <button disabled={ stock.symbol !== this.state.symbol } onClick={()=>this.submit()} > Submit </button> </td>  
                        </tr>)} 
                </table>
                </div>
                </div>

               <div className='mobile' >
                <table className='stocks-table3' >
                  <thead ><tr><td colSpan='9'>Stocks</td> </tr></thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>Buy</th>
                    </tr>
                    {filteredStocks.length>=1 && filteredStocks.map(stock =>
                        <tr key={stock.ticker} >
                            <td> {stock.ticker} </td>
                            <td> <Link to={`/invest/history/${stock.ticker}`} style={{textDecoration:'none', color:'blue'}}>{stock.name}</Link> </td>
                            <td> {stock.price} </td>
                             {buyClicked ? 
                                 <td className='last-column'> {stock.exchange} <button onClick={()=>this.buy(stock.ticker, stock.price)} >Buy</button></td>
                                 :
                                 ticker===stock.ticker ? 
                                 <td className='last-column'> {stock.exchange} 
                                       <input type='number' placeholder='Quantity' style={{width: '60px'}} onChange={e=>this.handleChange(e.target.value)} /> 
                                       <button onClick={()=>this.add()} >Add</button></td>
                                 : 
                                 <td className='last-column'> {stock.exchange} <button onClick={()=>this.buy(stock.ticker)} >Buy </button></td>
                              } 
                        </tr>)} 
                </table>
                </div>
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

export default connect(mapStateToProps, { buyUpdate, hidebuyorder })(Stocks)