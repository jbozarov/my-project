import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Companies.css'


const Gainers = () =>  {
   const [gainers, setGainers] = useState([])

   useEffect( () => {
      getGainers()
   }, [])
   
   const getGainers = () => axios.get('https://financialmodelingprep.com/api/v3/stock/gainers').then(res=>setGainers(res.data.mostGainerStock))

      return (
               <table className='companies-table' >
                  <tr>
                     <th>Ticker</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Change</th>
                     <th >Change in %</th>
                  </tr>
                  {gainers.length >=1 && gainers.map(gainer =>
                     <tr key={gainer.ticker} >
                           <td> {gainer.ticker} </td>
                           <td> {gainer.companyName} </td>
                           <td> {gainer.price} </td>
                           <td style={{color: 'green', fontWeight: '600'}} > {gainer.changes} </td>
                           <td style={{color: 'green', fontWeight: '600'}} > {gainer.changesPercentage} </td>
                     </tr>)}
               </table>

      )
   }

export default Gainers