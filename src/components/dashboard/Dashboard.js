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
               <span>  {transaction.account_number} </span> 
               <span style={{fontWeight: '600', color: transaction.type === 'expense' ? 'red' : 'green'}} > {transaction.amount} </span>
            </p>
            </tr>
         </tbody> ))}
      </table>
      </UpperTables>

      <h2>Your investments </h2>
  
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
  @media(max-width: 480px){
      display: none; 
   }
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
   width: 100%; 
   margin: auto; 
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: flex-start;
`; 


const MappedCards = styled.div`
  width: 20%;
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
  width: 40%;
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
   width: 95%; 
   margin: auto; 
   display: flex; 
   flex-direction: row; 
   justify-content: space-between; 
   align-items: flex-start; 
   flex-wrap: wrap; 
`; 

// --------------------
// <table className="invest-table">
//          <thead><tr><td colSpan='6'>Your investments</td></tr></thead>
//          <thead>
//         <tr>
//           <th>Name</th>
//           <th>Qty</th>
//           <th>purchased price</th>
//           <th>Real Price</th>
//           <th>Orders</th>
//           <th>Sell</th>
//         </tr>
//         </thead>
//         {investments.map(item => (
//            <tbody key={item.investment_id}>
//           <tr>
//             <td> {item.ticker} </td>
//             <td> {item.qty} </td>
//             <td> {item.purchased_price} </td>
//             {realStock.symbol === item.ticker ? 
//                <td style={{cursor: 'pointer', color: item.purchased_price > realStock.price ? 'red' : 'green', fontWeight: '800'}} onClick={() => this.getMarketPrice(item.ticker)} > {realStock.price} </td>
//                : 
//                <td style={{cursor: 'pointer'}} onClick={() => this.getMarketPrice(item.ticker)} > View market price </td>
//             }
//             <td><button>Enter stop order </button>{" "}</td>
//             <td><button>Sell</button>{" "}</td>
//             </tr>
//             </tbody>
//         ))}
//         <tfoot>
//           <tr>
//             <th>Total</th>
//             <td colSpan="5"> {total.toFixed(2)}</td>
//           </tr>
//         </tfoot>
//       </table>



















// ---------------------
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { Link, withRouter } from "react-router-dom";
// import { IoMdNotifications } from "react-icons/io";
// import { MdEmail } from "react-icons/md";
// import styled from "styled-components";
// import axios from "axios";
// import "./Dashboard.css";

// const Dashboard = props => {
//   const [accounts, setAccounts] = useState([]);
//   const [investments, setInvestments] = useState([]);
//   const [transactions, setTransaction] = useState([]);
//   const [realPrice, setRealPrice] = useState();

//   useEffect(() => {
//     getAccounts();
//     getInvestments();
//     getTransactions();
//   }, []);

//   const getAccounts = async () => {
//     await axios
//       .get(`/api/accounts/${props.user.customer_id}`)
//       .then(res => setAccounts(res.data))
//       .catch(err => console.log(err));
//   };

//   const getInvestments = async () => {
//     await axios
//       .get(`/api/investments/${props.user.customer_id}`)
//       .then(res => setInvestments(res.data))
//       .catch(err => console.log(err));
//   };

//   let total = investments.reduce(
//     (acc, cur) => parseFloat(acc) + parseFloat(cur.purchased_price),
//     0
//   );

//   const getTransactions = () => {
//     axios.get(`/api/transactionscustomerid/${props.user.customer_id}`)
//    .then(res=>setTransaction(res.data.reverse().slice(0, 5)))
// }

//    const getMarketPrice = ticker => {
//       setRealPrice('')
//       axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${ticker}`)
//       .then(res => {
//          setRealPrice(res.data)
//          console.log(realPrice)
//       })
//    }

//   return (
     
