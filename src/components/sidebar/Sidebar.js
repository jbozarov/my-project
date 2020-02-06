import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import './Sidebar.css'
import { connect } from 'react-redux'
import { closeSideBar } from '../../redux/reducers/sidebarReducer'
import { FaHome, FaAddressCard, FaCalculator } from 'react-icons/fa'
import { AiOutlineLogout, AiOutlineClose, AiOutlineTransaction } from 'react-icons/ai'
import { GiBank, GiBanknote } from 'react-icons/gi'
import { MdDashboard, MdSettings } from 'react-icons/md'


export class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            showsidebar: true
        };
      }

      render() {
          console.log(this.props.user.customer_id)
        return (
            <div>
            {!this.props.user.first_name ? 
                <div className={this.props.sidebarReducer.sidebarOpen ? 'show-side-bar' : 'hide-side-bar'} >
                <Link id='close-btn' ><span onClick={() => this.props.closeSideBar(false)}> <AiOutlineClose size={15} ></AiOutlineClose></span></Link>
                <Link to='/' style={{textDecoration:'none', color:'grey'}} > <p><FaHome style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaHome> Home</p> </Link>
                <Link to='/dashboard' style={{textDecoration:'none', color:'grey'}} ><p> <MdDashboard style={{paddingRight: '10px', paddingLeft: '15px'}} ></MdDashboard>  Dashboard</p> </Link>
                <Link to='/calculator' style={{textDecoration:'none', color:'grey'}} ><p><FaCalculator style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaCalculator> Calculator</p> </Link>
                <Link to='/settings' style={{textDecoration:'none', color:'grey'}} ><p> <MdSettings style={{paddingRight: '10px', paddingLeft: '15px'}} ></MdSettings> Setting</p> </Link></div>
                : 
                <div className={this.props.sidebarReducer.sidebarOpen ? 'show-side-bar' : 'hide-side-bar'} > 
                <Link id='close-btn' ><span onClick={() => this.props.closeSideBar(false)}> <AiOutlineClose size={15} ></AiOutlineClose></span></Link>
                <Link to='/' style={{textDecoration:'none', color:'grey'}} ><p><FaHome style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaHome> Home</p> </Link>
                <Link to='/dashboard' style={{textDecoration:'none', color:'grey'}} ><p> <MdDashboard style={{paddingRight: '10px', paddingLeft: '15px'}} ></MdDashboard>Dashboard</p> </Link>
                <Link to={`/accounts/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} ><p><GiBank style={{paddingRight: '10px', paddingLeft: '15px'}} ></GiBank> Accounts</p> </Link>
                <Link to={`/transactions/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} ><p><AiOutlineTransaction style={{paddingRight: '10px', paddingLeft: '15px'}} ></AiOutlineTransaction> Transactions</p> </Link>
                <Link to={`/invest/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} ><p> <FaAddressCard style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaAddressCard> Investment</p> </Link>
                <Link to='/calculator' style={{textDecoration:'none', color:'grey'}} ><p><FaCalculator style={{paddingRight: '10px', paddingLeft: '15px'}} ></FaCalculator> Calculator</p> </Link>
                <Link to='/settings' style={{textDecoration:'none', color:'grey'}} ><p> <MdSettings style={{paddingRight: '10px', paddingLeft: '15px'}} ></MdSettings> Setting</p> </Link>
                <Link to={`/open/${this.props.user.customer_id}`} style={{textDecoration:'none', color:'grey'}} ><p> <GiBanknote style={{paddingRight: '10px', paddingLeft: '15px'}} ></GiBanknote> Open new account </p> </Link>
                <Link style={{textDecoration:'none', color:'grey'}}><p><AiOutlineLogout style={{paddingRight: '10px', paddingLeft: '15px'}} ></AiOutlineLogout> LOGOUT</p></Link>
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

export default connect(mapStateToProps, { closeSideBar })(withRouter(Sidebar));