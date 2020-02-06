import React, { Component } from 'react'
import axios from 'axios'


export class Stocks extends Component {
    constructor(){
        super(); 

        this.state = {
            stocks: []
        }
    }

    componentDidMount(){
        axios.get('https://financialmodelingprep.com/api/v3/company/stock/list/').then(res=>this.setState({stocks: res.data}))
    }

    render() {
        const { symbolsList } = this.state.stocks
        console.log(this.state.stocks.symbolsList)
        return (
            <div>
               {/* {stocks.map(stock => (
                    <div key={stock.symbol} >
                        <p> {stock.symbol} </p>
                        <p> {stock.name} </p>
                        <p> {stock.currency} </p>
                        <p> {stock.stockExchange} </p>
                        <p> {stock.exchangeShortName} </p>
                    </div>
               ))} */}
            </div>
        )
    }
}

export default Stocks
