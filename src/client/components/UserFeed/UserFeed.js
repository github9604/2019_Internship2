import React, { Component } from 'react';
import {Avatar} from 'antd';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class UserFeed extends Component {
    render() {
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2011 - present"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<Avatar src="../src/asset/img/folder.png" />}
            >
                <h3 className="vertical-timeline-element-title">{this.props.title} </h3>
                <h4 className="vertical-timeline-element-subtitle">{this.props.author}</h4>
                <h4> {this.props.summary}</h4>
            </VerticalTimelineElement>
        )
    }
}

export default UserFeed;