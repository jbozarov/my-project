import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux'
import  { openSideBar} from '../../redux/reducers/sidebarReducer'
import './Header.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserAlt } from 'react-icons/fa'
import { FiUserCheck } from 'react-icons/fi'


export class Header extends Component {
      render() {
        return (
            <div  >
                {!this.props.user.first_name ? 
                    <div className='header' >
                        <Link><p onClick={() => this.props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                        <input placeholder="  Search" style={{width: '65vw', height: '20px', borderRadius: '10px', border: 'none'}} />
                        <div className='login-register' >
                            <Link  to='/signin' style={{textDecoration:'none', color:'white'}}><p> <FaUserAlt> </FaUserAlt> Login</p></Link>
                            <Link to='/form' style={{textDecoration:'none', color:'white'}} ><p> <FiUserCheck></FiUserCheck> Register</p></Link>
                        </div>
                    </div> 
                : 
                <div className='header' >
                    <Link><p onClick={() => this.props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                    <input placeholder="  Search" style={{width: '65vw', height: '15px', borderRadius: '10px', border: 'none'}} />
                    <p style={{fontWeight: '700'}} >Welcome, {this.props.user.first_name} </p>
                </div>}
                
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
} 

export default connect(mapStateToProps, {openSideBar})(withRouter(Header));