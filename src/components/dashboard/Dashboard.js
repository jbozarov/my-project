import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = props => {
  const [accounts, setAccounts] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    getAccounts();
    getInvestments();
    getTransactions();
  }, []);

  const getAccounts = async () => {
    await axios
      .get(`/api/accounts/${props.user.customer_id}`)
      .then(res => setAccounts(res.data))
      .catch(err => console.log(err));
  };

  const getInvestments = async () => {
    await axios
      .get(`/api/investments/${props.user.customer_id}`)
      .then(res => setInvestments(res.data))
      .catch(err => console.log(err));
  };

  let total = investments.reduce(
    (acc, cur) => parseFloat(acc) + parseFloat(cur.purchased_price),
    0
  );

  const getTransactions = () => {
    axios.get(`/api/transactionscustomerid/${props.user.customer_id}`)
   .then(res=>setTransaction(res.data.reverse().slice(0, 5)))
}

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
      <MappedCards>
        {" "}
        {accounts.map(account => (
          <Card key={account.account_number}>
            <Bankname> ABC Bank </Bankname>
            <p> {account.first_name} </p>
            <NameAcc>
              <p> {account.account_number} </p>
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
                {account.balance}{" "}
              </p>
            </LinkBalance>
          </Card>
        ))}
      </MappedCards>
      <h2>Your investments </h2>
  
      <LowerTables> 
      <table className="invest-table">
         <thead  ><tr><td colSpan='5'>Your investments</td> </tr></thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>purchased price</th>
          <th>Orders</th>
          <th>Sell</th>
        </tr>
        {investments.map(item => (
          <tr key={item.investment_id}>
            <td> {item.ticker} </td>
            <td> {item.qty} </td>
            <td> {item.purchased_price} </td>
            <td><button>Enter stop order </button>{" "}</td>
            <td><button>Sell</button>{" "}</td>
          </tr>
        ))}
        <tfoot>
          <tr>
            <th>Total</th>
            <td colSpan="4"> {total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>



      <table className="transactions" >
         <thead><tr><td colSpan='1'>Recent transactions</td> </tr></thead>
         {transactions.map(transaction => (
         <tr key={transaction.transaction_id}>
            <p> 
               <span className='desc' > {transaction.description} </span> 
               <span> {transaction.transaction_date} </span></p>
            <p> 
               <span>  {transaction.account_number} </span> 
               <span style={{color: 'red', fontWeight: '600'}} > {transaction.amount} </span>
            </p>
         </tr>
      ))}
      <tfoot> <tr>  <p>View more </p> </tr> </tfoot>
     
      </table>


      </LowerTables>
    </DashboardDiv>
  );
};

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
  // background: linear-gradient(90deg, rgba(156,156,156,1) 0%, rgba(255,255,255,1) 72%);
`;

const DashNav = styled.nav`
  height: 7vh;
  width: 100%;
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

const MappedCards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  font-weight: 900px;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0px;
  }
`;

const Card = styled.div`
  margin: 20px;
  padding: 10px;
  height: 20vh;
  width: 25%;
  min-width: 200px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background: linear-gradient(232deg, #16a085, #f4d03f);
  font-size: 10px;
  border-radius: 5px;
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
`; 




// <table className="invest-table" >
// <thead><tr><td colSpan='5'>Recent transactions</td> </tr></thead>
//   <tr>
//     <th> Account Number </th>
//     <th> Amount</th>
//     <th> Description </th>
//     <th> Transaction date </th>
//   </tr>
//   {transactions.map(transaction => (
//     <tr key={transaction.transaction_id}>
//       <td> {transaction.account_number} </td>
//       <td> {transaction.amount} </td>
//       <td> {transaction.description} </td>
//       <td> {transaction.transaction_date} </td>
//     </tr>
//   ))}
// // </table>



// <div className="transactions" >
// <p>Recent transactions</p> 
//   {transactions.map(transaction => (
//     <div className='box' key={transaction.transaction_id}>
//       <p> <span>  {transaction.description}</span> <span> {transaction.transaction_date} </span></p>
//       <p> <span>  {transaction.account_number}</span> <span> {transaction.amount} </span></p>
//     </div>
//   ))}
//   <p>View more </p>
// </div>