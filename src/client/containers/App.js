import React, { Component } from 'react';
import Header from '../components/Header';

class Main extends Component {
    render() {

        let re = /(login|register|main|addingpage|searchpage)/;
        let isAuth = re.test(this.props.location.pathname);
        
        return (
            <div>
                {isAuth ? undefined :<Header />}
            </div>
        );
    }
}

export default Main;