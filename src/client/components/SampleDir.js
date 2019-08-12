import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SampleDir extends Component {
    render(){
        console.log("???: " + this.props.data);
        return(
            <div>
                <h3> {this.props.data.dir_name} </h3>
            </div>
        );
    }
}

SampleDir.propTypes = {
    data: PropTypes.object
};

SampleDir.defaultProps = {
    data: {
        data: 'All'
    }
}

export default SampleDir;