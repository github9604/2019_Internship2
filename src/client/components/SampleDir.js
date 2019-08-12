import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SampleDir extends Component {

    handleRemove = () => {
        let deleteDirInput = this.props.data.dir_name;
        let index = this.props.index;
        this.props.onRemove(deleteDirInput, index);
    }
    render(){
        // console.log("???: " + this.props.data);
        return(
            <div>
                <h3> {this.props.data.dir_name} </h3>
                <h5> <a onClick={this.handleRemove}> Remove </a> </h5>
            </div>
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