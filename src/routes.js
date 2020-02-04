import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/home/Home'
import Dashboard from './components/dashboard/Dashboard'
import Accounts from './components/accounts/Accounts'
import Transactions from './components/transactions/Transactions'
import Cards from './components/cards/Cards'
import Settings from './components/setting/Settings'
import Calculator from './components/calculator/Calculator'
import Form from './components/form/Form'
import SignIn from './components/signin/SignIn'
import OpenAccount from './components/openaccount/OpenAccount'


export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/dashboard' component={Dashboard} /> 
        <Route path='/accounts/:customer_id' component={Accounts} /> 
        <Route path='/transactions/:customer_id' component={Transactions} /> 
        <Route path='/cards' component={Cards} /> 
        <Route path='/settings' component={Settings} /> 
        <Route path='/calculator' component={Calculator} /> 
        <Route path='/form' component={Form} /> 
        <Route path='/signin' component={SignIn} /> 
        <Route path='/open/:customer_id' component={OpenAccount} /> 
    </Switch>
)