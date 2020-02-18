import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export class Incomechart extends Component {
   constructor(props){
      super(props)

      this.state = {
         labels: ['sells', 'buys'], 
         datasets: [{
            data: [2000, 4000],
            backgroundColor: ['red', 'green']
         }]
      }
   }

   componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
            const expenses = this.props.alltransactions.filter(val => val.type === 'expense').reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.amount), 0)
            const gains = this.props.alltransactions.filter(val => val.type === 'gain').reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.amount), 0)
            const newState = {...this.state, datasets: [{data: [expenses, gains], backgroundColor: ['red', 'green']}]}
            this.setState({...newState})
      }
   }

   render() {
      return (
         <div>
             <Pie data={{labels: this.state.labels, datasets: this.state.datasets}} height='170%' />
         </div>
      )
   }
}

export default Incomechart