import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { SampleGroupDirList } from '../components';
import { MatchResultList } from '../components/UserDirectory';
const { Content } = Layout;
import { Row, Col } from 'antd';

class GroupDirectory extends Component {

    constructor() {
        super();
        this.state = {
            match_results: [],
            grp_dirlists: [],
            now_dir: '',
            loading_group: false
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
        this.showArticleInDir(this.props.match.params.dir_name);
    }

    groupDirList = () => {
        axios.get('/api/showtodayfeed/otherdirlist')
            .then((response) => {
                // console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
                this.setState({
                    grp_dirlists: response.data
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
                    <Row type="flex" justify="center" align="center">
                    <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/AllDirectory" id="header_a"><p> 전체 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/UserDirectory" id="header_a"><p> 내 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/mine_close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/GroupDirectory" id="header_a"><p> 공유 폴더 </p></Link></Col>
                    </Row>
                    <div class="sidenav" background-color="#d2d2d4">
                        <SampleGroupDirList data={this.state.grp_dirlists} />
                    </div>
                    {/*
                    <div class="matchdirart">
                        {
                            (this.state.loading_group)
                                ? <p> loading... </p>
                                : <MatchResultList match_results={this.state.match_results} now_dir={this.state.now_dir} />
                        }

                    </div> */}
                </Content>
            </Layout>
        );
    }

}

export default GroupDirectory;