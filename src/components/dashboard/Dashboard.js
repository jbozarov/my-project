import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'; 
import { IoMdNotifications } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import styled from 'styled-components'
import axios from 'axios'

const Dashboard = props => {
   const [accounts, setAccounts ] = useState([])

    useEffect(() => {
       getAccounts()
    }, [])

    const getAccounts = async() => {
        await axios.get(`/api/accounts/${props.match.params.customer_id}`)
              .then(res => setAccounts(res.data))
              .catch(err => console.log(err))
    }
        return (
            <DashboardDiv >
               <DashNav>
                  <div>  Accounts </div>
                  <NavIcons> 
                     <IoMdNotifications style={{textDecoration:'none', color:'blue', fontWeight: '900'}} size={20}></IoMdNotifications>
                     <MdEmail style={{textDecoration:'none', color:'blue', fontWeight: '900'}} size={20} ></MdEmail>
                  </NavIcons>
               </DashNav>
               <MappedCards> {accounts.map(account=>(
                    <Card key={account.account_number}>
                        <Bankname> ABC Bank </Bankname>
                        <p> {account.first_name}  </p>
                        <NameAcc>
                           <p> {account.account_number} </p>
                           <p> {account.account_type} </p>
                        </NameAcc>
                        <LinkBalance>
                           <Link style={{textDecoration:'none', color:'white'}} to={`/transactions/${account.account_number}`} ><p> View Activity </p></Link>
                           <p>Balance:  {"$"}{account.balance} </p>
                        </LinkBalance>
                    </Card>
                ))}
                </MappedCards>
            </DashboardDiv>
        )
    }


export default withRouter(Dashboard)


const DashboardDiv = styled.div`
   width: 100%;
   min-width: 80%;
   margin: 10px auto;
   box-sizing: border-box;
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
    @media(max-width: 480px){
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
   background: linear-gradient(232deg, #16A085, #F4D03F);
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
    @media(max-width: 480px){
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