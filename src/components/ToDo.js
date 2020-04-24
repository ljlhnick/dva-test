import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
const {Search} = Input;

const ToDo = ({onAddProduct}) =>{

    return(
        <div>
            <Search placeholder="new" enterButton="Add" size="large"
            onSearch={value => onAddProduct(value)}/>
        </div>
    )
}
ToDo.propTypes={
    onAddProduct: PropTypes.func.isRequired
}
export default ToDo;