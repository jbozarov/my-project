import React from 'react'
import './Help.css'
import { Link, withRouter } from 'react-router-dom'; 

export default function Help() {
   return (
      <div>
         <h3>Call us at 1-800-123-4567</h3>
         <h3>Email us customerservice@bankname.com</h3>
         <Link to='/schedule' style={{textDecoration: 'none', color: 'black'}} > <h3>Schedule an appointment</h3> </Link>
         
      </div>
   )
}
