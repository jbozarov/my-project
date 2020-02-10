import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux'
import  { openSideBar} from '../../redux/reducers/sidebarReducer'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserAlt } from 'react-icons/fa'
import { FiUserCheck } from 'react-icons/fi'


export class Header extends Component {
      render() {
         // console.log('Header line 13: ', this.props.user.first_name)
        return (
            <div  >
                {!this.props.user.first_name ? 
               <DeskHeader>
                  <Link><p onClick={() => this.props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                  <input placeholder="  Search" style={{width: '60vw', height: '20px', borderRadius: '10px', border: 'none'}} />
                  <LoginRegister>
                        <Link  to='/signin' style={{textDecoration:'none', color:'white'}}><p> <FaUserAlt> </FaUserAlt> Login</p></Link>
                        <Link to='/form' style={{textDecoration:'none', color:'white'}} ><p> <FiUserCheck></FiUserCheck> Register</p></Link>
                  </LoginRegister>
               </DeskHeader> 
                : 
                <DeskHeader>
                    <Link><p onClick={() => this.props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                    <input placeholder="  Search" style={{width: '60vw', height: '15px', borderRadius: '10px', border: 'none'}} />
                    <p style={{fontWeight: '700'}} >Welcome, {this.props.user.first_name} </p>
                </DeskHeader>}
               {!this.props.user.first_name ? 
               <MobileHeader>
                     <Link><p onClick={() => this.props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                     <input placeholder="  Search - mobile" style={{width: '45vw', height: '20px', borderRadius: '10px', border: 'none'}} />
                     <LoginRegister>
                        <Link  to='/signin' style={{textDecoration:'none', color:'white'}}><p>  Login</p></Link>
                        <Link to='/form' style={{textDecoration:'none', color:'white'}} ><p> Register</p></Link>
                     </LoginRegister>
               </MobileHeader> 
              : 
              <MobileHeader>
                  <Link><p onClick={() => this.props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                  <input placeholder="  Search - mobile" style={{width: '45vw', height: '15px', borderRadius: '10px', border: 'none'}} />
                  <p style={{fontWeight: '700'}} >Welcome, {this.props.user.first_name} </p>
              </MobileHeader>}          
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


const DeskHeader = styled.div`
   background-color: #333333;
   height: 10vh;
   width: 100%;
   color: white;
   display: flex;
   flex-direction: row;
   justify-content: space-evenly;
   align-items: center;
   font-family: 'Poiret One';
   @media(max-width: 480px){
      display: none;
   }
`; 

const MobileHeader = styled.div`
   background-color: #333333;
   height: 10vh;
   width: 100%;
   color: white;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;
   font-family: 'Poiret One';
   @media(min-width: 481px){
      display: none; 
   }
`; 

const LoginRegister = styled.div`
   min-width: 30vw;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   width: 15%;
`; 