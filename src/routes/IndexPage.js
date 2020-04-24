import React, { Component } from 'react';
import { connect } from 'dva';
import {Table ,List, Empty, Spin, Button, AutoComplete} from 'antd';
import * as apis from "../services/example";

class IndexPage extends Component {

  constructor(){
    super();
    this.state={
      current:1,
      pageLoading: true,
    }
  }

  componentDidMount() {
    this.getUserList();
    setTimeout(()=>{
      this.setState({pageLoading: false});
    },1000);
    console.log(this.props.loading);
  }

  getUserList = () => {
    this.props.dispatch({
      type: 'index/getAllUserList'
    })
  }

  testTopicAsync = () => {
    this.props.dispatch({
      type: 'index/testTopic',
    })
  }

  testAsync = () => {
    this.props.dispatch({
      type: 'index/sayHelloAsync',
      data: {
        name: '猪猪侠'
      }
    })
  }

  testMockAsync = () => {
    apis.testAjax().then((res) => {
      console.log(res);
    })
  }

  render() {
    const {users, topics, fullNameList ,loading} = this.props.index;
    const {current, pageLoading} = this.state;
    let columns = [
      {title: 'FullName', dataIndex:'name'},
      {title: 'UserName', dataIndex:'username'},
      {title: 'Phone', dataIndex:'phone'},
      {title: 'Website', dataIndex:'website', render: text => {return <a href={text}>{text}</a>}},
      {title: 'Email', dataIndex:'email'},
      {title: 'City', dataIndex:'address.city'},
      {title: 'company', dataIndex:'company.name'}
    ]

    return (
      <div>
        <Spin spinning={pageLoading} size="large" tip="on loading">

          <AutoComplete dataSource={fullNameList.push('select one')} onSelect={(data) =>{console.log('select', data)}} onSearch={(data) =>{console.log('search', data)}} placeholder="search by fullName"></AutoComplete>

          { users.length > 0 ? 
            <Table title={() => <div>用户信息列表</div>} 
                  columns={columns} 
                  dataSource={users} 
                  loading={loading} 
                  pagination={{
                    current: current,
                    total: 100,
                    onChange: (page) =>{
                      this.setState({current: page});
                    }
                  }}
                  rowKey='name'>
            </Table> : 
            <React.Fragment>
              <h3>没有用户</h3> 
              <Empty/>
            </React.Fragment>
          }
          
          <Button type="primary" shape="round" onClick={this.testTopicAsync}>异步请求topic数据></Button>
          <Button type="primary" onClick={this.testAsync}>异步事件{this.props.msg}></Button>
          <Button type="ghost" onClick={this.testMockAsync}>异步请求mock数据</Button>

          { topics.length > 0 ? 
            <List header={<div>Topic总数 {topics.length}</div>} bordered dataSource={topics} renderItem={item => (
              <List.Item>
                <h3>{item.title}  {item.create_at}</h3>
                <div dangerouslySetInnerHTML={{__html: item.content}}></div>
              </List.Item>
            )}></List>:''
          }
        </Spin>
        
      </div>
    );
  }
}

IndexPage.propTypes = {
};

const mapStateToProps = ({index, loading}) =>{
  return {
      msg:'hello',
      index,
      loading
  }
}
export default connect(mapStateToProps)(IndexPage);
