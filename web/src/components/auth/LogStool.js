import React, {Component} from 'react'
import { addStool } from '../../api/stool';
import chart from './chart.jpg'

export default class LogStool extends Component {
    constructor(props) {
        super(props);
        this.onChangeStoolType = this.onChangeStoolType.bind(this);
        this.onChangeStoolDesc = this.onChangeStoolDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            type: 1,
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


        addStool(type, amount).then((res) => {
            this.setState({
                type: '',
                amount: ''
            });
        }).catch((err) => console.log(err));
    }

    render(){
        return(
            <div class="boxlogS">
                <form onSubmit={this.onSubmit}>
                    <div className="form1">
                    <p class="sign" align="center">Log Stool Type(1-7)</p><br/>
                        <input 
                               class="un "
                               type = "integer"
                               required
                               value = {this.state.type}
                               onChange = {this.onChangeStoolType}
                               />
                    </div>
                    <div class="form1">
                        <p class="sign" align="center">Stool Amount</p>
                        <input class="un "
                               align="center" 
                               type = "integer"
                               placeholder="Little, Normal, A lot"
                               required
                               value = {this.state.amount}
                               onChange = {this.onChangeStoolDesc}
                        />
                    </div>
                    <div className="form1">
                        <input type ="submit" value = "Log Stool" className="submitlog" align="center"/>
                    </div>
                </form>
                <br/>
                <img src={chart}/>

            </div>
        )
    }
}





