import React from 'react'
import { Link } from 'react-router-dom'; 
import styled from 'styled-components'

export default function Help() {
   return (
      <HelpDiv>
         <h3>Call us at 1-800-123-4567</h3>
         <h3>Email us customerservice@bankname.com</h3>
         <Link to='/schedule' style={{textDecoration: 'none', color: 'black'}} > <h3>Schedule an appointment</h3> </Link>
      </HelpDiv>
   )
}


const HelpDiv = styled.div`
   height: 100vh; 
   width: 100%; 
   padding: 50px 100px; 
   margin: auto; 
   background: linear-gradient(90deg, #EF3B36 0%, #FFFFFF 100%);
   color: blue; 
`; 