import React, {Component} from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button} from 'antd';

class SampleDir extends Component {

    handleRemove = () => {
        let deleteDirInput = this.props.data.dir_name;
        let index = this.props.index;
        this.props.onRemove(deleteDirInput, index);
    }
    render(){
        // console.log("???: " + this.props.data);
        return(
             <a class="nav_a" > 
             <Link exact to={`/UserDirectory/${this.props.data.dir_name}`}>{this.props.data.dir_name}</Link> 
             <Button type="danger" onClick={this.handleRemove}> 삭제 </Button> 
             </a>
        );
    }
}

SampleDir.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func
};

SampleDir.defaultProps = {
    data: {
        data: 'All'
    },
    onRemove: (deleteDirInput, index) => {
        console.error('삭제 함수가 정의되어 있지 않음');
    }
}

export default SampleDir;