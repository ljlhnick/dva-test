import React, { Component } from 'react';
import { connect } from 'dva';
import {Table , Empty, Spin, Button, AutoComplete, Form, DatePicker} from 'antd';
import TabList from '../components/TabList'

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
  }

  getUserList = () => {
    this.props.dispatch({
      type: 'index/getAllUserList'
    })
  }

  searchCity(city){
    const {cityList} = this.props.index;
    this.props.dispatch({
      type: 'index/setCity',
      data: city ? cityList.filter(item => {return item.indexOf(city)>-1}) : cityList
    })
  }

  getTopicList = () => {
    this.props.dispatch({
      type: 'index/getTopic',
      payload: {
        tab: 'ask'
      }
    })
  }

  render() {
    const {users, fullNameList, cityList ,loading} = this.props.index;
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
          <Form layout="inline" ref={React.createRef()}>
            <Form.Item  label="fullName" name="fullName" rules={[{required: true}]}>
              <AutoComplete dataSource={fullNameList} onSelect={(data) =>{console.log('select', data)}} onSearch={(data) =>{console.log('search', data)}} placeholder="search by fullName"></AutoComplete>
            </Form.Item>

            <Form.Item  label="city" name="city" rules={[{required: true, message:'this field is required!'}]}>
              <AutoComplete style={{ width: 200 }} options={cityList} onSelect={(data) =>{console.log('select', data)}} onSearch={(data) =>{this.searchCity(data)}} placeholder="search by city"></AutoComplete>
            </Form.Item>

            <Form.Item>
              <DatePicker label="date" rules={[{required: true, message:'select a date!'}]}></DatePicker>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">search</Button>
            </Form.Item>
          </Form>

          { users && users.length > 0 ? 
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
          
          {/* <Button type="primary" shape="round" onClick={this.getTopicList}>异步请求topic数据</Button> */}

          <TabList/>
        </Spin>
        
      </div>
    );
  }
}

IndexPage.propTypes = {
};

const mapStateToProps = ({index, loading}) =>{
  return {
      index,
      loading
  }
}
export default connect(mapStateToProps)(IndexPage);
