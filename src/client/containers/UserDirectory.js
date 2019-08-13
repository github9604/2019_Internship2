import React, { Component } from 'react';
import { SampleWrite, SampleDirList } from '../components';
import { UserDirectoryList, MatchResultList, GroupList } from '../components/UserDirectory';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import { dirPostRequest, dirListRequest, dirRemoveRequest, dirRemove } from '../actions/dirList';
const { Header, Footer, Sider, Content } = Layout;

class UserDirectory extends Component {

    constructor() {
        super();
        this.state = {
            match_results: [],
            group_results: [],
            now_dir: '',
            group_auth: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.dir_name !== this.props.match.params.dir_name) {
            console.log("Next: " + nextProps.match.params.dir_name);
            console.log("Now: " + this.props.match.params.dir_name);
            // this.performGroupList();
            this.showArticleInDir(nextProps.match.params.dir_name);
        }
    }

    componentDidMount() {
        this.props.dirListRequest(true);
        this.performGroupList();
        this.showArticleInDir(this.props.match.params.dir_name);
    }

    performGroupList = () => {
        axios.post('/api/dirlist/grouplist')
            .then(response => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    group_results: response.data
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            })
    }

    changeDirAuth = (dirauth) => {
        console.log(dirauth.group_auth);
        let group_auth = dirauth.group_auth;
        let now_dir = this.state.now_dir;
        axios.post('/api/dirlist/groupAuth', { group_auth, now_dir })
            .then((response) => {
                console.log(response.data);
            })
    }

    showArticleInDir = (now_dir_name) => {
        console.log("wahta:" + now_dir_name);
        //얘를 기준으로 생각하면 됨! 
        let now_dir = this.props.match.params.dir_name;
        if (now_dir != now_dir_name) {
            now_dir = now_dir_name;
        }
        console.log(now_dir_name);
        axios.post('/api/matchDirArticle', { now_dir })
            .then((response) => {
                this.setState({ match_results: response.data, now_dir: now_dir });
            })
    }

    loadNewDir() {
        if (this.props.listStatus === 'WAITING') {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        if (this.props.dirListData.length === 0) {
            return this.props.dirListRequest(true);
        }

        return this.props.dirListRequest(false);
    }

    handleRemove = (deleteDirInput, index) => {
        console.log("doiing: " + index);
        this.props.dirRemoveRequest(deleteDirInput, index).then(() => {
            console.log("wonder: " + this.props.dirListData);

            this.props.dirListRequest(true);

        });
    }

    handlePost = (insertDirinput) => {
        // const {addToast} = useToasts();
        return this.props.dirPostRequest(insertDirinput).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    this.loadNewDir().then(
                        () => {
                            console.log("성공");
                        }
                    );
                    // addToast('성공적으로 디렉토리가 추가됐습니다', {appearance: 'success'})
                } else {
                    switch (this.props.postStatus.error) {
                        case 3:
                            console.log("실패");
                        // addToast('디렉토리 이름을 지정해주세요', {appearance: 'error'})
                    }
                }
            }
        )
    }

    render() {
        return (
            <Layout>
                <Content>
                    <Row type="flex" justify="center" align="center">
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/AllDirectory" id="header_a"><p> 전체 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/mine_close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/UserDirectory" id="header_a"><p> 내 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/GroupDirectory" id="header_a"><p> 공유 폴더 </p></Link></Col>
                    </Row>
                    <GroupList changeDirAuth={this.changeDirAuth} options={this.state.group_results} />
                    <div class="sidenav" background-color="#d2d2d4">
                        <SampleWrite onPost={this.handlePost} />
                        <SampleDirList data={this.props.dirListData} onRemove={this.handleRemove} />
                    </div>
                    <div class="matchdirart">
                        <MatchResultList match_results={this.state.match_results} now_dir={this.state.now_dir} />
                    </div>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.dirList.post,
        dirListData: state.dirList.list.data,
        listStatus: state.dirList.list.status,
        removeStatus: state.dirList.remove
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dirPostRequest: (insertDirinput) => {
            return dispatch(dirPostRequest(insertDirinput));
        },
        dirListRequest: (isInitial) => {
            return dispatch(dirListRequest(isInitial));
        },
        dirRemoveRequest: (deleteDirInput, index) => {
            return dispatch(dirRemoveRequest(deleteDirInput, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDirectory);