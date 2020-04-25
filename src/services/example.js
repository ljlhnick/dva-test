import request from '../utils/request';

export function testAjax(){
  return request('/apis/users');
}

export function testCnode(arg){
  return request (`/cnode/topics?tab=${arg.tab}`)
}
  
//获取mock数据，模拟接口请求
export function testMock(){
  return request('api/mockData');
}