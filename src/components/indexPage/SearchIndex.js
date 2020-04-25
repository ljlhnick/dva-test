import React,  {Component} from 'react';
import { connect } from 'dva';
import { Button, AutoComplete, Form, DatePicker} from 'antd';
class SearchIndex extends Component {
  
  render(){
    const {fullNameList, cityList} = this.props.index;
    return (
      <div>
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
      </div>
    );
  }
};

SearchIndex.propTypes = {
};

const mapStateToProps = ({index, loading}) =>{
  return {
      index,
      loading
  }
}
export default connect(mapStateToProps)(SearchIndex);
