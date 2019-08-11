import React, {Component} from 'react';
import { Link, withRouter} from 'react-router-dom';

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
            <a class="nav_a" onClick={this.setDirName}> <Link exact to={`/MyDirectory/${this.props.dir_name}`}>{this.props.dir_name}</Link> </a>
        );
    }
}

export default withRouter(UserDirEach);