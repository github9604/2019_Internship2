import React, { Component } from 'react';
import axios from 'axios';
import { ShortFeedResultList } from '../components/UserFeed';
import { SampleGroupDirList } from '../components';
import { Layout, Spin, Icon } from 'antd';
const { Content } = Layout;

class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            short_feed_results: [],
            dirlists: [],
            Otherdirlists: [],
            loading_mine: true,
            loading_public: true
        };
    }

    componentDidMount() {
        this.showTodayFeed();
        this.showDirLists();
        this.showOtherDirLists();
    }

    showTodayFeed = () => {
        axios.get('/api/showtodayfeed/short')
            .then((response) => {
                console.log("Mainpage-showTodayFeed");
                // console.log("response data: " + response.data);
                this.setState({
                    short_feed_results: response.data,
                    loading_mine: false
                });
            })
            .catch(error => {
                console.log('error in showtodayfeed', error);
            });
    }

    showOtherDirLists = () => {
        axios.get('/api/dirlist/otherdirlist')
            .then((response) => {
                console.log("Mainpage showotherdirlists");
                // console.log("response data[0]: " + response.data[0].dir_name);
                // for(let i=0; i<response.data.length; i++){
                //     let tmp = response.data[i].dir_name;
                //     let tmplist = [this.state.dirlists];
                //     tmplist.push({
                //         name: tmp,
                //         value: tmp
                //     })
                //     this.setState({dirlists: tmplist});
                // }
                this.setState({
                    Otherdirlists: response.data,
                    loading_public: false
                });
            })
            .catch(error => {
                console.log('error in showotherdirlists');
            })
    }

    showDirLists = () => {
        axios.get('/api/dirlist')
            .then((response) => {
                console.log("Mainpage showdirlists");
                // console.log("response data[0]: " + response.data[0].dir_name);
                for (let i = 0; i < response.data.length; i++) {
                    let tmp = response.data[i].dir_name;
                    let tmplist = this.state.dirlists;
                    tmplist.push({
                        name: tmp,
                        value: tmp
                    })
                    this.setState({ dirlists: tmplist });
                    // console.log("tmp: " + tmp);
                }
                this.setState({
                    dirlist: tmpdirlists
                });
            })
            .catch(error => {
                console.log('error in showdirlists');
            })
    }

    addtoDirectory = (selectdir) => {
        console.log("mainapge addtodirectory");
        // console.log("parsed selectdir data: " + selectdir.dirId);
        // console.log("origin: " + selectdir.articleId);
        let tmp = selectdir.articleId.split('/');
        // console.log("changed: " + tmp[0]);
        // console.log(tmp[1]);
        let dirId = selectdir.dirId;
        let articleId = selectdir.articleId;
        let article_originId = selectdir.article_originId;
        let article_author = selectdir.article_author;
        let article_content = selectdir.article_content;
        let article_title = selectdir.article_title;

        axios.post('/api/showTodayFeed/dirarticlemap', { dirId, articleId, article_originId, article_author, article_content, article_title })
            .then((response) => {
                console.log("article and directory mapping success");
            })
    }

    render() {
        const antIcon = <Icon type="loading" stype={{ fontSize: 50 }} spin />
        return (
            <Layout>
                <Content>
                    <div>
                        {
                            (this.state.loading_mine)
                                ? <Spin dicidator={antIcon} />
                                : <div> <ShortFeedResultList addtoDirectory={this.addtoDirectory} showTodayFeed={this.showTodayFeed} showDirLists={this.showDirLists} dirlists={this.state.dirlists} results={this.state.short_feed_results} /> </div>
                        }
                    </div>
                    <div>
                        {
                            (this.state.loading_public)
                                ? <Spin dicidator={antIcon} />
                                :  <SampleGroupDirList data={this.state.Otherdirlists} />
                        }

                    </div>
                </Content>
            </Layout>
        );
    }
}

export default MainPage;