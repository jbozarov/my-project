import React, { Component } from 'react'
import axios from 'axios';
import './Transactions.css'

export class Transactions extends Component {
    constructor(){
        super(); 

        this.state = {
            transactions: []
        }
    }

    componentDidMount(){
       console.log(this.props.match.params.account_number)
        this.getTransactions(); 
    }
    
    async getTransactions () {
        await axios.get(`/api/transactions/${this.props.match.params.account_number}`)
        .then(res=>this.setState({transactions: res.data}))
    }

    render() {
       const { transactions } = this.state
        return (
            <div className='transactions-class' >
                <table className='transactions-table'>
                <thead ><td colSpan='5'>Transactions  </td></thead>
                    <tr>
                        <th> Transaction ID </th>
                        <th> Amount</th>
                        <th> Description </th>
                        <th> Transaction date </th>
                    </tr>
                {transactions.map(transaction => 
                    <tr key={transaction.transaction_id} >
                        <td> {transaction.transaction_id} </td>
                        <td> {transaction.amount} </td>
                        <td> {transaction.description} </td>
                        <td> {transaction.transaction_date} </td>
                    </tr>
                )}      
                </table>
            </div>
        )
    }
}

export default Transactions
