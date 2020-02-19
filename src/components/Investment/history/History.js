import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showbuyorder } from '../../../redux/reducers/showhideReducer'
import {Line} from 'react-chartjs-2';
import axios from 'axios'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'


export class History extends Component {
   constructor() {
      super(); 

      this.state = {
         showbo: true,
         labels: [],
         datasets: [
            {
               label: 'Rainfall',
               fill: false,
               lineTension: 0.9,
               backgroundColor: 'rgba(75,192,192,1)',
               borderColor: 'rgba(0,0,0,1)',
               borderWidth: 2,
               data: [65, 59, 80, 81, 56]
            }
         ]
      }
   }

   gobackdesktop = () => {
      const { showbo } = this.state 
      this.props.showbuyorder(showbo)
      this.props.history.push(`/invest/stocks`)
      // this.props.history.push(`/invest/${this.props.user.customer_id}`)
   }
   gobackmobile = () => {
      this.props.history.push(`/invest/stocks`)
   }

   componentDidMount(){
      axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.match.params.ticker}?timeseries=20`)
         .then(res => {
            const closes = res.data.historical.map(item => { return item.close }); 
            const dates = res.data.historical.map(item => { return item.date });
         this.setState({
            labels: dates.reverse(), 
            datasets: [{
                  label: `${this.props.match.params.ticker}`,
                  fill: false,
                  lineTension: 0.2,
                  backgroundColor: 'rgba(75,192,192,1)',
                  background: 'linear-gradient(232deg, #16A085, #F4D03F)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: closes.reverse()
               }]
         })
      })
   }


   render() {
      return (
         <div>
         <DesktopHistory className='desktop-history'>
            <MdArrowBack size={20} style={{cursor: 'pointer'}} onClick={() => this.gobackdesktop()} ></MdArrowBack>
            <Line data={this.state} width={900} height={300}
            options={{ title:{display:true, text:`History of ${this.props.match.params.ticker} for last 30 days`, fontSize:20},
            legend: { display:true, position:'right' }
            }}/>
         </DesktopHistory>
         <MobileHistory className='mobile-history'>
            <MdArrowBack size={20} style={{cursor: 'pointer'}} onClick={() => this.gobackmobile()} ></MdArrowBack>
            <Line data={this.state} width={500} height={220}
            options={{ title:{display:true, text:`History of ${this.props.match.params.ticker} for last 30 days`, fontSize:20},
            legend: { display:true, position:'right' }
            }}/>
         </MobileHistory>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      showHide: state.showhideReducer.showHide, 
      user: state.userReducer.user
   }
}

export default connect(mapStateToProps, { showbuyorder })(History)

const DesktopHistory = styled.div`
   @media(max-width: 480px) {
      display: none
   }
`; 

const MobileHistory = styled.div`
   @media(min-width: 480px) {
      display: none
   }
`; 
