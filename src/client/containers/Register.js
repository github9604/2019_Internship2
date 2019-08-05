import React, {Component} from 'react';
import {Authentication} from '../components';
import {connect} from 'react-redux';
import {registerRequest} from '../actions/authentication';

class Register extends Component {
    handleRegister = (user_id, user_pw) => {
        return this.props.registerRequest(user_id, user_pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                   console.log("react: 회원가입 성공");
                    this.props.history.push('/login');
                    return true;
                } else {
                   console.log("react: 회원가입 실패");
                    return false;
                }
            }
        );
    }
    render(){
        return (
            <div>
               <Authentication mode={false} 
               onRegister = {this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (user_id, user_pw) => {
            return dispatch(registerRequest(user_id, user_pw));
        }
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Register);