//     <DashboardDiv>
//       <DashNav>
//         <div> Accounts </div>
//         <NavIcons>
//           <IoMdNotifications
//             style={{ textDecoration: "none", color: "blue", fontWeight: "900" }}
//             size={20}
//           ></IoMdNotifications>
//           <MdEmail
//             style={{ textDecoration: "none", color: "blue", fontWeight: "900" }}
//             size={20}
//           ></MdEmail>
//         </NavIcons>
//       </DashNav>
//       <MappedCards>
//         {" "}
//         {accounts.map(account => (
//           <Card key={account.account_number}>
//             <Bankname> ABC Bank </Bankname>
//             <p> {account.first_name} </p>
//             <NameAcc>
//               <p> {account.account_number} </p>
//               <p> {account.account_type} </p>
//             </NameAcc>
//             <LinkBalance>
//               <Link
//                 style={{ textDecoration: "none", color: "white" }}
//                 to={`/transactions/${account.account_number}`}
//               >
//                 <p> View Activity </p>
//               </Link>
//               <p>
//                 Balance: {"$"}
//                 {account.balance}{" "}
//               </p>
//             </LinkBalance>
//           </Card>
//         ))}
//       </MappedCards>
//       <h2>Your investments </h2>
  
//       <LowerTables> 
//       <table className="invest-table">
//          <thead  ><tr><td colSpan='6'>Your investments</td> </tr></thead>
//         <tr>
//           <th>Name</th>
//           <th>Qty</th>
//           <th>purchased price</th>
//           <th>Real Price</th>
//           <th>Orders</th>
//           <th>Sell</th>
//         </tr>
//         {investments.map(item => (
//           <tr key={item.investment_id}>
//             <td> {item.ticker} </td>
//             <td> {item.qty} </td>
//             <td> {item.purchased_price} </td>
//             <td style={{cursor: 'pointer'}} onClick={() => getMarketPrice(item.ticker)} > View market price </td>
//             <td><button>Enter stop order </button>{" "}</td>
//             <td><button>Sell</button>{" "}</td>
//           </tr>
//         ))}
//         <tfoot>
//           <tr>
//             <th>Total</th>
//             <td colSpan="5"> {total.toFixed(2)}</td>
//           </tr>
//         </tfoot>
//       </table>



//       <table className="transactions" >
//          <thead><tr><td colSpan='1'>Recent transactions</td> </tr></thead>
//          {transactions.map(transaction => (
//          <tr key={transaction.transaction_id}>
//             <p> 
//                <span className='desc' > {transaction.description} </span> 
//                <span> {transaction.transaction_date} </span></p>
//             <p> 
//                <span>  {transaction.account_number} </span> 
//                <span style={{color: 'red', fontWeight: '600'}} > {transaction.amount} </span>
//             </p>
//          </tr>
//       ))}
//       <tfoot> <tr>  <p>View more </p> </tr> </tfoot>
     
//       </table>


//       </LowerTables>
//     </DashboardDiv>
//   );
// };

// function mapStateToProps(state) {
//   return {
//     user: state.userReducer.user,
//     searchInput: state.searchInput
//   };
// }

// export default connect(mapStateToProps)(withRouter(Dashboard));

// const DashboardDiv = styled.div`
//   width: 100%;
//   min-width: 80%;
//   margin: 10px auto;
//   box-sizing: border-box;
//   background-color: rgba(245, 245, 245, 1);
//   // background: linear-gradient(90deg, rgba(156,156,156,1) 0%, rgba(255,255,255,1) 72%);
// `;

// const DashNav = styled.nav`
//   height: 7vh;
//   width: 100%;
//   padding: 3px 10px;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   font-size: x-large;
//   color: blue;
//   font-weight: 500;
// `;

// const NavIcons = styled.div`
//   min-width: 70px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const MappedCards = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   color: white;
//   font-weight: 900px;
//   @media (max-width: 480px) {
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     margin: 0px;
//   }
// `;

// const Card = styled.div`
//   margin: 20px;
//   padding: 10px;
//   height: 20vh;
//   width: 25%;
//   min-width: 200px;
//   max-width: 200px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: flex-start;
//   background: linear-gradient(232deg, #16a085, #f4d03f);
//   font-size: 10px;
//   border-radius: 5px;
// `;

// const NameAcc = styled.div`
//   padding: 0px;
//   margin: 0px;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   @media (max-width: 480px) {
//     display: none;
//   }
// `;

// const Bankname = styled.div`
//   padding: 0px;
//   margin: 0px;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const LinkBalance = styled.div`
//   padding: 0px;
//   margin: 0px;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;


// const LowerTables = styled.div`
//    width: 90%; 
//    margin: auto; 
//    display: flex; 
//    flex-direction: row; 
//    justify-content: space-between; 
//    align-items: flex-start; 
//    flex-wrap: wrap; 
// `; 




