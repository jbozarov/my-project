import React, { Component } from 'react'
import './Openaccount.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { createNewAcc } from '../../redux/reducers/accReducer'

export class OpenAccount extends Component {
    constructor () {
        super (); 

        this.state = {
            account_number: '',
            customer_id: '',
            account_type: 'checking',
            balance: ''
        }
        this.submitOpenAccount = this.submitOpenAccount.bind(this)
    }

    componentDidMount(){
        let newAccNumber = [...Array(10)].map(i=>(~~(Math.random()*10)).toString()).join('')
      //   let newAccNumber = '4242424242424242'
        this.setState({account_number: newAccNumber, customer_id: this.props.match.params.customer_id})

    }

    deposit = e => this.setState({balance: e.target.value})



    async submitOpenAccount () {
        const { account_number, customer_id, account_type, balance } = this.state
        console.log(this.state)
        let newAccount = await axios.post('/api/account', {account_number, customer_id, account_type, balance}).then(res=>res.data); 
        this.props.createNewAcc(newAccount)
        this.props.history.push('/dashboard')
        
    }
    dropdown = e => this.setState({account_type: e.target.value});
    render() {
        console.log(this.props.match.params.customer_id)
        return (
            <div className='open-account' >
                <p>Account opening form </p>
                <p>Choose account type: <select onChange={e=>this.dropdown(e)} >
                    <option value='checking'>checking</option>
                    <option value='saving' >saving</option>
                    <option value='credit_card'>credit card</option>
                </select></p>
                <p>Deposit amount <input type='number' onChange={e => this.deposit(e)} /></p>
                <button onClick={this.submitOpenAccount} >Submit</button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        account: state.account
    }
}

export default connect(mapStateToProps, { createNewAcc })(OpenAccount); 
