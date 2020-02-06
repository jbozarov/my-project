import React, { Component } from 'react';
import Buttons from './Buttons';
import './Calculator.css'

class Calculator extends Component {
  constructor () {
    super (); 
    this.state = { results: ''}
  }



  buttonPressed = buttonName => {
    if (buttonName==='=') this.calculate() 
    else if (buttonName==='C') this.reset(); 
    else if (buttonName==='√') this.sqrt(); 
    else if (buttonName==='CE') this.backspace(); 
    else if (buttonName==='x2') this.powed(); 
    else this.setState({results: this.state.results+buttonName})
  } 

  calculate = () => {
    try {
      let result = eval(this.state.results); 
      if (Number.isInteger(result)===false) this.setState ({results: +result.toFixed(2)})
      else this.setState ({results:  result})
    }
    catch {
      this.setState ({results: 'error'})
    }
  }

  reset = () => this.setState ({results: ''})
  sqrt = () => this.setState ({results: Math.sqrt(this.state.results)})
  backspace = () => this.setState ({results: this.state.results.slice(0, this.state.results.length-1)})
  powed = () => this.setState ({results: Math.pow(this.state.results, 2)})

  render () {
    const {results} = this.state
    return (
      <div className="calculator">
      <h5 className='calc-header'> Calculator </h5>
      <input className='screen' value={results}/>
      <Buttons buttonPressed={this.buttonPressed} /> 
      </div>
      );
    }
  }

export default Calculator;
