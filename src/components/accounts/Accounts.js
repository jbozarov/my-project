import React, { Component } from 'react'
import axios from 'axios'
import './Accounts.css'

export class Accounts extends Component {
    constructor(){
        super(); 

        this.state = {
            accounts: []
        }
        this.getAccounts = this.getAccounts.bind(this); 
    }

    componentDidMount(){
        this.getAccounts(); 
    }

    async getAccounts () {
        await axios.get(`/api/accounts/${this.props.match.params.customer_id}`)
              .then(res=>this.setState({accounts: res.data}))
    }
    render() {
        return (
            <div>
                {this.state.accounts.map(account=>(
                    <div key={account.account_number}>
                        <p> {account.account_number} </p>
                        <p> {account.customer_id} </p>
                        <p> {account.account_type} </p>
                        <p> {account.balance} </p>
                    </div>
                ))}
            </div>
        )
    }
}

export default Accounts
