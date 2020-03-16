import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux'
import  { openSideBar} from '../../redux/reducers/sidebarReducer'
import { filterState } from '../../redux/reducers/searchReducer'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserAlt } from 'react-icons/fa'
import { FiUserCheck } from 'react-icons/fi'
import { IoMdLogIn } from 'react-icons/io'
import logo from './logo.png'




const Header = props => {
   // const [ searchInput, setSearchInput ] = useState('')

   const handleSearch = value => props.filterState(value); 
        return (
            <div  >
                {!props.user.first_name ? 
               <DeskHeader>
                  <Link><p onClick={() => props.openSideBar(true)}> <GiHamburgerMenu size={22} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                  <img src={logo} alt='' width={55} /> 
                  <input placeholder="  Search" style={{width: '60%', height: '25px', borderRadius: '10px', border: 'none'}} onChange={e => handleSearch(e.target.value)} />
                  <LoginRegister>
                        <Link to='/' style={{textDecoration:'none', color:'white'}}><p> <FaUserAlt> </FaUserAlt> Login</p></Link>
                        <Link to='/form' style={{textDecoration:'none', color:'white'}} ><p> <FiUserCheck></FiUserCheck> Register</p></Link>
                  </LoginRegister>
               </DeskHeader> 
                : 
                <DeskHeader>
                <Link><p onClick={() => props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                    <img src={logo} alt='' width={40} /> 
                    <input placeholder="  Search" style={{width: '65vw', height: '20px', borderRadius: '10px', border: 'none'}} onChange={e => handleSearch(e.target.value)} />
                    <p style={{fontWeight: '700'}} >Welcome, {props.user.first_name} </p>
                </DeskHeader>}
               {!props.user.first_name ? 
               <MobileHeader>
                     <Link><p onClick={() => props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                     <input placeholder="  Search - mobile" style={{width: '45vw', height: '20px', borderRadius: '10px', border: 'none'}} onChange={e => handleSearch(e.target.value)} />
                     <LoginRegister>
                        <Link  to='/' style={{textDecoration:'none', color:'white'}}><IoMdLogIn> </IoMdLogIn></Link>
                        <Link to='/form' style={{textDecoration:'none', color:'white'}} > <FiUserCheck></FiUserCheck> </Link>
                     </LoginRegister>
               </MobileHeader> 
              : 
              <MobileHeader>
                  <Link><p onClick={() => props.openSideBar(true)}> <GiHamburgerMenu size={17} style={{color: 'white'}} ></GiHamburgerMenu></p></Link>
                  <input placeholder="  Search - mobile" style={{width: '45vw', height: '15px', borderRadius: '10px', border: 'none'}} onChange={e => handleSearch(e.target.value)} />
                  <p style={{fontWeight: '700'}} >Welcome, {props.user.first_name} </p>
              </MobileHeader>}          
            </div>
        )
    }

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
} 

export default connect(mapStateToProps, {openSideBar, filterState })(withRouter(Header));


const DeskHeader = styled.div`
   background-color: black;
   height: 12vh;
   width: 100%;
   color: white;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding-left: 2%; 
   padding-right: 5%; 
   box-sizing: border-box; 
   align-items: center;
   font-size: 15px;
   font-family: 'Poiret One';
   @media(max-width: 480px){
      display: none;
   }
`; 

const MobileHeader = styled.div`
   background-color: black;
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
   // min-width: 32vw;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   width: 15%;
`; 