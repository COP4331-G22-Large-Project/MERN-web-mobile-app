import React, {Component} from 'react'
import { addExercise } from '../../api/exercise';

export default class LogExercise extends Component {
    constructor(props) {
        super(props);
        this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
        this.onChangeExerciseDuration = this.onChangeExerciseDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            duration: 0
        }
    }

    onChangeExerciseName(e){
        this.setState({
            name : e.target.value
        })
    }

    onChangeExerciseDuration(e){
        this.setState({
            duration : e.target.value
        })
    }

    onSubmit(e){
        const { name, duration } = this.state;
        e.preventDefault();

        addExercise(name, duration).then((res) => {
            this.setState({
                name: '',
                duration: 0
            });
        }).catch((err) => console.log(err));
    }



    render(){
        return(
            <div class="boxlogE">
                <p class="sign" align="center">Log A Exercise</p><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form1">
                        <input 
                               class="un "
                               type = "string"
                               placeholder="Exercise"
                               required
                               value = {this.state.name}
                               onChange = {this.onChangeExerciseName}
                        />
                    </div>
                    <div class="form1">
                    <p class="sign" align="center">Duration</p>

                        <input class="un "
                               align="center" 
                               type = "number"
                               required
                               value = {this.state.duration}
                               onChange={this.onChangeExerciseDuration}
                        />
                    </div>
                    <div className="form1">
                        <input type ="submit" value = "Log Exercise" className="submitlog" align="center"/>
                    </div>
                </form>
            </div>
        )
    }
}





