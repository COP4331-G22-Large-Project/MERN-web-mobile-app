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
            <div class="boxlogF">
            <p class="sign" align="center">Log A Food/Drink</p>
            <form onSubmit={this.onSubmit}>
                <div className="form1">
                    <input 
                           class="un "
                           name = "string"
                           placeholder="Food/Drink"
                           required
                           value = {this.state.name}
                           onChange = {this.onChangeFoodName}
                    />
                </div>
                <div className="form1">
                    <input type ="submit" value = "Log Food" className="submitlog" align="center"/>
                </div>
            </form>
        </div>
        )
    }
}





