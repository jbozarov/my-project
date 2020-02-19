import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { sellUpdate } from '../../redux/reducers/ordersReducers'
import axios from 'axios'
import './Dashboard.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 


export class DashInvestments extends Component {
    constructor(props){
        super(props); 

        this.state = {
            currTicker: '',
            stocks: [],
            buyClicked: false,
            searchInput: props.searchInput, 
            orderType: 'select', 
            ticker: '',
            price: '',
            qty: 0, 
            wantedPrice: 0,
            s: false,

            realStock: {},
            investments: [],

        }
    }

    
   componentDidMount(){
      this.getInvestments();
   }

   getInvestments = async () => {
      await axios
        .get(`/api/investments/${this.props.user.customer_id}`)
        .then(res => this.setState({investments: res.data}))
        .catch(err => console.log(err));
    };

    getMarketPrice = ticker => {
      axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${ticker}`)
      .then(res => {
         this.setState({realStock: res.data})
      })
   }

   check = (t) => {
      if (t!==this.state.currTicker) {
         this.setState({
         [`${this.state.currTicker}qty`]: '', 
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

   changeOrderType = (e, t, p, id, q) => {
      this.check(t)
      this.setState({[`${t}orderType`]: e.target.value, ticker: t, price: p, orderType: e.target.value, investment_id: id, qty: q})
   }

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

    submit = () => {
       console.log('submit 98  ', this.state)
       const { orderType, realStock, ticker, price, qty, wantedPrice, investment_id } = this.state
       if (!this.props.user.customer_order_id) return alert('Please sign in')
       else if ( !qty ) return alert(' Please enter QUANTITY ')
       else {
            if (orderType === 'market') {
                  let body; 
                  if (realStock.symbol === ticker) {
                     body = {
                        price: realStock.price, 
                        qty: qty, 
                        total: eval(qty*realStock.price).toFixed(2)
                     }
                  
                  axios.delete(`/api/deleteinvestment/${investment_id}`)
                  .then(res => {
                     toast.success(`You sold it`);
                  }).catch(err=>{
                     toast.error('Did not sell')
                     console.log(err)
                     })
                  axios.post('/api/addselltransaction', {...body})
                  .then(res => {
                     this.props.getTransactions(); 
                     this.getInvestments()
                     toast.success(`Transaction update`);
                  }).catch(err=>{
                     toast.error('transaction update fail ')
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
                  })}
            } else if (orderType === 'limit' || orderType === 'stop limit') {
                  let body = {
                     customer_id: this.props.user.customer_id,
                     orderType,
                     ticker, 
                     qty, 
                     wantedPrice,
                  }
                  console.log('line 147 ', body)
                  axios.post('/api/addsellorders', {
                     ...body
                  }).then(res => {
                     console.log(this.state.v)
                     this.props.sellUpdate(this.state.s)
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
                     s: !this.state.s
                  })
            }
       }
    }

    render() {
       const {investments, realStock } = this.state
       console.log(this.state)
       let total = investments.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.purchased_price), 0)
       
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

               <table className='investments-table' >
               <thead ><td colSpan='8'>Investments</td></thead>
                  <tr>
                     <th>Ticker</th>
                     <th>Quantity</th>
                     <th>Purchased price</th>
                     <th>Real Price</th>
                     <th>Orders</th>
                     <th>Wanted price</th>
                     <th>Submit</th>
                  </tr>
                  {investments.length>=1 && investments.map(item =>
                     <tr key={item.investment_id} >
                           <td> {item.ticker} </td>
                           <td> {item.qty} </td>
                           <td> {item.purchased_price}</td>
                           {realStock.symbol === item.ticker ? 
                              <td style={{cursor: 'pointer', color: item.purchased_price > realStock.price ? 'red' : 'green', fontWeight: '800'}} onClick={() => this.getMarketPrice(item.ticker)} > {realStock.price} </td>
                              : 
                              <td style={{cursor: 'pointer'}} onClick={() => this.getMarketPrice(item.ticker)} > View market price </td>
                           }
                        <td> 
                           <select value={this.state[`${item.ticker}orderType`]} onChange={e => this.changeOrderType(e, item.ticker, item.price, item.investment_id, item.qty )} >
                              <option defaultValue >select</option>
                              <option value='market' >Market </option>
                              <option value='limit' >Limit </option>
                              <option value='stop limit'>Stop limit</option>
                           </select> 
                        </td> 
                        <td> <input value={this.state[`${item.ticker}wantedPrice`]} type='number' min='0' placeholder='Price' style={{width: '60px'}} onChange={e=>this.handlePrice(item.ticker, e.target.value)} /></td> 
                        <td> <button disabled={ item.ticker !== this.state.ticker } onClick={()=>this.submit()} > Submit </button> </td>  
                     </tr>)} 
                     <tfoot><tr><td colSpan="7"> You invested ${total.toFixed(2)} </td></tr></tfoot>
               </table>
            </div>
        )
    }
}

function mapStateToProps (state) {
   return {
      user: state.userReducer.user, 
   }
}

export default connect(mapStateToProps, { sellUpdate })(DashInvestments)