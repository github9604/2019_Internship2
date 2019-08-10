import React, { Component } from 'react';
import DirEach from './DirEach';
import { Button } from 'antd';


class UserDirectoryList extends Component {
    state = {
        inputDir: ''
    }

    handleChange = (e) => {
        this.setState({ inputDir: e.target.value });
    };

    handleSubmit = () => {
        this.props.insertDirlist(this.state.inputDir);
    };

    render() {
        return (
            <div>
                {
                    this.props.dirlists.map((result, i) => {
                        return (
                            <DirEach dir_name={result.dir_name} />
                        )
                    })
                }
                <a>
                    <input placeholder="폴더명을 입력하세요" onChange={this.handleChange} />
                </a>
                <a>
                    <Button onClick={this.handleSubmit}>
                        <p>dir 추가</p>
                    </Button>
                </a>
            </div>
        );
    }
}

export default UserDirectoryList;