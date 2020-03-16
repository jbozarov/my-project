import React, { useState } from 'react'
import axios from 'axios'
import { userLogged } from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import styled from 'styled-components'
import './Signin.css'
import { FaEye } from 'react-icons/fa'


const SignIn = props => {
   const [email, setEmailInput] = useState('')
   const [password, setPassInput] = useState('')
   const [isPassword, setIsPassword] = useState(true)


    const signIn = () => {
        axios.post('/auth/signin', {email, password})
        .then(res => {
             props.userLogged(res.data)
            //  props.history.push(`/invest/${props.user.customer_id}`) 
             props.history.push(`/dashboard/${props.user.customer_id}`) 
         })
        .catch(err=>console.log(err))   
    }

      const goRegitsterPage = () => props.history.push('/form')
      return (
         <div className='sign-in'
         style={{backgroundImage: "url("+"https://static.vecteezy.com/system/resources/previews/000/683/043/large_2x/stock-market-or-forex-trading-graph.jpg"+")", 
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'}}>
               <h2>Please Sign in</h2>
               <input placeholder=' Enter your email' value={email} onChange={e=>setEmailInput(e.target.value)} />
               <div className='input-div' > <input type={isPassword ? 'password' : 'text'} 
                    className='input'
                    placeholder=' Enter your password' name='password' 
                    value={password} 
                    onChange={e=>setPassInput(e.target.value)}/>
               <FaEye className='font' size={17} onClick={() => setIsPassword(!isPassword)} ></FaEye> </div>
               <LoginBTN onClick={signIn} >Sign in </LoginBTN>
               <ForgotPass style={{color: 'white', fontWeight: '700', fontStyle: 'italic'}} >Forgot password ?</ForgotPass>
               <RegBTN onClick={goRegitsterPage} className='register-btn' >Register </RegBTN>
         </div>

      )
   }


function mapStateToProps(state) {
    return {
      user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {userLogged})(SignIn); 


//CSS IN JS
const LoginBTN = styled.button`
   height: 25px;
   width: 29vw;
   min-width: 120px;
   max-width: 240px;
   border: none;
   color: white; 
   border-radius: 2px;
   background-color: #3399ff;
   font-size: large;
   &:hover {
      background-color: #3399ff;
      transform: scale(1.02);
      color: white; 
      font-weight: 600; 
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
      color: white; 
      font-weight: 600; 
   }
`;

const ForgotPass = styled.p`
   &:hover {
      cursor: pointer; 
      transform: scale(1.02);
   }
`; 