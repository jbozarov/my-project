import React, { Component } from 'react'
import axios from 'axios'
import { userLogged } from '../../redux/reducers/userReducer'
import PasswordMask from 'react-password-mask';
import { connect } from 'react-redux'
import './Signin.css'

export class SignIn extends Component {
    constructor(){
        super(); 

        this.state = {
            login: '', 
            password: '',
            loggedUser: {}
        }
        this.signIn = this.signIn.bind(this); 
    }

    handleForm = e => this.setState({[e.target.name]: e.target.value })

    async signIn() {
        const {login, password } = this.state
        await axios.post('/api/signin', {login, password} ).then(res => this.setState({loggedUser: res.data }))
        this.props.userLogged(this.state.loggedUser);
        this.props.history.push('/') 
    }

    goRegitsterPage = () => this.props.history.push('/form')

    render() {
        const { login, password } = this.state
        return (
            <div className='sign-in' >
                <h2>Please sign in </h2>
                <p><input placeholder=' Enter your email' type='text' name='login' value={login} onChange={e=>this.handleForm(e)} /></p>
                {/*<p><input placeholder=' Enter your password' type='text' name='password' value={password} onChange={e=>this.handleForm(e)} /> </p>*/}
                <PasswordMask useVendorStyles={false} placeholder=' Enter your password' type='text' name='password' value={password} onChange={e=>this.handleForm(e)}/>
                <button onClick={this.signIn} className='login-btn' >Sign in </button>
                <p style={{color: '#3399ff', fontWeight: '600', fontStyle: 'italic'}} >Forgot password ?</p>
                <button onClick={this.goRegitsterPage} className='register-btn' >Register </button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {userLogged})(SignIn); 
