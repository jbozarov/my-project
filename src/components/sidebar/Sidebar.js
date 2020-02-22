import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import styled from 'styled-components'
import './Sidebar.css'
import { connect } from 'react-redux'
import { closeSideBar } from '../../redux/reducers/sidebarReducer'
import { userLogOut } from '../../redux/reducers/userReducer'
import { FaAddressCard, FaCalculator } from 'react-icons/fa'
import { AiOutlineLogout, AiOutlineClose, AiOutlineTransaction } from 'react-icons/ai'
import { GiBank, GiBanknote } from 'react-icons/gi'
import { MdDashboard, MdSettings, MdHelpOutline } from 'react-icons/md'
import axios from 'axios';



export class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            showsidebar: true
        };
      }

      logout = () => {
         axios.post('/auth/logout').then(() => this.props.userLogOut({}))
         this.props.closeSideBar(false)
         this.props.history.push('/')
      }
      render() {
        console.log(this.props.user.first_name)
        return (
            <div>
            {!this.props.user.first_name ? 
                <div className={this.props.sidebarReducer.sidebarOpen ? 'show-side-bar' : 'hide-side-bar'} >
                <Link id='close-btn' ><Span onClick={() => this.props.closeSideBar(false)}> <AiOutlineClose size={15} ></AiOutlineClose></Span></Link>
                <Link to='/dashboard' style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P> <MdDashboard style={{paddingRight: '10px', paddingLeft: '15px'}} ></MdDashboard>  Dashboard</P> </Link>
                <Link to='/calculator' style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P><FaCalculator style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaCalculator> Calculator</P> </Link>
                <Link to='/settings' style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P> <MdSettings style={{paddingRight: '10px', paddingLeft: '15px'}} disabled ></MdSettings> Setting</P> </Link></div>
                : 
                <div className={this.props.sidebarReducer.sidebarOpen ? 'show-side-bar' : 'hide-side-bar'} > 
                <Link id='close-btn' ><Span onClick={() => this.props.closeSideBar(false)}> <AiOutlineClose size={15} ></AiOutlineClose></Span></Link>
                <Link to={`/dashboard/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P> <MdDashboard style={{paddingRight: '10px', paddingLeft: '15px'}} ></MdDashboard>Dashboard</P> </Link>
                <Link to={`/accounts/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P><GiBank style={{paddingRight: '10px', paddingLeft: '15px'}} ></GiBank> Accounts</P> </Link>
                <Link to={`/transactions/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P><AiOutlineTransaction style={{paddingRight: '10px', paddingLeft: '15px'}} ></AiOutlineTransaction> Transactions</P> </Link>
                <Link to={`/invest/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} onClick={() => this.props.closeSideBar(false)} ><P> <FaAddressCard style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaAddressCard> Investment</P> </Link>
                <Link to='/calculator' style={{textDecoration:'none', color:'grey'}} ><P><FaCalculator style={{paddingRight: '10px', paddingLeft: '15px'}} onClick={() => this.props.closeSideBar(false)} ></FaCalculator> Calculator</P> </Link>
                <Link to={`/open/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} ><P> <GiBanknote style={{paddingRight: '10px', paddingLeft: '15px'}} onClick={() => this.props.closeSideBar(false)} ></GiBanknote> Open new account </P> </Link>
                <Link to='/settings' style={{textDecoration:'none', color:'grey'}} ><P> <MdSettings style={{paddingRight: '10px', paddingLeft: '15px'}} onClick={() => this.props.closeSideBar(false)} ></MdSettings> Setting</P> </Link>
                <Link to='/help' style={{textDecoration:'none', color:'grey'}} ><P> <MdHelpOutline style={{paddingRight: '10px', paddingLeft: '15px'}} onClick={() => this.props.closeSideBar(false)} ></MdHelpOutline> Help</P> </Link>
                <Link style={{textDecoration:'none', color:'grey'}}><P onClick={this.logout} ><AiOutlineLogout style={{paddingRight: '10px', paddingLeft: '15px'}} onClick={() => this.props.closeSideBar(false)} ></AiOutlineLogout> LOGOUT</P></Link>
                </div>}
           </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        sidebarReducer: state.sidebarReducer
    }
} 

export default connect(mapStateToProps, { closeSideBar, userLogOut })(withRouter(Sidebar));



//CSS IN JS
const P = styled.p`
   margin: 0;
   padding: 10px 0;
   box-sizing: border-box;
   color: black;
   font-weight: 700;
   border-right: #262626 solid 0.3px;
   &:hover {
      display: flex;
      background-color: #1F88F3;
      border-radius: 10px;
      color: white;
      font-weight: 700;
   }
`;

const Span = styled.span`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   margin-right: 15px;
   margin-bottom: 20px;
   color: black;
   float: right; 
`; 