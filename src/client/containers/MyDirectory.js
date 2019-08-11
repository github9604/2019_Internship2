import React, { Component } from 'react';
import { UserDirectoryList, MatchResultList, GroupList } from '../components/UserDirectory';
import { connect } from 'react-redux';
import axios from 'axios';
import { Dropdown, Icon, Button } from 'semantic-ui-react';
import { string } from 'prop-types';

class MyDirectory extends Component {

    constructor() {
        super();
        this.state = {
            dirlist_results: [],
            match_results: [],
            group_results: [],
            now_dir: '',
            group_auth: '',
            selected_auth: '1'
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.dir_name !== this.props.match.params.dir_name){
            console.log("Next: " + nextProps.match.params.dir_name);
            console.log("NOw: " + this.props.match.params.dir_name);
            this.performDirList();
            this.performGroupList();
            this.showArticleInDir(nextProps.match.params.dir_name);
        }
    }
    componentDidMount() {
        this.performDirList();
        this.performGroupList();
        this.showArticleInDir();
    }

    performDirList = () => {
        axios.get('/api/dirlist')
            .then(response => {
                console.log(response);
                // console.log("dirlist: " + response.data[0].share_group_id);
                this.setState({
                    dirlist_results: response.data
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            })
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

    insertDirlist = (insertDir) => {
        let insertDirinput = insertDir;
        axios.post('/api/dirlist/insertDir', { insertDirinput })
            .then((response) => {
                if (response.data === "success") {
                    axios.get('/api/dirlist')
                        .then((response) => {
                            this.setState({ dirlist_results: response.data });
                        })
                        .catch(error => {
                            console.log('error fetching and parsing data', error);
                        })
                }
            })
            .catch(error => {
                console.log('error fetching and parsing data', error);
            })
    }

    showArticleInDir = (now_dir_name) => {
        // console.log(sendDirName);
        
        let now_dir = this.props.match.params.dir_name;
        if(now_dir != now_dir_name){
            now_dir = now_dir_name;
        }
        console.log(now_dir_name);
        axios.post('/api/matchDirArticle', { now_dir })
            .then((response) => {
                this.setState({ match_results: response.data, now_dir: now_dir });
            })
    }

    changeDirAuth = (dirauth) => {
        console.log(dirauth.group_auth);
        let group_auth = dirauth.group_auth;
        let now_dir = this.state.now_dir;
        axios.post('/api/dirlist/groupAuth', {group_auth, now_dir})
        .then((response) => {
            console.log(response.data);
        })
    }

    // groupSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("working");
    //     console.log(this.state.group_auth);
    //     // let group_auth = this.state.group_auth;
    //     // let now_dir = this.state.now_dir;
    //     // axios.post('/api/dirlist/groupAuth', {group_auth, now_dir})
    //     // .then((response) => {
    //     //     console.log(response.data);
    //     // })
    // }

    render() {
        return (
            <div>
                <h2> 공개 범위 설정 </h2>
                <h2> hello? </h2>
                <GroupList changeDirAuth={this.changeDirAuth} options={this.state.group_results} selected_auth={this.state.selected_auth}/>
                <div class="d-flex" id="wrapper">
                    <div class="sidenav" background-color="#d2d2d4">
                        <UserDirectoryList insertDirlist={this.insertDirlist} dirlists={this.state.dirlist_results} />
                        <script src="../src/asset/vendor/jquery/jquery.min.js"></script>
                        <script src="../src/asset/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                    </div>
                    <div class="matchdirart">
                        <MatchResultList match_results={this.state.match_results} now_dir={this.state.now_dir} />
                    </div>
                </div>

            </div>
        );
    }
}

export default MyDirectory;