import React, { Component } from 'react';
import axios from 'axios';
// import UserFeedResult from '../components/UserFeed';

class MyFeed extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            nowuser: '',
            loading: true
        };
    }

    componentDidMount() {
        this.showTodayFeed();
    }

    showTodayFeed = () => {
        axios.get('/api/showtodayfeed');
    }

    render() {
        return (
            <div>
                <div> my feed page </div>
                {/* <UserFeedResult showTodayFeed={this.showTodayFeed} results={this.state.results} /> */}
            </div>
        );
    }
}

export default MyFeed;