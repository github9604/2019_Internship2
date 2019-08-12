import React, { Component } from 'react';
import { SampleDir } from '../components';
import PropTypes from 'prop-types';

class SampleDirList extends Component {
    render() {
        const mapToComponents = data => {
            console.log("????: " + data);
            return data.map((result, i) => {
                console.log("::::: " + result);
                return (
                    <SampleDir
                        data={result}
                    />
                );
            })
        }
        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

SampleDirList.propTypes = {
    data: PropTypes.array
};

SampleDirList.defaultProps = {
    data: []
}

export default SampleDirList;