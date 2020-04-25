import request from '../utils/request';

export function testAjax(){
  return request('/apis/users');
}

export function testCnode(arg){
  return arg.page ? request (`/cnode/topics?tab=${arg.tab}&page=${arg.page}&limit=${arg.pageSize}`) : request (`/cnode/topics?tab=${arg.tab}&limit=${arg.pageSize}`);
}
  
//获取mock数据，模拟接口请求
export function testMock(){
  return request('api/mockData');
}