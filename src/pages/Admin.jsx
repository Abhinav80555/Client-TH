import React, {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import { DefaultLayout } from "../components/DefaultLayout";
import {getAllProducts} from "../redux/action/RentalAction";
import {Button,Row,Col,Divider,Modal} from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
const {RangePicker}= DatePicker;
export function Admin() {
  const { products } = useSelector((state) => state.RentalReducers);
  const {loading}= useSelector((state)=>state.AlertsReducer);
  const [totalProducts,setTotalProducts] =useState([]);
  const dispatch=useDispatch()


useEffect(()=>{
  dispatch(getAllProducts())
},[])

  useEffect(()=>{
  setTotalProducts(products)
},[products])

  
  return (
    <DefaultLayout>
  
      {loading == true && (<Spinner/>)}
      
    <Row justify="center" gutter={16} >
      {totalProducts.map(product=>{
      return <Col lg={5} sm={24} xs={24}>
      <div className="product p-2 bs1">
      <img src={product.image} className="productimg"/>
      <div className="product-content d-flex align-items-center justify-content-between">


        <div>
        <p>{product.name}</p>
        <p>{product.rentPerHour} Rent Per Hour /-</p>
        </div>

        <div className="admin">
          <EditOutlined style={{color:"blue",cursor:"pointer"}}></EditOutlined>
          <DeleteOutlined className="m-3" style={{color:"red",cursor:"pointer"}}/>
        </div>
      
      
      </div>
      
      </div>
      
      </Col>
      })}
    
    </Row>
    </DefaultLayout>
  );
}