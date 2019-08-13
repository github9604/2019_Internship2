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
            user_feeds: []
        };
    }

    componentDidMount() {
        this.loadUserFeeds();
    }

    insertFeed = (insert_results) => {
        axios.post('/api/urlsearch/insertFeed', { insert_results })
            .then((response) => {
                console.log("insert feed to current member success");
                console.log("wahtd: " + response.data.has_scrapped);
                this.setState({ buttonStatus: response.data.has_scrapped });
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = this.state.searchTerm;
        axios.post('/api/urlsearch', { obj })
            .then((response) => {
                console.log(response.data);
                this.setState({ results: response.data });
                this.loadUserFeeds();
            })
    }

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    loadUserFeeds = () => {
        axios.get('/api/showtodayfeed/feedlist')
            .then((response) => {
                // console.log(response.data);
                this.setState({ user_feeds: response.data });
            })
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
                        <Link exact to={`/MyDirectory/asdf`}>asdf</Link>
                        <SearchArea handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                        <SearchResultList defaultFeed={this.state.user_feeds} insertFeed={this.insertFeed} results={this.state.results} />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default SearchPage;