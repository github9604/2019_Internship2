import React, {Component} from 'react';

class DirEach extends Component {

    render() {
        return(
            <a class="nav_a"> {this.props.dir_name} </a>
        );
    }
}

export default DirEach;