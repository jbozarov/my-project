import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userLogged } from '../../redux/reducers/userReducer'
import axios from 'axios'
import styled from 'styled-components'
import './Form.css'

const Form = props => {
   const [first_name, setFirstName] = useState(''),
         [last_name, setLastName] = useState(''), 
         [email, setEmail] = useState(''),
         [password, setPassword] = useState(''),
         [validationResposce, setValidationResponse] = useState(''),
         [rejectResponse, setRejectResponse] = useState('')


    const validate = () => axios.post('/auth/valid', {email})
    .then(res=>setValidationResponse(res.data))
    .catch(() => {
       setValidationResponse(''); 
       setRejectResponse('Username already taken')
      })

    const submit = () => {
        axios.post('/auth/register', { first_name, last_name, email, password })
        .then(res=>props.userLogged(res.data))
        .catch(err=>console.log(err))
        props.history.push('/') 
    }

   return (
      <div className='form' >
            <h1>Registration form</h1>
            <input placeholder=' Enter your email'  value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder=' 8-20 character long'  value={password} onChange={e=>setPassword(e.target.value)}/> 
            <BTN onClick={validate} >Validate your email </BTN>
            { validationResposce.length>1 ? <p style={{color: 'green', fontWeight: '700'}} > {validationResposce} </p>
            : <p style={{color: 'red', fontWeight: '700'}} > {rejectResponse} </p> }
            <input placeholder=' Enter first name' value={first_name} onChange={e=>setFirstName(e.target.value)}/>
            <input placeholder=' Enter last name' value={last_name} onChange={e=>setLastName(e.target.value)} />
            <BTN className='click-btn' onClick={submit} > Click to submit</BTN>
      </div>
   )
}

export default connect(null, { userLogged })(Form);


const BTN = styled.button`
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