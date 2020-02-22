import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Companies.css'


const Losers = () =>  {
   const [losers, setLosers] = useState([])

   useEffect( () => {
      getLosers()
   }, [])
   
   const getLosers = () => axios.get('https://financialmodelingprep.com/api/v3/stock/losers').then(res=>setLosers(res.data.mostLoserStock))

      return (
               <table className='companies-table' >
                  <tr>
                     <th>Ticker</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Change</th>
                     <th >Change in %</th>
                  </tr>
                  {losers.length >=1 && losers.map(loser =>
                     <tr key={loser.ticker} >
                           <td> {loser.ticker} </td>
                           <td> {loser.companyName} </td>
                           <td> {loser.price} </td>
                           <td style={{color: 'red', fontWeight: '600'}} > {loser.changes} </td>
                           <td style={{color: 'red', fontWeight: '600'}} > {loser.changesPercentage} </td>
                     </tr>)}
               </table>

      )
   }

export default Losers