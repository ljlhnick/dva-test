import React from 'react';
import {Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app}) {
  const routes = [
    {
      path:'/',
      name:'index',
      models: () => [import('./models/index')],
      component: () => import('./routes/IndexPage')
    },
    {
      path:'/products',
      name:'products',
      //models: () => [import('./models/products')],
      component: () => import('./routes/Products')
    },
    {
      path:'/login',
      name:'login',
      models: () => [import('./models/login')],
      component: () => import('./routes/Login')
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('./routes/NotFound')
    }
  ]
  return (
    // <Router history={history}>
    //   <Switch>
    //     <Route path="/" exact component={IndexPage} />
		//     <Route path="/products" exact component={Products} />
    //     <Route path="/login" exact component={Login}/>
    //   </Switch>
    // </Router>
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map(({path,name, ...dynamics}) => {
            return (
              <Route path={path} key={name} exact component={dynamic({app, ...dynamics})}/>
            )
          })
        }
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
