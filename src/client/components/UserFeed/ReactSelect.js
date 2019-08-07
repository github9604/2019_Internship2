import React, { Component } from 'react';
import SelectSearch from 'react-select-search'

class ReactSelect extends Component {
    render() {

        console.log("dirlists: " + this.props.dirlists)
        let dirlist = this.props.dirlists;

        return (
            <div>
              <SelectSearch placeholder="폴더 검색"/>
              <button> 폴더에 추가 </button>
            </div>
          );
    }
}

export default ReactSelect;