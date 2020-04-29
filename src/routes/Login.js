import React from 'react';
import { connect } from 'dva';
import LoginCom from '../components/Login';

class Login extends React.Component {
    setUserName = (value) => {
        this.props.dispatch({
            type: 'login/setUserName',
            userName: value
        })
    }

    setPassWord = (value) => {
        this.props.dispatch({
            type:'login/setPassWord',
            passWord: value
        })
    }

    submit = () => {
        this.props.dispatch({
            type:'login/canSubmit'
        })
    }

    resetForm = () => {
        this.props.dispatch({
            type:'login/resetForm'
        });
    }

    render() {
        return (
            <div style={{background: '#000', height: '100%'}}>
                <LoginCom user={this.props.login.user} inputUserName={this.setUserName} inputPassWord={this.setPassWord} logIn={this.submit} reset={this.resetForm}></LoginCom>
            </div>
        )
    }
}


export default connect(({ login }) => ({ login }))(Login);
