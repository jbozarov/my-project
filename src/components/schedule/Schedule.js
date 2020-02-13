import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import './Schedule.css'
 
class Schedule extends Component {
  state = {
    date: new Date(),
    selectedDate: '', 
    table: [], 
    bookingTime: ''
  }

  book = time => this.setState({bookingTime: time})
  onChangeTime = t => this.setState({selectedTime: t })

  getSchedules = async () => {
     const { selectedDate } = this.state
     await axios.post('/api/schedules', {selectedDate})
     .then(res => this.setState({table: res.data}))
  }
 
  onChange = selectedDate => {
         var dd = selectedDate.getDate(); 
         var mm = selectedDate.getMonth() + 1; 
         var yyyy = selectedDate.getFullYear(); 
         var formattedDate = mm + '/' + dd + '/' + yyyy; 
         this.setState({selectedDate: formattedDate}, () => this.getSchedules())
   }
  
 submitApp = (date, time) => {
    axios.put('/api/make', {date, time})
    .then(() => {
       this.setState({bookingTime: ''})
       this.getSchedules() 
    })
 }

  render() {
    const { table, bookingTime } = this.state 
    return (
      <div className='schedule' >
        <DatePicker onChange={this.onChange} value={this.state.date} />
        <table className='schedule-table' >
            <tr>
                <th> Appointment date </th>
                <th> Appointment Time </th>
                <th> Availibility </th>
                <th> Booking </th>
            </tr>
            {table.map(item => (
               <tr className='booking-table' id={item.available ? 'green' : 'red'} key = {item.appointment_id} >
                  <td> {bookingTime === item.time? <input placeholder='First name ' /> : item.date}  </td>
                  <td> {bookingTime === item.time? <input placeholder='Last name ' /> : item.time} </td>
                  <td> {item.available ? 'Available' : 'Not availble '} </td>
                  {bookingTime === item.time ? 
                     <td>{<button onClick={() => this.submitApp(item.date, item.time)} > Submit </button>} </td>
                     : 
                     <td> {item.available ? <button onClick={() => this.book(item.time)} >Book this time</button> : <button disabled >Book this time</button>} </td>
                  }
               </tr> 
            ))}
        </table> 
      </div>
    );
  }
}


export default Schedule; 
