import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Log = props => (
    <tr>
        <td>{props.log.userId}</td>
        <td>{props.log.amount}</td>
        <td>{props.log.type}</td>
        <td>{props.log.date}</td>
        <td>
             <a href="#" onClick={() => { props.deleteLog(props) }}>delete</a>
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
        axios.get('http://localhost:3000/api/stool/')
            .then(res =>{
                this.setState({stools: res.data})
            })
            .catch((err) =>{
            console.log(err);
        })
    }

    deleteLog(id){
        axios.delete('http://localhost:3000/api/stool/delete/' + id)
            .then(res => {console.log(res)})
        this.setState({
            stools: this.state.stools.filter(el=>el._id != id)
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