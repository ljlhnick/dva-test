import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Table, Popconfirm, Button} from 'antd';
import {connect} from 'dva'

const ProductList = ({onDelete,products,loading}) => {
    const [currentPage, setPage] = useState(1);
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
            dataIndex:'finished',
            render:(value) => {
                return value ? '是': '否'
            }
        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <Popconfirm title="Are you delete this task?" onConfirm={() => onDelete(record.id)} key={record.id}>
                        <Button>Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ];
    return(
        <div>
            <Table bordered title={()=><div>abby.luo已经完成了的事项</div>}
            pagination={
                {
                    current: currentPage,
                    pageSize: 3,
                    total: products.length,
                    onChange: (page) =>{
                        setPage(page);
                    }
                }
            }
            dataSource={products} columns={columns} rowKey='name'/>
        </div>
    )
}

ProductList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}

export default connect(({loading})=>({loading}))(ProductList);