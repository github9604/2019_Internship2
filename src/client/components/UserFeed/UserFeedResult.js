import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import SelectSearch from 'react-select-search'
import "antd/dist/antd.css";

class UserFeedResult extends Component {

  state = {
    visible: false,
    selectdir: ''
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  setData = () => {
    console.log("selected directory name parsing");
    let sendData = {
      dirId: this.state.selectdir,
      articleId: this.props.articleId
    }
    this.props.addtoDirectory(sendData);
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  onChangeValue = (dir) => {
    console.log(dir);
    console.log(dir.name);
    this.setState({selectdir: dir.name});
    console.log(this.state.selectdir);
  }

  render() {
    console.log("dirlists: " + this.props.dirlists)
    let dirs = this.props.dirlists;
    // const friends = [
    //   {
    //     name: "Annie Cruz",
    //     value: "annie.cruz",
    //     photo: "https://randomuser.me/api/portraits/women/60.jpg"
    //   },
    //   {
    //     name: "Eli Shelton",
    //     value: "eli.shelton",
    //     photo: "https://randomuser.me/api/portraits/men/7.jpg"
    //   },
    //   {
    //     name: "Loretta Rogers",
    //     value: "loretta.rogers",
    //     photo: "https://randomuser.me/api/portraits/women/51.jpg"
    //   },
    //   {
    //     name: "Lloyd Fisher",
    //     value: "lloyd.fisher",
    //     photo: "https://randomuser.me/api/portraits/men/34.jpg"
    //   },
    //   {
    //     name: "Tiffany Gonzales",
    //     value: "tiffany.gonzales",
    //     photo: "https://randomuser.me/api/portraits/women/71.jpg"
    //   }
    // ];
    return (
      <div border="1px">
        <h3> {this.props.title} </h3>
        <h5> {this.props.author} </h5>
        <Popover
          content={<div><SelectSearch options={dirs} value={this.state.selectdir ? this.state.selectdir : ''} onChange={(dir) => this.onChangeValue(dir)} placeholder="폴더를 입력하세요" /> <button onClick={this.setData}> 폴더에 추가 </button></div>} 
          placement="bottom"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="primary"> click me </Button>
        </Popover>
      </div>
    );
  }
}

export default UserFeedResult;