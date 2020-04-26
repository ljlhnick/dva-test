import React, { useState } from 'react';
import {connect} from 'dva';
import ProductList from '../components/ProductList';
import ToDo from '../components/ToDo';
import {List,Checkbox,Button, Statistic} from 'antd';

const Products = ({dispatch, products}) => {
	const [name , setname]= useState('');

	function addProduct(value){
		setname(value);
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
			<h2>List of Products ---- hook</h2>
			<ToDo onAddProduct={addProduct} nameValue={products.name}></ToDo>
			<List header={<div>todoList 全部事项<Statistic value={products.toDoList.length}></Statistic>个 新加事项:{name}</div>}
				footer={<div>abby.luo 还有{products.toDoList.filter((item)=>!item.finished).length}几个代办项</div>}
				bordered dataSource={products.toDoList}
				renderItem={item => 
				<List.Item>
					<Checkbox onChange={(e)=>changeFinished(e,item.id)}/>{item.name}
					<Button type="primary" danger onClick={()=>handelDelete(item.id)} style={{float: 'right'}}>delete</Button>
				</List.Item>}
			/>
			<ProductList onDelete={handelDelete} products={products.toDoList.filter(item => item.finished)}/>
			{/* modal https://segmentfault.com/q/1010000009284866 */}
		</div>
	)
}

export default connect(({products}) => ({   //connect 绑定 State 到 View
		products
}))(Products);