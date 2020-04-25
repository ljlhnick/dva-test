import React, {Component} from 'react';
import { connect } from 'dva';
import { List, Empty } from 'antd';
import moment from 'moment';

class TopicList extends Component {
    constructor(){
      super();
      this.state= {
        current: 1
      }
    }

    getTopicByPage(page){
      const { tab } = this.props.index;
      this.setState({current: page});
      this.props.dispatch({
        type: 'index/getTopic',
        payload: {
          tab: tab,
          page: page
        }
    })
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
                      pageSize: 40,
                      total: 200,
                      onChange: (page) =>{
                        this.getTopicByPage(page);
                      }
                    }}
                     header={<div>Topic总数 {topics.length}</div>} bordered dataSource={topics} renderItem={item => (
                    <List.Item>
                        <h3>{item.title}  {moment(item.create_at).format('YYYY-MM-DD hh:mm:ss A')}</h3>
                        {/* <div dangerouslySetInnerHTML={{__html: item.content}} style={{width: '200px'}}></div> */}
                    </List.Item>
                    )}></List> : <Empty description="List is empty"/>
            }
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
