import React from 'react';
import { connect } from 'dva';
import LoginCom from '../components/Login';

class Login extends React.Component {
    componentWillMount(){
        console.log(this.props.login);
    }
    setUserName = (value) => {
        this.props.dispatch({
            type: 'login/setUserName',
            userName: value
        })
    }

    setPassWord = (value) =>{
        this.props.dispatch({
            type:'login/setPassWord',
            passWord: value
        })
    }

    submit = () =>{
        this.props.dispatch({
            type:'login/canSubmit'
        })
        
    }

    render() {
        return (
            <div>
                <LoginCom user={this.props.login.user} inputUserName={this.setUserName} inputPassWord={this.setPassWord} logIn={this.submit}></LoginCom>
            </div>
        )
    }
}


export default connect(({ login }) => ({ login }))(Login);
