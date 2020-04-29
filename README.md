## dva-test 采用React+antd+fetch+dva 分为route model compoent(dispatch 到model中的影响efftect)

> clone and run

## Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:5000
npm run start

# build for production with minification
npm run build
```
##project detail
分为indexPage(/), login(/login),  products(/products)三个页面， 没匹配上前面三个路径，显示404页面（NotFound组件）

/ 获取了github的接口以及cnode社区的接口(Tabs、Spin、AutoComplete、Table、List、Pagination组件)

/login 使用了Input组件且加上了表单验证

/products 使用Input、Button、Table组件并加入了hook钩子

### change Log on 2020/04/24 
npm i antd
add webpack-bundle-analyzer(3.7.0) and webpack-dev-server(3.10.3)

### change Log on 2020/04/25 add antd compoent and rename file
add notification, modal in IndexPage
add SearchIndex.js tableList.js TopicList.js component

