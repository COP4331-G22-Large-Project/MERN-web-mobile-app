import React, {Component} from 'react'
import axios from 'axios';

export default class LogStool extends Component {
    constructor(props) {
        super(props);
        this.onChangeStoolType = this.onChangeStoolType.bind(this);
        this.onChangeStoolDesc = this.onChangeStoolDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            type: 0,
            amount: ''
        }
    }

    onChangeStoolType(e){
        this.setState({
            type : e.target.value
        })
    }

    onChangeStoolDesc(e){
        this.setState({
            amount : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const stool = {
            type: this.state.type,
            amount: this.state.amount
        }
        console.log(stool)
        axios.post('http://localhost:3000/api/stool/add',stool)
            .then(res => console.log(res.data));

        this.setState({
            type: '',
            amount: ''
        })
    }



    render(){
        return(
            <div>
                <h3>Log A Stool</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Stool Type: </label>
                        <input type = "integer"
                               required
                               className="form-control"
                               value = {this.state.type}
                               onChange = {this.onChangeStoolType}
                               />
                    </div>
                    <div>
                        <label>Stool Amount(text description...but not too descriptive): </label>
                        <input type = "string"
                               required
                               className="form-control"
                               value = {this.state.amount}
                               onChange={this.onChangeStoolDesc}
                        />
                    </div>
                    <div className="form-group">
                        <input type ="submit" value = "Log Stool" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}





