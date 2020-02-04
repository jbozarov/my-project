import React, { Component } from 'react'
import axios from 'axios';

export class Transactions extends Component {
    constructor(){
        super(); 

        this.state = {
            cards: []
        }
    }

    componentDidMount(){
        //axios.get(`/aip/cards/${this.props.match.params.customer_id}`)
    }
    render() {
        //console.log(this.props.match.params.customer_id)
        return (
            <div>
                Transactions
            </div>
        )
    }
}

export default Transactions
