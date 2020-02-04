import React, { Component } from 'react'
import axios from 'axios'
import './Form.css'

export class Form extends Component {
    constructor(){
        super(); 
        this.state = {
            first_name: '',
            last_name: '', 
            birth_date: '', 
            street: '', 
            city: '',
            state: '',
            country: '',
            zip_code: '',
            login: '',
            password: '',
            validationResposce: '',
            loggedInUser: {},
        }
        this.validate = this.validate.bind(this); 
    }

    handleForm = e => this.setState({[e.target.name]: e.target.value })


    async validate () {
        const { login } = this.state; 
        await axios.post('/api/valid', {login})
        .then(res=>this.setState({validationResposce: res.data}))
    }

    submit = () => {
        const { first_name, last_name, birth_date, street, city, state, country, zip_code, login, password } = this.state; 
        axios.post('/api/submit', { first_name, last_name, birth_date, street, city, state, country, zip_code, login, password })
        .then(res=>this.setState({loggedInUser: res.data}))
    }

    render() {
        const {first_name, last_name, birth_date, street, city, state, country, zip_code, login, password, validationResposce } = this.state; 
        return (
            <div className='form' >
                <h1>Registration form</h1>
                <div id='email_password' >
                    <p><input placeholder=' Enter your email' type='text' name='login' value={login} onChange={e=>this.handleForm(e)} /></p>
                    <p><input placeholder=' 8-20 character long' type='text' name='password' value={password} onChange={e=>this.handleForm(e)} /> </p>
                    <button onClick={this.validate} >Validate your email </button>
                </div>
                <p> {validationResposce} </p>
                <div className='name-dob' >
                <p><input placeholder=' Enter first name' type='text' name='first_name' value={first_name} onChange={e=>this.handleForm(e)} /></p>
                <p><input placeholder=' Enter last name' type='text' name='last_name' value={last_name} onChange={e=>this.handleForm(e)} /> </p>
                <p><input type='text' placeholder=' Date of birth: mm/dd/yyyy' name='birth_date' value={birth_date} onChange={e=>this.handleForm(e)} /> </p>
                </div>
                <div className='street-city'>
                <p><input className='street' placeholder=' Enter street' type='text' name='street' value={street} onChange={e=>this.handleForm(e)} /> </p>
                <p><input className='city' placeholder=' Enter city' type='text' name='city' value={city} onChange={e=>this.handleForm(e)} /> </p>
                </div>
                <div className='state-country-zip' >
                <p><input placeholder=' Enter state' type='text' name='state' value={state} onChange={e=>this.handleForm(e)} /> </p>
                <p><input placeholder=' Enter country' type='text' name='country' value={country} onChange={e=>this.handleForm(e)} /> </p>
                <p><input placeholder=' zip code' type='number' name='zip_code' value={zip_code} onChange={e=>this.handleForm(e)} /> </p>
                </div>
                <button className='click-btn' onClick={this.submit} > Click to submit</button>
            </div>
        )
    }
}

export default Form

