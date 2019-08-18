import React, { Component } from 'react';
import { SearchArea, SearchResultList } from '../components/SearchUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            searchTerm: '',
            inputArticle: '',
            buttonStatus: [],
            user_feeds: [],
            loading_result: ''
        };
    }

    // componentDidMount() {
    //     this.loadUserFeeds();
    // }

    insertFeed = (insert_results, btnColor, btnNumber) => {
        // console.log("right..?" + insert_results);
        // console.log(btnColor);
        // console.log(btnNumber);
        axios.post('/api/urlsearch/insertFeed', { insert_results })
            .then((response) => {
                console.log("searchpage insertfeed");
                // console.log("스크랩 여부: " + response.data.has_scrapped);
                // console.log(this.state.buttonStatus);
                if (btnColor == "0")
                    this.state.buttonStatus[btnNumber] = "1";
                else if (btnColor == "1")
                    this.state.buttonStatus[btnNumber] = "0";
                this.setState({buttonStatus: this.state.buttonStatus});
                // console.log(this.state.buttonStatus);
                // this.setState({ buttonStatus: response.data.has_scrapped });
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = this.state.searchTerm;
        axios.post('/api/urlsearch', { obj })
            .then((response) => {
                console.log("searchpage handlesubmit");
                // console.log(response);
                // console.log("hello: " + response.data.whole);
                console.log("bye : " + response.data.btn);
                this.setState({ results: response.data.whole, buttonStatus: response.data.btn });
                console.log("yes : " + this.state.buttonStatus);
                // this.loadUserFeeds();
            })
    }

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    // componentDidMount() {
    //     let obj = 'www.naver.com';
    //     axios.post('/api/urlsearch', { obj })
    //         .then((response) => {
    //             this.setState({ results: response.data });
    //         })

    //     // fetch('/api/urlsearch', obj)
    //     // .then(res => {
    //     //     console.log(res);
    //     //     return res.json()
    //     // })
    //     // .then( results => {
    //     //     console.log( results);
    //     //     this.setState({  results })
    //     // });
    // }

    render() {
        return (
            <Layout>
                <Content>
                    <div className="searchpage">
                        <SearchArea handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                        <SearchResultList btnSet={this.state.buttonStatus} insertFeed={this.insertFeed} results={this.state.results} />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default SearchPage;