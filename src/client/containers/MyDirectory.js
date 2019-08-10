import React, { Component } from 'react';
import { UserDirectoryList } from '../components/UserDirectory';
import { connect } from 'react-redux';
import axios from 'axios';

class MyDirectory extends Component {

    constructor() {
        super();
        this.state = {
            dirlist_results: []
        };
    }

    componentDidMount() {
        this.performDirList();
    }

    performDirList = () => {
        axios.get('/api/dirlist')
            .then(response => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    dirlist_results: response.data
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            })
    }

    insertDirlist = (insertDir) => {
        let insertDirinput = insertDir;
        axios.post('/api/dirlist/insertDir', {insertDirinput})
        .then((response) => {
            if(response.data === "success")
            {
                axios.get('/api/dirlist')
                .then((response) => {
                    this.setState({dirlist_results: response.data});
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

    render() {
        return (
            <div class="d-flex" id="wrapper">
                <div class="sidenav" background-color="#d2d2d4">
                    <UserDirectoryList insertDirlist={this.insertDirlist} dirlists={this.state.dirlist_results} />
                    <script src="../src/asset/vendor/jquery/jquery.min.js"></script>
                    <script src="../src/asset/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                </div>
            </div>
        );
    }
}

export default MyDirectory;