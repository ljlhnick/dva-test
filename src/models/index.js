import * as apis from "../services/example";
import _ from 'lodash';

export default {
    namespace: 'index',
    state: {
        users:[],
        fullNameList:[],
        topics:[]
    },
    reducers: {
        'setUsers'(state,payload){
            state.users = payload.data;
            state.fullNameList = _.map(payload.data, 'name');
            return state;
        },
        'sayHello'(state,payload){
            console.log('sayhello',payload);
            return state
        },
        'setTopics'(state,payload){
            state.topics = payload.data;
            return state;
        }
    },
    effects:{
        *sayHelloAsync ({payload},{put, call}){
            yield put({
                type:'sayHello',
                data:{
                    name:'超人强'
                }
            })
        },
        *getAllUserList({payload},{put,call}){
            let rawData = yield call(apis.testAjax);
            yield put({
                type:'setUsers',
                data: rawData.data
            })
        },
        *testTopic({payload},{put,call}){
            let rawData = yield call(apis.testCnode);
            yield put({
                type:'setTopics',
                data: rawData.data.data
            })
        }
    }
}