import React, { Component } from 'react';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

class PublicDir extends Component {
    render() {
        return (
            <div>
                {
                    this.props.dirlists.map((result, i) => {
                        return (
                            <div>
                                <Card style={{ width: 300, marginTop: 16 }} loading={false}>
                                    <Meta
                                        avatar={
                                            <Icon type="file" />
                                        }
                                        title={result.dir_name} 
                                        description={result.owner_id}
                                    />
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

}

export default PublicDir;