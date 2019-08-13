import React, { Component } from 'react';
import axios from 'axios';
import { UserFeedResultList } from '../components/UserFeed';
import { Select } from 'react-select';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class MyFeed extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            dirlists: [],
            loading: true,
            totalResults: 0,
            currentPage: 1
        };
    }

    componentDidMount() {
        this.showTodayFeed();
        this.showDirLists();
    }

    showDirLists = () => {
        axios.get('/api/showtodayfeed/dirlist')
            .then((response) => {
                console.log("response data[0]: " + response.data[0].dir_name);
                for (let i = 0; i < response.data.length; i++) {
                    let tmp = response.data[i].dir_name;
                    let tmplist = this.state.dirlists;
                    tmplist.push({
                        name: tmp,
                        value: tmp
                    })
                    this.setState({ dirlists: tmplist });
                    console.log("tmp: " + tmp);
                }
                this.setState({
                    dirlist: tmpdirlists
                });
            })
            .catch(error => {
                console.log('error fetching and parsing data');
            })
    }

    showTodayFeed = () => {
        axios.get('/api/showtodayfeed')
            .then((response) => {
                console.log("response: " + response);
                console.log("response data: " + response.data);
                this.setState({
                    results: response.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    handleDirInput = () => {
        console.log("handleDirInput");
    }

    addtoDirectory = (selectdir) => {
        console.log("parsed selectdir data: " + selectdir.dirId);
        console.log("origin: " + selectdir.articleId);
        let tmp = selectdir.articleId.split('/');
        console.log("changed: " + tmp[0]);
        console.log(tmp[1]);
        let dirId = selectdir.dirId;
        let articleId = tmp[0] + tmp[1];
        axios.post('/api/showTodayFeed/diratriclemap', { dirId, articleId })
            .then((response) => {
                console.log("article and directory mapping success");
            })
    }

    nextPage = (pageNumber) => {

    }

    render() {
        return (
            <Layout>
                <Content>
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div> my feed page </div>
                            <div>
                                {
                                    (this.state.loading)
                                        ? <p> loading... </p>
                                        : <div> <UserFeedResultList addtoDirectory={this.addtoDirectory} showTodayFeed={this.showTodayFeed} showDirLists={this.showDirLists} dirlists={this.state.dirlists} results={this.state.results} /> </div>
                                }
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default MyFeed;