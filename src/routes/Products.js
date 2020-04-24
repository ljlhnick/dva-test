import React from 'react';
import {connect} from 'dva';
import ProductList from '../components/ProductList';
import ToDo from '../components/ToDo';
import {List,Checkbox,Button} from 'antd';

const Products = ({dispatch, products}) => {
	function addProduct(value){
		dispatch({
			type: 'products/add',
			payload: value
		})
		
  	}

	function handelDelete(id){
		dispatch({                     //dispatch Action 发送给 State
			type: 'products/delete',   
			payload: id,
		})
	}

	function changeFinished(e,id){
		dispatch({
			type: 'products/changeFinished',
			payload:{
				id: id,
				finished:e.target.checked
			}
		})
	}
	return(
		<div>
			<h2>List of Products</h2>
			<ToDo onAddProduct={addProduct} nameValue={products.name}></ToDo>
			<List header={<div>todoList 全部事项</div>}
				footer={<div>forced by abby.luo    还有{products.toDoList.filter((item)=>!item.finished).length}几个代办项</div>}
				bordered dataSource={products.toDoList}
				renderItem={item => <List.Item extra="列表"><Checkbox onChange={(e)=>changeFinished(e,item.id)}/>{item.name}<Button onClick={()=>handelDelete(item.id)}>delete</Button></List.Item>}
					/>
			<ProductList onDelete={handelDelete} products={products.toDoList.filter(item => item.finished)}/>
		</div>
	)
}

export default connect(({products}) => ({   //connect 绑定 State 到 View
		products
}))(Products);