import React, { Component } from 'react';
import { SearchArea, SearchResultList} from '../components/SearchUrl';
import axios from 'axios';

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            searchTerm: '',
            inputArticle: ''
        };
    }
    
    insertFeed = (feedId) => {
        console.log(feedId);
        let feedInput = feedId;
        axios.post('/api/urlsearch/insertFeed', {feedInput})
        .then((response) => {
            console.log("insert feed to current member success");
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = this.state.searchTerm;
        axios.post('/api/urlsearch', { obj })
        .then((response) => {
            console.log(response.data);
            this.setState({ results: response.data });
        })
    }

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
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
            <div>
                <h3> hellooooo </h3>
                <h3> {this.state.results.map(result => <div> result : {result.title} </div>)} </h3>
                <SearchArea handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <SearchResultList insertFeed={this.insertFeed} results={this.state.results}/>
            </div>
        );
    }
}

export default SearchPage;