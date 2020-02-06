import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Stocks from './Stocks'
import MutualFunds from './MutualFunds'




export default (
    <Switch>
        <Route exact path='/invest/stocks' component={Stocks} />
        <Route path='/invest/mutualfunds' component={MutualFunds} /> 
    </Switch>
)