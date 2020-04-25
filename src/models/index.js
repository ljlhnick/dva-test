import * as apis from "../services/example";
import _ from 'lodash';

export default {
    namespace: 'index',
    state: {
        users:[],
        fullNameList:[],
        cityList: [],
        topics:[],
        tab:'ask'
    },
    reducers: {
        'setUsers'(state,payload){
            state.users = payload.data;
            state.fullNameList = _.map(payload.data, 'name');
            state.cityList = _.map(payload.data, 'address["city"]');
            return state;
        },
        'setCity'(state,payload){
            state.cityList = payload.data;
            return {...state};
        },
        'setTopics'(state,payload){
            state.topics = payload.data;
            return state;
        }
    },
    effects:{
        *getAllUserList({payload},{put,call}){
            let rawData = yield call(apis.testAjax);
            yield put({
                type:'setUsers',
                data: rawData.data
            })
        },
        *getTopic({payload},{put,call}){
            let rawData = yield call(apis.testCnode, payload);
            yield put({
                type:'setTopics',
                data: rawData.data.data
            })
        }
    }
}