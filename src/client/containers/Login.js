import React, {Component} from 'react';
import {Authentication} from '../components';
import {connect} from 'react-redux';
import {loginRequest} from '../actions/authentication';

class Login extends Component {

    handleLogin = (user_id, user_pw) => {
        return this.props.loginRequest(user_id, user_pw).then(
            () => {
                if(this.props.status === "SUCCESS"){
                    console.log("react login 성공");
                    let loginData = {
                        isLoggedIn: true,
                        user_id: user_id
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.props.history.push('/searchpage');
                    return true;
                }else{
                    console.log("react login 실패");
                    return false;
                }
            }
        );
    }
    render(){
        return (
            <div>
                <h2> hello </h2>
                <Authentication mode={true}
                onLogin = {this.handleLogin} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (user_id, user_pw) => {
            return dispatch(loginRequest(user_id, user_pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);