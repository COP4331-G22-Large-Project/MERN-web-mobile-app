import React, { Component } from 'react';
import { searchStool, getAllStools, deleteStools } from '../../api/stool';

const Log = props => (
    <tr>
        <td>{props.log.foods.map(foods =>foods.name).join(', ')}</td>
        <td>{props.log.exercises.map(exercises =>exercises.name).join(', ')}</td>
        <td>{props.log.amount}</td>
        <td>{props.log.type}</td>
        <td>{props.log.date.substring(0,10)}</td>
        <td>{props.log.date.substring(11,19)}</td>
        <td>
             <a href="/logs" onClick={() => { props.deleteLog(props.log._id)}}>delete</a>
        </td>
    </tr>
)

export default class Logs extends Component{
    constructor(props) {
        super(props);
        this.deleteLog = this.deleteLog.bind(this)

        this.state = {stools: []}
    }

    refreshLogs() {
        getAllStools().then((res) => {

            this.setState({stools: res.data})
            console.log(this.state.stools)
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.refreshLogs();
    }

    deleteLog(id) {
        deleteStools([id]).then((res) => {
            this.refreshLogs();
        }).catch((err) => console.log(err));
    }

    render(){
        return (
            <div className="boxview">
                <div className="form1">
                <p className="sign" align="center">Logs</p><br/>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Food/Drinks</th>
                        <th>Exercise</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.stools.map(log => (
                            <Log log={log} deleteLog={this.deleteLog} key={log._id}/>
                        ))


                    }
                    </tbody>
                </table>
                </div>
                </div>

        )
    }

}