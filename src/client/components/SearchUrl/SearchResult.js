import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import axios from 'axios';
import "antd/dist/antd.css";

class SearchResult extends Component {

    setData = () => {
        console.log("insert article to db btn clicked");
        this.props.insertFeed(this.props.feedId);
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
                <h3>{this.props.title}</h3>
                <img src={this.props.iconUrl} />
                <h3> {this.props.topics[0]} /></h3>
                <h5> {this.props.description} </h5>
                <Button type="primary" onClick={this.setData}> click me </Button>
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