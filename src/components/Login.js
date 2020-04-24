import React,{Component} from 'react';
import {Form,Icon,Input,Button,Checkbox} from 'antd';
import styles from '../index.css';

class LoginCom extends Component{
    // logIn = () => {
    //     console.log(this.props)
    // }

    render(){
        return(
            <div>
                <Form className={styles.loginForm}>
                    <Form.Item>
                        <Input prefix={<Icon type='user'/>} placeholder="UserName" onChange={(e) => this.props.inputUserName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type='lock'/>} placeholder="password" onChange={(e) => this.props.inputPassWord(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>Remember me</Checkbox>
                        <a className={styles.loginFormForgot}>Forget password</a>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton} onClick={this.props.logIn}>Log in</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default LoginCom;