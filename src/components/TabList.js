import React, {Component} from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import TopicList from './TopicList';
const {TabPane} = Tabs;

class TabList extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: 'index/getTopic',
            payload: {
              tab: 'ask'
            }
        })
    }

    changeTab(index){
        let tab = '';
        switch(index){
            case '1': tab = "ask";break;
            case '2': tab = "share";break;
            case '3': tab = "job";break;
            case '4': tab = "good";break;
            default: break;
        }
        this.props.dispatch({
            type: 'index/getTopic',
            payload: {
              tab: tab
            }
        })
    }

    render() {
      return (
        <div>
            <Tabs defaultActiveKey="1" onChange={(index)=>{this.changeTab(index)}}>
              <TabPane tab="ask" key="1">
                <TopicList tab="ask"/>
              </TabPane>
              <TabPane tab="share" key="2">
                <TopicList tab="share"/>
              </TabPane>
              <TabPane tab="job" key="3">
                <TopicList tab="job"/>
              </TabPane>
              <TabPane tab="good" key="4">
                <TopicList tab="good"/>
              </TabPane>
            </Tabs>
        </div>
      );
    }
  }
  

TabList.propTypes = {
};

const mapStateToProps = ({index, loading}) =>{
  return {
      index,
      loading
  }
}
export default connect(mapStateToProps)(TabList);
