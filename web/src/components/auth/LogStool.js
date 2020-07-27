import React, {Component} from 'react'
import { addStool } from '../../api/stool';

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
        const { type, amount } = this.state;
        e.preventDefault();

        const stool = {
            type: this.state.type,
            amount: this.state.amount
        }
        console.log(stool)
        addStool(type, amount).then((res) => {
            this.setState({
                type: '',
                amount: ''
            });
        }).catch((err) => console.log(err));
    }

    render(){
        return(
            <div>
                <h3>Log A Stool</h3><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Stool Type: </label>
                        <input type = "integer"
                               required
                               className="form-control"
                               value = {this.state.type}
                               onChange = {this.onChangeStoolType}
                               />
                    </div><br/>
                    <div>
                        <label>Stool Amount(Little, Normal, A lot): </label>
                        <input type = "integer"
                               required
                               className="form-control"
                               value = {this.state.amount}
                               onChange = {this.onChangeStoolDesc}
                        />
                    </div><br/>
                    <div className="form-group">
                        <input type ="submit" value = "Log Stool" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}





