import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Invest.css'
import routes from './routes'
import axios from 'axios';

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
                    <Link style={{textDecoration:'none', color:'black'}} > <p> Currencies </p> </Link> 
                    <Link style={{textDecoration:'none', color:'black'}} > <p> Cryptocurrencies </p> </Link> 
                    <Link style={{textDecoration:'none', color:'black'}} > <p> Commodities </p> </Link> 
                    <Link style={{textDecoration:'none', color:'black'}} > <p> Real Estate </p> </Link> 
                </nav>
                <div className='major-indexes-box-1'>
                   {    this.state.indexes.map(ind=>
                        <div key={ind.indexName} className='major-indexes-box-2' >
                        <h3> {ind.indexName} </h3>
                        <div>
                        <p> {ind.price} </p>
                        <p className={ind.changes >0 ? 'green' : 'red'} > {ind.changes} </p>
                        </div>
                        </div>)
                    }
                </div>
            </div>
        )
    }
}

export default Invest
