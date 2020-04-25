import React, {Component} from 'react';
import { connect } from 'dva';
import { List, Empty } from 'antd';
import moment from 'moment';

class TopicList extends Component {

    render() {
      const { topics } = this.props.index;
      return (
        <div>
            { topics.length > 0 ? 
                    <List header={<div>Topic总数 {topics.length}</div>} bordered dataSource={topics} renderItem={item => (
                    <List.Item>
                        <h3>{item.title}  {moment(item.create_at).format('YYYY-MM-DD hh:mm:ss A')}</h3>
                        <div dangerouslySetInnerHTML={{__html: item.content}} style={{width: '200px'}}></div>
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
