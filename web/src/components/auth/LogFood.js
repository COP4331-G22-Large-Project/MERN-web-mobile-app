import React, {Component} from 'react'
import { addFood } from '../../api/food';

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
        const { name } = this.state;
        e.preventDefault();

        addFood(name).then((res) => {
            this.setState({
                name: ''
            });
        }).catch((err) => console.log(err));
    }

    render(){
        return(
            <div>
                <h3>Log A Food / Drink</h3><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Food/Drink: </label>
                        <input name = "string"
                               required
                               className="form-control"
                               value = {this.state.name}
                               onChange = {this.onChangeFoodName}
                        />
                    </div><br/>
                    <div className="form-group">
                        <input type ="submit" value = "Log Food" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}





