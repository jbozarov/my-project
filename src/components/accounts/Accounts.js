import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import visalogo from './visalogo.svg'
import axios from 'axios'
import './Accounts.css'

const Accounts = props => {
   const [accounts, setAccounts ] = useState([])

    useEffect(() => {
       getAccounts()
    }, [])

   const getAccounts = async() => {
      await axios.get(`/api/accounts/${props.match.params.customer_id}`)
            .then(res => setAccounts(res.data))
            .catch(err => console.log(err))
   }

        return (
            <div className='accounts' >
                {accounts.map(account=>(
                    <div className='box-1' key={account.account_number}>
                        <p className='type' > {account.account_type} </p>
                        <div className='box-2' >      
                        <div className='card' >
                            <p className='number' > {account.account_number} </p> 
                            <p> {account.first_name} {account.last_name} </p>
                            <img src={visalogo} style={{width: '40px'}} />
                        </div>
                        <div> 
                            <h4>Current Balance </h4>
                            <p className='balance' > {"$"}{account.balance} </p>
                            <Link to={`/transactions/${account.account_number}`} ><p> View Activity </p></Link>
                        </div> 
                            <p> Transfer Money </p>
                            <p> Bill Pay </p>
                            <p> Statements  </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }


export default withRouter(Accounts)
