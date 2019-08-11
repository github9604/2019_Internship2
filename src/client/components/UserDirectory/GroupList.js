import React, { Component } from 'react';
import { Dropdown, Icon, Button } from 'semantic-ui-react';

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
        // this.props.changeDirAuth(sendData);
    }

    render() {
        return (
            <div>
                <section>
                        <div>
                            <Dropdown
                                onChange={this.groupChange}
                                placeholder="공개 그룹을 선택하세요"
                                fluid
                                search
                                selection
                                options={this.props.options}
                            />
                            <button onclick={this.setGroup}> 변경 </button>
                        </div>
                </section>
            </div>
        );
    }
}

export default GroupList;