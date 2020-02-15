import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import axios from 'axios'


export class History extends Component {
   constructor() {
      super(); 

      this.state = {
         labels: [],
         datasets: [
            {
               label: 'Rainfall',
               fill: false,
               lineTension: 0.5,
               backgroundColor: 'rgba(75,192,192,1)',
               borderColor: 'rgba(0,0,0,1)',
               borderWidth: 2,
               data: [65, 59, 80, 81, 56]
            }
         ]
      }
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
                  lineTension: 0.9,
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
      console.log(this.props.match.params.ticker)
      return (
         <div>
         <Line data={this.state} width={600} height={250}
         options={{ title:{display:true, text:`History of ${this.props.match.params.ticker} for last 30 days`, fontSize:20},
           legend: { display:true, position:'right' }
         }}
         />
         </div>
      )
   }
}

export default History
