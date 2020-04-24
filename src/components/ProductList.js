import React from 'react';
import PropTypes from 'prop-types';
import {Table, Popconfirm, Button} from 'antd';
import {connect} from 'dva'

const ProductList = ({onDelete,products,loading}) => {
    //console.log("test ui",loading);
    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            key:'name',
            sorter: (a,b) => a.name.length - b.name.length,
            sortDirections:['descend']
        },
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title:'是否完成',
            dataIndex:'finished'
        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)} key={record.id}>
                        <Button>Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ];
    return(
        <div>
            <Table bordered title={()=><div>abby.luo已经完成了的事项</div>}
            dataSource={products} columns={columns} rowKey='name'/>
        </div>
    )
}

ProductList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}

export default connect(({loading})=>({loading}))(ProductList);