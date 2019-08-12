import React, { Component } from 'react';
import { SampleWrite, SampleDirList } from '../components';
import { connect } from 'react-redux';
import { dirPostRequest, dirListRequest } from '../actions/dirList';
// import { useToasts } from "react-toast-notifications";

class DirTest extends Component {

    loadNewDir() {
        if (this.props.listStatus === 'WAITING') {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        if (this.props.dirListData.length === 0) {
            return this.props.dirListRequest(true);
        }

        return this.props.dirListRequest(false);
    }

    componentDidMount() {
        this.props.dirListRequest(true);
    }
    
    handlePost = (insertDirinput) => {
        // const {addToast} = useToasts();
        return this.props.dirPostRequest(insertDirinput).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    this.loadNewDir().then(
                        () => {
                            console.log("성공");
                        }
                    );
                    // addToast('성공적으로 디렉토리가 추가됐습니다', {appearance: 'success'})
                } else {
                    switch (this.props.postStatus.error) {
                        case 3:
                            console.log("실패");
                        // addToast('디렉토리 이름을 지정해주세요', {appearance: 'error'})
                    }
                }
            }
        )
    }

    render() {
        return (
            <div>
                <SampleWrite onPost={this.handlePost} />
                <SampleDirList data={this.props.dirListData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.dirList.post,
        dirListData: state.dirList.list.data,
        listStatus: state.dirList.list.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dirPostRequest: (insertDirinput) => {
            return dispatch(dirPostRequest(insertDirinput));
        },
        dirListRequest: (isInitial) => {
            return dispatch(dirListRequest(isInitial));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirTest);