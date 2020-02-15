import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import './Invest.css'
import routes from './routes'
import axios from 'axios';
import Buyorders from '../orders/Buyorder'
import styled from 'styled-components'

export class Invest extends Component {

    constructor (){
        super(); 

        this.state = {
            indexes: []
        }
    }

    componentDidMount(){
       this.getPrice(); 
    }

    async getPrice () {
         await axios.get('https://financialmodelingprep.com/api/v3/majors-indexes')
        .then(res=>this.setState({indexes: res.data.majorIndexesList}))
    }

    render() {
        console.log(this.state.indexes)
        return (
            <div className='invest' >
                <nav className='invest-nav' >
                    <Link to='/invest/stocks' style={{textDecoration:'none', color:'black'}} > <p> Stocks </p> </Link> 
                    <Link to='/invest/mutualfunds' style={{textDecoration:'none', color:'black'}} > <p> Mutual Funds </p> </Link> 
                    <Link to='/invest/currencies' style={{textDecoration:'none', color:'black'}} > <p> Currencies </p> </Link> 
                    <Link to='/invest/crypto' style={{textDecoration:'none', color:'black'}} > <p> Cryptocurrencies </p> </Link> 
                    <Link to='/invest/cart' style={{textDecoration:'none', color:'black'}} > <p> <FiShoppingCart size={15} ></FiShoppingCart> </p> </Link> 
                </nav>
               <div className='major-indexes-box-1'>
                  {this.state.indexes.map(ind=>
                  <div key={ind.indexName} className='major-indexes-box-2' >
                      <p style={{fontWeight: '700'}} > {ind.indexName} </p>
                      <div>
                           <p> {ind.price} </p><p style={{fontSize: '9px', paddingTop: '2px'}} className={ind.changes >0 ? 'green' : 'red'} > {ind.changes} </p>
                      </div>
                  </div>)}
                  </div> 
               <LowerTables>
                  <div style={{ marginRight: '10%' }} > <Buyorders /> </div>
                  {routes}
               </LowerTables>
            </div>
        )
    }
}

export default Invest


const LowerTables = styled.div`
   width: 90%; 
   // margin: auto; 
   margin: 30px auto auto 30px;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: flex-start;
`; 