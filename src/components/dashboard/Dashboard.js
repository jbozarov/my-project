import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
import "./Dashboard.css";
import Incomechart from './IncomeChart'
import Sellorders from "../Investment/orders/Sellorders";
import DashInvestments from "./DashInvestments";
import logo from './logocart.png'

class Dashboard extends Component {
   constructor() {
      super(); 

      this.state = {
         accounts: [], 
         transactions: [],
         alltransactions: [], 
         total: 0
      }
   }

   componentDidMount() {
       this.getAccounts();
       this.getTransactions();
   }

   getAccounts = async () => {
    await axios
      .get(`/api/accounts/${this.props.user.customer_id}`)
      .then(res => this.setState({accounts: res.data}))
      .catch(err => console.log(err));
  };

   getTransactions = () => {
    axios.get(`/api/transactionscustomerid/${this.props.user.customer_id}`)
   .then(res=>this.setState({transactions: res.data.reverse().slice(0, 5), alltransactions: res.data}))
}

   viewTransactions = () => {
      this.props.history.push(`/transactions/4242424242424242`)
   }


   render(){
      const { accounts, transactions, alltransactions } = this.state
      console.log(alltransactions)
      
  return (
    <DashboardDiv>
      <DashNav>
        <div> Accounts </div>
        <NavIcons>
          <IoMdNotifications
            style={{ textDecoration: "none", color: "blue", fontWeight: "900" }}
            size={20}
          ></IoMdNotifications>
          <MdEmail
            style={{ textDecoration: "none", color: "blue", fontWeight: "900" }}
            size={20}
          ></MdEmail>
        </NavIcons>
      </DashNav>
      <UpperTables>
      <MappedCards>
        {accounts.map(account => (
          <Card key={account.account_number}>
            <img src={logo} alt='GO TRADE' width={180} /> 
            <p> {account.first_name} </p>
            <NameAcc>
              <h3> 4242 4242 4242 4242 </h3>
              <p> {account.account_type} </p>
            </NameAcc>
            <LinkBalance>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/transactions/${account.account_number}`}
              >
                <p> View Activity </p>
              </Link>
              <p>
                Balance: {"$"}
                {Number(account.balance).toFixed(2)}{" "}
              </p>
            </LinkBalance>
          </Card>
        ))}
      </MappedCards>
      <Incomechart alltransactions={alltransactions} />
      <table className="transactions" >
         <thead><tr><td colSpan='1' style={{fontSize: '12px'}} >Recent transactions</td> </tr></thead>
         {transactions.map(transaction => (
         <tbody key={transaction.transaction_id}>
            <tr>
            <p> 
               <span className='desc' > {transaction.description} </span> 
               <span> {transaction.transaction_date} </span></p>
            <p> 
               <span>  4242 4242 4242 4242  </span> 
               <span style={{fontWeight: '600', color: transaction.type === 'expense' ? 'red' : 'green'}} > {transaction.amount} </span>
            </p>
            </tr>
            </tbody> ))}
            <tfoot><tr><td colSpan='1' style={{fontSize: '12px', cursor: 'pointer'}} onClick={this.viewTransactions} > View All </td> </tr></tfoot>
      </table>
      </UpperTables>

      <h2 style={{marginLeft: '40px'}} >Your investments </h2>
  
      <LowerTables> 
         <DashInvestments getTransactions={this.getTransactions} />
         <Sellorders />
      </LowerTables>
    </DashboardDiv>
  );
};
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    searchInput: state.searchInput
  };
}

export default connect(mapStateToProps)(withRouter(Dashboard));

const DashboardDiv = styled.div`
  width: 100%;
  min-width: 80%;
  margin: 10px auto;
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
//   background: linear-gradient(90deg, rgba(156,156,156,1) 0%, rgba(255,255,255,1) 72%);
`;

const DashNav = styled.nav`
  height: 7vh;
  width: 90%;
  margin: auto; 
  padding: 3px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: x-large;
  color: blue;
  font-weight: 500;
  
`;

const NavIcons = styled.div`
  min-width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UpperTables = styled.div`
   width: 92%; 
   margin: auto; 
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: flex-start;
   @media(max-width: 700px){
      display: flex; 
      flex-direction: column; 
      justify-content: space-between; 
      align-items: center; 
      margin: auto; 
      height: 120vh; 
   }
`; 


const MappedCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  font-weight: 900px;
  box-sizing: border-box; 
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Card = styled.div`
  margin: 20px;
  padding: 15px;
  height: 27vh;
  width: 69%;
  min-width: 20%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #1F88F3; 
  font-size: 10px;
  border-radius: 5px;
//   box-sizing: border-box; 
`;

const NameAcc = styled.div`
  padding: 0px;
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 480px) {
    display: none;
  }
`;

const Bankname = styled.div`
  padding: 0px;
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LinkBalance = styled.div`
  padding: 0px;
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const LowerTables = styled.div`
   width: 90%; 
   margin: auto; 
   display: flex; 
   flex-direction: row; 
   justify-content: space-between; 
   align-items: flex-start; 
   flex-wrap: wrap; 
   @media(max-width: 700px){
      display: flex; 
      flex-direction: column; 
      justify-content: space-between; 
      align-items: center; 
      margin: auto; 
      height: 40vh; 
   }
`; 





