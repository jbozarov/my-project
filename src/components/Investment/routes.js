import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Stocks from './stocks/Stocks'
import Cart from './cart/Cart'
import History from './history/History'
import Currencies from './currencies/Currencies'




export default (
    <Switch>
        <Route exact path='/invest/stocks' component={Stocks} />
        <Route path='/invest/cart' component={Cart} />
        <Route path='/invest/history/:ticker' component={History} /> 
        <Route path='/invest/currencies' component={Currencies} />
    </Switch>
)