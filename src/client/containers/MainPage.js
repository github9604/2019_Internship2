import React, { Component } from 'react';
import axios from 'axios';
import { ShortFeedResultList } from '../components/UserFeed';
import { PublicDir } from '../components/MainPrint';
import { Layout } from 'antd';
const {Content } = Layout;

class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            short_feed_results: [],
            dirlists: [],
            loading_mine: true,
            loading_public: true
        };
    }

    componentDidMount() {
        this.showTodayFeed();
        this.showDirLists();
    }

    showTodayFeed = () => {
        axios.get('/api/showtodayfeed/short')
            .then((response) => {
                // console.log("response: " + response);
                // console.log("response data: " + response.data);
                this.setState({
                    short_feed_results: response.data,
                    loading_mine: false
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    showDirLists = () => {
        axios.get('/api/showtodayfeed/otherdirlist')
            .then((response) => {
                console.log("working::" + response.data);
                console.log("response data[0]: " + response.data[0].dir_name);
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
                    dirlists: response.data,
                    loading_public: false
                });
            })
            .catch(error => {
                console.log('error fetching and parsing data in show dirlists');
            })
    }

    render() {
        return (
            <Layout>
                <Content>
                    <div>
                        {
                            (this.state.loading_mine)
                                ? <p> loading... </p>
                                : <div> <ShortFeedResultList showTodayFeed={this.showTodayFeed} results={this.state.short_feed_results} /> </div>
                        }
                    </div>
                    <div>{
                        (this.state.loading_public)
                            ? <p> loading... </p>
                            : <div> <PublicDir showDirLists={this.showDirLists} dirlists={this.state.dirlists} /> </div>
                    }

                    </div>
                </Content>
            </Layout>
        );
    }
}

export default MainPage;