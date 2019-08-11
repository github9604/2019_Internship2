import React, {Component} from 'react';

class MatchResult extends Component {
    
    render(){
        console.log("after sned: " + this.props.title);
        return(
            <div>
                <h3> {this.props.title} </h3>
                <h4> {this.props.author} </h4>
                <h5> {this.props.summary} </h5>
            </div>
        );
    }
}