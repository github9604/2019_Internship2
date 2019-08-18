import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { Tabs, Icon, Radio } from 'antd';
import { SampleGroupDirList } from '../components';
import { UserDirectoryList } from '../components/MainDirectory';

const { Content } = Layout;
const { TabPane } = Tabs;

class AllDirectory extends Component {

    constructor() {
        super();
        this.state = {
            user_dirlists: [],
            grp_dirlists: [],
            now_dir: '',
            loading_group: false
        };
    }

    componentDidMount() {
        this.groupDirList();
        this.userDirList();
    }

    groupDirList = () => {
        axios.get('/api/dirlist/otherdirlist')
            .then((response) => {
                // console.log("working::" + response.data);
                // console.log("response data[0]: " + response.data[0].dir_name);
                this.setState({
                    grp_dirlists: response.data
                });
                console.log("all directory page group directory load");
            })
            .catch(error => {
                console.log('error fetching and parsing data in show dirlists');
            })
    }

    userDirList = () => {
        axios.get('/api/dirlist')
            .then((response) => {
                this.setState({
                    user_dirlists: response.data
                });
                console.log("all directory page user directory load");
            })
            .catch(error => {
                console.log('error fetching and parsing data in show user dirlists');
            })
    }

    render() {
        return (
            <Layout>
                <Content>
                    {/* <Row type="flex" justify="center" align="center">
                        <Col span={6}> <img src="../src/asset/img/mine_close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/AllDirectory" id="header_a"><p> 전체 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/UserDirectory" id="header_a"><p> 내 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to={{
                                pathname: `/GroupDirectory`,
                                state: {
                                    now_groupdir_id: 0
                                }
                            }} id="header_a"><p> 공유 폴더 </p></Link></Col>
                    </Row> */}
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={
                                <Link to="/AllDirectory">
                                <span>
                                    <Icon type="apple" />
                                    전체 디렉토리
                                </span>
                                </Link>
                            }
                            key="1"
                        >
                            전체 디렉토리
                        </TabPane>
                        <TabPane
                            tab={
                                <Link to="/UserDirectory">
                                <span>
                                    내 디렉토리
                                </span>
                                </Link>
                               
                            }
                            key="2"
                        >
                            내 디렉토리
                        </TabPane>
                        <TabPane
                            tab={
                                <Link to={{
                                    pathname: `/GroupDirectory`,
                                    state: {
                                        now_groupdir_id: 0
                                    }
                                }}>
                                <span>
                                    <Icon type="android" />
                                    공유받은 디렉토리
                                </span>
                                </Link>
                            }
                            key="3"
                        >
                            공유받은 디렉토리
                        </TabPane>
                    </Tabs>
                    <UserDirectoryList data={this.state.user_dirlists} />
                    <SampleGroupDirList data={this.state.grp_dirlists} />
                </Content>
            </Layout>
        );
    }
}

export default AllDirectory;