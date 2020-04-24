import dva from 'dva';
import './index.css';
import { message } from 'antd';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
    // initialState:{
    //     products:[
    //         {name:'dva', id: 1,finished:false},
    //         {name: 'antd', id: 2,finished:false},
    //     ]
    // },
    onError(error){
        message.error(error.message);
    }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/products').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
