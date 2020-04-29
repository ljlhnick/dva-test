import React,{Component} from 'react';
import {connect} from 'dva';
import {Form,Icon,Input,Button,Checkbox, message, Tooltip} from 'antd';
import styles from '../index.css';

class LoginCom extends Component{
    componentDidMount(){
        console.log('LoginCom', this.props); //login model and parent component
    }

    logIn = () => {
        let fromField = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values)=>{
            if(!err){
                message.info(`login success, welcome ${fromField.userName}, your passWord is ${values.passWord}`);
                this.props.logIn();
            }
        });
    }

    render(){
        const {getFieldDecorator} = this.props.form; //must Form.create()(component) https://github.com/react-component/form#option-object
        const {user: {userName, passWord}, reset} = this.props;
        // console.log(this.props.user);
        return(
            <div className={styles.loginPage}>
                <Form className={styles.loginForm}>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            initialValue: userName,
                            rules: [{required: true,message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Tooltip title="input userName"><Icon type='user'/></Tooltip>} placeholder="UserName" onChange={(e) => this.props.inputUserName(e.target.value)}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('passWord', {
                            initialValue: passWord,
                            rules: [{required: true,message: 'please fill in password'},{min:6,max:10,message:'length must 6-10'}],
                        })(
                            <Input prefix={<Icon type='lock'/>} placeholder="password" onChange={(e) => this.props.inputPassWord(e.target.value)}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remeber', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className={styles.loginFormForgot}>Forget password</a>
                        <Button htmlType="button" className={styles.loginFormButton} onClick={() => reset()}>Reset</Button>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton} onClick={() => this.logIn()}>Log in</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default  connect(({ login }) => ({ login }))(Form.create()(LoginCom));