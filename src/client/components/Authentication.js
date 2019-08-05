import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Authentication extends Component{
    state = {
        user_id: "",
        user_pw: ""
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin = () => {
        let user_id = this.state.user_id;
        let user_pw = this.state.user_pw;
        this.props.onLogin(user_id, user_pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        user_pw:''
                    });
                }
            }
        );
    }

    handleKeyPress = (e) => {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleRegister = () =>{
        let user_id = this.state.user_id;
        let user_pw = this.state.user_pw;
        console.log("입력확인" + user_id);
        console.log("입력확인" + user_pw);

        this.props.onRegister(user_id, user_pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        user_id: '',
                        user_pw: ''
                    });
                }
            }
        )
    };

    render(){
        const inputBoxes = (
            <div>
                <div>
                    <input
                        placeholder="아이디"
                        name="user_id"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}/>
                </div>
                <div>
                    <input
                        placeholder="비밀번호"
                        name="user_pw"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
        <div>
            <div className="card-content">
                <div className="login-form">
                {inputBoxes}
                    <button className="login_btn"
                    onClick={this.handleLogin}>로그인</button>
                    <p className="message">아직 회원이 아니신가요? <a href="/register">회원가입</a></p>
                </div>
            </div>
        </div>
        );

        const registerView = (
        <div>
            <div className = "card-content">
                <div className="register-form">
                    {inputBoxes}
                    <button className="register_btn"
                            onClick={this.handleRegister}>CREATE</button>
                    <p className="message">이미 회원이신가요? <a href="/login">로그인</a></p>
                </div>
            </div>
        </div>
        );

        return(
            <div className="container auth">
                <div className="card">
                <div className="header blue white-text center">
                      <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                  </div>
                  {this.props.mode ? loginView : registerView }
                </div>
            </div>
        )
    }
}

Authentication.PropTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func,
    onLogin: PropTypes.func
};


Authentication.defaultProps = {
    mode: true,
    onRegister: (user_id, user_pw) => { console.error("register function is not defined"); },
    onLogin: (user_id, user_pw) => {console.error("login function not defined");}
};

export default Authentication;