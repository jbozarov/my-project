import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
 
class Schedule extends Component {
  state = {
    date: new Date(),
    times: ['10:00 am ', '11:00 am ', '12:00 pm ','1:00 pm ','2:00 pm ','3:00 pm ','4:00 pm '],
    selectedTime: ''
  }
 
  onChange = date => this.setState({ date })
  onChangeTime = t => this.setState({selectedTime: t })
 
  render() {
      console.log(this.state.date.getDate())
      console.log(this.state.date.getMonth())
      console.log(this.state.date.getFullYear())
    return (
      <div>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
        <select  >
            {this.state.times.map((t, i)=>(
                <option onChange={()=>this.onChangeTime(t)} key={i}> {t} </option>
            ))}
        </select>
      </div>
    );
  }
}


export default Schedule; 
