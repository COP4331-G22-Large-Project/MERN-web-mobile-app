import React, { Component } from 'react';
import axios from 'axios';


const Log = props => (
    <tr>
        <td>{props.log.userId}</td>
        <td>{props.log.amount}</td>
        <td>{props.log.type}</td>
        <td>{props.log.date.substring(0,10)}</td>
        <td>{props.log.date.substring(11,19)}</td>
        <td>
             <a href="Delete Button" onClick={() => { props.deleteLog(props.log._id)}}>delete</a>
        </td>
    </tr>
)

export default class Logs extends Component{
    constructor(props) {
        super(props);
        this.deleteLog = this.deleteLog.bind(this)

        this.state = {stools: []}
    }

    componentDidMount() {
        axios.get('/api/stool/')
            .then(res =>{
                this.setState({stools: res.data})
            })
            .catch((err) =>{
            console.log(err);
        })
    }

    deleteLog(id){

        const stool = {
            "stools": [id]
        }
        console.log(stool)
        axios.delete('/api/stool/delete', stool)
            .then(res => {console.log(res)})
        this.setState({

        })
    }
    logList(){
        return this.state.stools.map(currentLog =>{
            return <Log log = {currentLog} deleteLog ={this.deleteLog} key={currentLog._id}/>
        })
    }


    render(){
        return (
            <div>
                <h3>Logs</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.logList() }
                    </tbody>
                </table>
            </div>
        )
    }

}