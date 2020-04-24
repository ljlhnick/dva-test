import request from '../utils/request';

export function testAjax(){
  return request('/apis/users');
}

export function testMock(){
  return request('api/mockData');
}

export function testCnode(){
  return request ('/cnode/topics')
}