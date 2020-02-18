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
            indexes: [], 
            displayMenu: false
        }
    }

    componentDidMount(){
       this.getPrice(); 
    }


    showDropdownMenu = (event) => {
      event.preventDefault();
      this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
      });
    }
  
    hideDropdownMenu = () => {
      this.setState({ displayMenu: false }, () => {
        document.removeEventListener('click', this.hideDropdownMenu);
      });
  
    }


    async getPrice () {
         await axios.get('https://financialmodelingprep.com/api/v3/majors-indexes')
        .then(res=>this.setState({indexes: res.data.majorIndexesList}))
    }

    render() {
        return (
            <div className='invest' >
               <div className='desktop'>
                <nav className='invest-nav' >
                    <Link to='/invest/stocks' style={{textDecoration:'none', color:'black'}} > <p> Stocks </p> </Link> 
                    <Link to='/invest/mutualfunds' style={{textDecoration:'none', color:'black'}} > <p> Mutual Funds </p> </Link> 
                    <Link to='/invest/currencies' style={{textDecoration:'none', color:'black'}} > <p> Currencies </p> </Link> 
                    <Link to='/invest/crypto' style={{textDecoration:'none', color:'black'}} > <p> Cryptocurrencies </p> </Link> 
                    <Link to='/' style={{textDecoration:'none', color:'black'}} > <p> Gainers </p> </Link> 
                    <Link to='/' style={{textDecoration:'none', color:'black'}} > <p> Loosers </p> </Link> 
                    <Link to='/invest/cart' style={{textDecoration:'none', color:'black'}} > <p> <FiShoppingCart size={14} ></FiShoppingCart> </p> </Link> 
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
                  <div className='' style={{ marginRight: '10%'}} > <Buyorders /> </div>
                  {routes}
               </LowerTables>
               </div>

         <div className='mobile' >
            <div  className="invest-mobile" style = {{background:"grey",width:"200px"}} >
            <div className="button" onClick={this.showDropdownMenu}> Menu </div>
            { this.state.displayMenu ? 
            <ul>
            <Link to='/invest/buyorders' style={{textDecoration:'none', color:'black'}} > <li> Buy orders </li> </Link> 
            <Link to='/invest/stocks' style={{textDecoration:'none', color:'black'}} > <li> Stocks </li> </Link> 
            <Link to='/invest/mutualfunds' style={{textDecoration:'none', color:'black'}} > <li> Mutual Funds </li> </Link> 
            <Link to='/invest/currencies' style={{textDecoration:'none', color:'black'}} > <li> Currencies </li> </Link> 
            <Link to='/invest/crypto' style={{textDecoration:'none', color:'black'}} > <li> Cryptocurrencies </li> </Link> 
            <Link to='/' style={{textDecoration:'none', color:'black'}} > <li> Gainers </li> </Link> 
            <Link to='/' style={{textDecoration:'none', color:'black'}} > <li> Loosers </li> </Link> 
            <Link to='/invest/cart' style={{textDecoration:'none', color:'black'}} > <li> <FiShoppingCart size={15} ></FiShoppingCart> </li> </Link> 
            </ul> : null }
            </div>           
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
            {routes}
            </LowerTables>
         </div>
            </div>
        )
    }
}

export default Invest


const LowerTables = styled.div`
   width: 100%; 
   // margin: 0; 
   margin: 20px 0px 10px 10px;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: flex-start;
   // flex-wrap: wrap; 
`; 