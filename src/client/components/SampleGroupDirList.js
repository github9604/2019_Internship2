import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class SampleGroupDirList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.map((result, i) => {
                        return (
                            <Card key={i} hoverable={true} style={{ width: 300, marginTop: 16 }} loading={false}>
                                <Meta
                                    avatar={
                                        <Avatar src="../src/asset/img/folder.png"/>
                                    }
                                    title={result.dir_name}
                                    description={result.owner_id}
                                />
                            </Card>
                            // <a class="nav_a">
                            //     <Link exact to={`/GroupDirectory/${result.dir_name}`}>{result.dir_name}</Link>
                            // </a>
                        )
                    })
                }
            </div>
        )
    }
}

export default SampleGroupDirList;