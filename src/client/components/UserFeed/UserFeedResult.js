import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import SelectSearch from 'react-select-search'
import "antd/dist/antd.css";

class UserFeedResult extends Component {

  state = {
    visible: false,
    selectedOption: null
  }

  hide = () => {
    this.setState({
      visible: false,
      selectdir: ''
    });
  };


  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    console.log("dirlists: " + this.props.dirlists)
    let friends = this.props.dirlists;
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
      <div>
        <h3> {this.props.title} </h3>
        <Popover
          content={<div><SelectSearch options={friends} placeholder="폴더를 입력하세요" /> <button> 폴더에 추가 </button></div>} 
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