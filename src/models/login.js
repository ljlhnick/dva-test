export default {
    namespace: 'login',
    state: {
        user: {
            userName: '',
            passWord: ''
        },
        hasLogin: false
    },
    reducers: {
        'setUserName'(state, payload) {
            state.user.userName = payload.userName;
            return { ...state };
        },
        'setPassWord'(state, payload) {
            state.user.passWord = payload.passWord;
            return { ...state };
        },
        'canSubmit'(state, payload) {
            if (state.user.userName !== '' && state.user.passWord !== '') {
                state.hasLogin = true;
            }else{
                state.hasLogin = false;
            }
            console.log(state);
            return state;
        },
        'resetForm'(state, payload){
            state.user.userName = '';
            state.user.passWord = '';
            return {...state};
        }
    }
}