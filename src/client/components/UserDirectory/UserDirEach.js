import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class UserDirEach extends Component {

    setDirName = () => {
        console.log("selected directory name parsing");
        let sendDirName = {
            dirName: this.props.dir_name
        }
        this.props.showArticleInDir(sendDirName);
    }
    render() {
        return(
            <a class="nav_a" onClick={this.setDirName}> <NavLink exact to={`/MyDirectory/${this.props.dir_name}`}>{this.props.dir_name}</NavLink> </a>
        );
    }
}

export default UserDirEach;