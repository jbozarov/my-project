import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Stocks from './stocks/Stocks'
import Cart from './cart/Cart'




export default (
    <Switch>
        <Route exact path='/invest/stocks' component={Stocks} />
        <Route path='/invest/cart' component={Cart} />
    </Switch>
)