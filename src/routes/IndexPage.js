import React, { Component } from 'react';
import { connect } from 'dva';
import {Table , Empty, Spin, notification} from 'antd';
import TabList from '../components/indexPage/TabList'
import SearchIndex from '../components/indexPage/SearchIndex'

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
    this.notify();
  }

  notify(){
    notification.open({
      message: 'Notification this page',
      description:
        'This is user List and cnode of List',
      onClick: () => {
        notification.close()
      },
    });
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
    const {users ,loading} = this.props.index;
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
          <SearchIndex/>

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
