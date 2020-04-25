import React, {Component} from 'react';
import { connect } from 'dva';
import { List, Empty, Modal, Button } from 'antd';
import moment from 'moment';

class TopicList extends Component {
    constructor(){
      super();
      this.state= {
        current: 1,
        visibleDetail: false,
        title: '',
        content: ''
      }
    }

    getTopicByPage(page){
      const { tab } = this.props.index;
      this.setState({current: page});
      this.props.dispatch({
        type: 'index/getTopic',
        payload: {
          tab: tab,
          page: page,
          pageSize: 10
        }
      })
    }

    showDetailModal(item){
      this.setState({visibleDetail: true, title: item.title, content: item.content})
    }

    hideDetailModal(){
      this.setState({visibleDetail: false})
    }

    render() {
      const { topics } = this.props.index;
      const {current} = this.state;
      return (
        <div>
            { topics && topics.length > 0 ? 
                    <List
                     position="top"
                     pagination={{
                      current: current,
                      pageSize: 10,
                      total: 200,
                      onChange: (page) =>{
                        this.getTopicByPage(page);
                      }
                    }}
                     header={<div>Topic总数 {topics.length}</div>} bordered dataSource={topics} renderItem={item => (
                    <List.Item>
                        <h3>{item.title}  {moment(item.create_at).format('YYYY-MM-DD hh:mm:ss A')}</h3>
                        <Button type="primary" onClick={()=>{this.showDetailModal(item)}}>查看详情</Button>
                    </List.Item>
                    )}></List> : <Empty description="List is empty"/>
            }
            <Modal title={this.state.title}
            visible={this.state.visibleDetail}
            closable={false}
            onOk={()=>{this.hideDetailModal()}}
            onCancel={()=>{this.hideDetailModal()}} 
            >
            <div dangerouslySetInnerHTML={{__html: this.state.content}} style={{height: '200px', overflow: 'auto'}}></div>
            </Modal>
        </div>
      );
    }
  }
  

TopicList.propTypes = {
};

const mapStateToProps = ({index, loading}) =>{
  return {
      index,
      loading
  }
}
export default connect(mapStateToProps)(TopicList);
