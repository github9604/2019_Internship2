import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import PropTypes from 'prop-types';

class SampleGroupDirList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.map((result, i) => {
                        return (
                            <a class="nav_a">
                                <Link exact to={`/GroupDirectory/${result.dir_name}`}>{this.props.data.dir_name}</Link>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}

export default SampleGroupDirList;