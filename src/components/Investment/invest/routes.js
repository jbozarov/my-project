import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Stocks from '../stocks/Stocks'
import Cart from '../cart/Cart'
import History from '../history/History'
import Currencies from '../currencies/Currencies'
import Crypto from '../crypto/Crypto'
import MutualFuncs from '../muturalFunds/MutualFuncs'
import Buyorder from '../orders/Buyorder'
import Gainers from '../companies/Gainers'
import Losers from '../companies/Losers'




export default (
    <Switch>
        <Route exact path='/invest/stocks' component={Stocks} />
        <Route path='/invest/cart' component={Cart} />
        <Route path='/invest/history/:ticker' component={History} /> 
        <Route path='/invest/currencies' component={Currencies} />
        <Route path='/invest/crypto' component={Crypto} />
        <Route path='/invest/mutualfunds' component={MutualFuncs} />
        <Route path='/invest/buyorders' component={Buyorder} />
        <Route path='/invest/gainers' component={Gainers} />
        <Route path='/invest/losers' component={Losers} />
    </Switch>
)