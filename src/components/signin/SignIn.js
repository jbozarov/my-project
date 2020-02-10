import React, { useState } from 'react'
import axios from 'axios'
import { userLogged } from '../../redux/reducers/userReducer'
import PasswordMask from 'react-password-mask';
import { connect } from 'react-redux'
import styled from 'styled-components'
import './Signin.css'


const SignIn = props => {
   const [login, setEmailInput] = useState('')
   const [password, setPassInput] = useState('')


    const signIn = () => {
        axios.post('/auth/signin', {login, password})
        .then(res => props.userLogged(res.data))
        .catch(err=>console.log(err))
        props.history.push('/') 
    }

      const goRegitsterPage = () => props.history.push('/form')
      return (
         <div className='sign-in'  >
               <h2>Please sign in </h2>
               <input placeholder=' Enter your email' value={login} onChange={e=>setEmailInput(e.target.value)} />
               <PasswordMask className='password' useVendorStyles={false} placeholder=' Enter your password' value={password} onChange={e=>setPassInput(e.target.value)}/>
               <LoginBTN onClick={signIn} >Sign in </LoginBTN>
               <p style={{color: '#3399ff', fontWeight: '600', fontStyle: 'italic'}} >Forgot password ?</p>
               <RegBTN onClick={goRegitsterPage} className='register-btn' >Register </RegBTN>
         </div>

      )
   }


function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {userLogged})(SignIn); 


//CSS IN JS
const LoginBTN = styled.button`
   height: 25px;
   width: 29vw;
   min-width: 120px;
   max-width: 240px;
   border: none;
   border-radius: 2px;
   background-color: #3399ff;
   font-size: large;
   &:hover {
      background-color: #3399ff;
      transform: scale(1.02);
   }
`; 

const RegBTN = styled.button`
   height: 25px;
   width: 29vw;
   min-width: 120px;
   max-width: 240px;
   border: none;
   border-radius: 2px;
   background-color: #d9d9d9;
   font-size: large;
   &:hover {
      background-color: #3399ff;
      transform: scale(1.02);
   }
`;

