import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import axios from 'axios';
import "antd/dist/antd.css";

class SearchResult extends Component {

    state = {
        feedId: '',
        websiteTitle: ''
    }

    setData = () => {
        console.log("insert article to db btn clicked");
        let insert_results = {
            feedId: this.props.feedId,
            websiteTitle: this.props.websiteTitle
          }
        this.props.insertFeed(insert_results);
    }
    // state = {
    //     visible: false
    // };

    // hide = () => {
    //     this.setState({
    //         visible: false
    //     });
    // };

    // handleVisibleChange = visible => {
    //     this.setState({ visible });
    // };
    
   

    render() {
        return (
            <div>
                <h3>{this.props.websiteTitle}</h3>
                <img src={this.props.iconUrl} />
                <h3> {this.props.topics[0]} /></h3>
                <h5> {this.props.description} </h5>
                <Button type="primary" onClick={this.setData}> Feed 구독 </Button>
                {/* <Popover
                    content={<div> <div>{AddDirForm}</div> <div> {DirList} </div> <a onClick={this.hide}>Close</a> </div>}
                    title="Title"
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                    placement="bottom"
                >
                    <Button type="primary">Click me</Button>
                </Popover> */}
            </div>
        );
    }
}

export default SearchResult;