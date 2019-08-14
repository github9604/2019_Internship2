import React, { Component } from 'react';
import { Form, Dropdown, Icon, Button } from 'semantic-ui-react';
import { Checkbox } from 'antd';

class GroupList extends Component {

    state = {
        group_auth: ''

    }

    onChange(checkedValues) {
        console.log('checked = ', checkedValues);
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
        const options = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
        ];
        return (
            <div>
                <section>
                    <div>
                        {/* <Form.Dropdown
                            onChange={this.groupChange}
                            onClick={this.groupChange}
                            placeholder="공개 그룹을 선택하세요"
                            fluid search selection
                            options={this.props.options}
                        /> */}
                        <Checkbox.Group options={this.props.options} onChange={this.onChange} />
                        <br />
                        <br />
                        <button onClick={this.setGroup}> 변경 </button>
                    </div>
                </section>
            </div>
        );
    }
}

export default GroupList;