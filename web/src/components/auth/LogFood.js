import React, {Component} from 'react'
import axios from 'axios';

export default class LogFood extends Component {
    constructor(props) {
        super(props);
        this.onChangeFoodName = this.onChangeFoodName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: ''
        }
    }

    onChangeFoodName(e){
        this.setState({
            name : e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();

        const food = {
            name: this.state.name,
        }
        console.log(food)
        axios.post('http://localhost:3000/api/food/add',food)
            .then(res => console.log(res.data));

        this.setState({
            name: ''
        })
    }

    render(){
        return(
            <div>
                <h3>Log A Food/Drink</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Food/Drink: </label>
                        <input name = "string"
                               required
                               className="form-control"
                               value = {this.state.type}
                               onChange = {this.onChangeFoodName}
                        />
                    </div>
                    <div className="form-group">
                        <input type ="submit" value = "Log Food" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}





