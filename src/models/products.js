import * as apis from "../services/example"

export default {
    namespace: 'products',
    state: {
        toDoList: [
            { name: 'dva', id: 1, finished: false },
            { name: 'antd', id: 2, finished: false },
        ],
        name: ''
    },
    reducers: {
        'delete'(state, { payload: id }) {
            state.toDoList = state.toDoList.filter(item => item.id != id);
            return { ...state };
        },
        'add'(state, { payload: value }) {
            state.toDoList.push({
                name: value,
                id: state.toDoList.length + 1,
                finished: false
            });
            return { ...state };
        },
        'changeFinished'(state, payload) {
            payload = payload.payload;
            state.toDoList.forEach(item => {
                if (item.id === payload.id) {
                    item.finished = payload.finished
                }
            });
            return { ...state };
        },
        'sayHello'(state, payload) {
            console.log('sayhello', payload);
            return state
        },
        'testPath'(state, payload) {
            console.log("products page", state)
            return state;
        }
    },
    effects: {
        *sayHelloAsync({ payload }, { put, call }) {
            yield put({
                type: 'sayHello',
                data: {
                    name: '超人强'
                }
            })
        },
        *testAjax({ payload }, { put, call }) {
            let rel = yield call(apis.testAjax)
            console.log(rel);
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === "/products") {
                    dispatch({
                        type: 'testPath'
                    })
                }
            })
        }
    }
}