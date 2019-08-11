import React, { Component } from 'react';
import { Form, Dropdown, Icon, Button } from 'semantic-ui-react';

class GroupList extends Component {

    state = {
        group_auth: ''

    }

    groupChange = (e, data) => {
        console.log("value??: " + data.value);
        this.setState({ group_auth: data.value });
    }

    setGroup = () => {
        console.log("selected group name parsing");
        let sendData = {
            group_auth: this.state.group_auth
        }
        this.props.changeDirAuth(sendData);
    }

    render() {
        console.log("dlsdkfj? : " + this.props.selected_auth);
        return (
            <div>
                <section>
                        <div>
                            <Form.Dropdown
                                onChange={this.groupChange}
                                onClick={this.groupChange}
                                defaultValue={this.props.selected_auth}
                                placeholder="공개 그룹을 선택하세요"
                                fluid search selection
                                options={this.props.options}
                            />
                            <button onClick={this.setGroup}> 변경 </button>
                        </div>
                </section>
            </div>
        );
    }
}

export default GroupList;