import React, {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { DefaultLayout } from "../components/DefaultLayout";
import {getAllProducts} from "../redux/action/RentalAction";
import {Button,Row,Col,Divider,DatePicker} from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
const {RangePicker}= DatePicker;
export function Home() {
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

  function setFilter(values){
   var selectedFrom= moment(values[0],'MMM-DD-YYYY HH:mm')
    var selectedTo= moment(values[1],'MMM-DD-YYYY HH:mm')
    var temp=[];

    for (var product of products){
      if (product.bookedTimeSlots.length ==0){
        temp.push(product)
      }else{
        for(var booking of product.bookedTimeSlots){
          if(selectedFrom.isBetween(booking.from,booking.to)||
            selectedTo.isBetween(booking.from,booking.to)||
            moment(booking.from).isBetween(selectedFrom,selectedTo)||
            moment(booking.to).isBetween(selectedFrom,selectedTo)
            ){
            
            }else{
            temp.push(product)
            }
        }
      }
    }
  setTotalProducts(temp)
  }

  

  
  return (
    <DefaultLayout>

      <Row className="mt-3" justify="center">
      <Col lg={20} sm={24} className="d-flex justify-content-left">
      <RangePicker showTime={{format: 'HH:mm'}} format="MMM-DD-YYYY HH:mm"  onChange={setFilter}/>
      </Col>
      </Row>
      
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

        <div>
          <button className="btn1 mr-2"><Link to={`/booking/${product._id}`}>Rent Now</Link></button>
        </div>
      
      
      </div>
      
      </div>
      
      </Col>
      })}
    
    </Row>
    </DefaultLayout>
  );
}
