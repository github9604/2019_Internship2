import React, { Component } from 'react';
import axios from 'axios';
import { Layout } from 'antd';
import { SampleGroupDirList } from '../components';
import { MatchResultList } from '../components/UserDirectory';
const { Content } = Layout;

class GroupDirectory extends Component {

    constructor() {
        super();
        this.state = {
            now_dir: '',
            match_results: [],
            grp_dirlists: [],
            loading_group: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.dir_name !== this.props.match.params.dir_name) {
            console.log("Next: " + nextProps.match.params.dir_name);
            console.log("Now: " + this.props.match.params.dir_name);
            this.showArticleInDir(nextProps.match.params.dir_name);
        }
    }

    componentDidMount() {
        this.groupDirList();
        this.showArticleInDir();
    }

    groupDirList = () => {
        axios.get('/api/showtodayfeed/otherdirlist')
            .then((response) => {
                console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
                this.setState({
                    grp_dirlists: response.data,
                    loading_public: false
                });
            })
            .catch(error => {
                console.log('error fetching and parsing data in show dirlists');
            })
    }


    showArticleInDir = (now_dir_name) => {
        // console.log(sendDirName);

        let now_dir = this.props.match.params.dir_name;
        if (now_dir != now_dir_name) {
            now_dir = now_dir_name;
        }
        console.log(now_dir_name);
        axios.post('/api/matchDirArticle/grp', { now_dir })
            .then((response) => {
                this.setState({ match_results: response.data, now_dir: now_dir, loading_group: true });
            })
    }

    render() {
        return (
            <Layout>
                <Content>
                    <div class="sidenav" background-color="#d2d2d4">
                        <SampleGroupDirList groupDirList={this.groupDirList} data={this.state.grp_dirlists} />
                    </div>
                    <div class="matchdirart">
                        {
                            (this.state.loading_group)
                                ? <p> loading... </p>
                                : <MatchResultList match_results={this.state.match_results} now_dir={this.state.now_dir} />
                        }

                    </div>
                </Content>
            </Layout>
        );
    }

}

export default GroupDirectory;