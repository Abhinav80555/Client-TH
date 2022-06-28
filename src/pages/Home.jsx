import React, {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { DefaultLayout } from "../components/DefaultLayout";
import {getAllProducts} from "../redux/action/RentalAction";
import {Button,Row,Col} from "antd";
import Spinner from "../components/Spinner";

export function Home() {
  const { products } = useSelector((state) => state.RentalReducers);
  const {loading}= useSelector((state)=>state.AlertsReducer);
  const dispatch=useDispatch()


useEffect(()=>{
  dispatch(getAllProducts())
},[])

  

  
  return (
    <DefaultLayout>
      
      {loading == true && (<Spinner/>)}
      
    <Row justify="center" gutter={16} className="mt-5" >
      {products.map(product=>{
      return <Col lg={5} sm={24} xs={24}>
      <div className="product p-2 bs1">
      <img src={product.image} className="productimg"/>
      <div className="product-content d-flex align-items-center justify-content-between">


        <div>
        <p>{product.name}</p>
        <p>{product.rentPerHour} Rent Per Hour /-</p>
        </div>

        <div>
          <button className="btn1 mr-2">Rent Now</button>
        </div>
      
      
      </div>
      
      </div>
      
      </Col>
      })}
    
    </Row>
    </DefaultLayout>
  );
}
