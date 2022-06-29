import React, {useState,useEffect} from "react";
import {Button,Row,Col,Divider,DatePicker} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { DefaultLayout } from "../components/DefaultLayout";
import {getAllProducts} from "../redux/action/RentalAction";
import {bookProduct} from "../redux/action/bookingAction";
import Spinner from "../components/Spinner";
import {useParams} from "react-router-dom";
import moment from "moment";



const {RangePicker} = DatePicker






export function Booking({match}) {
  const {productId} = useParams()
  const { products } = useSelector((state) => state.RentalReducers);
  const {loading}= useSelector((state)=>state.AlertsReducer);
  const [product,setProduct]= useState({})
  const dispatch=useDispatch()
  const [from , setFrom] = useState()
  const [to , setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [totalAmount,setTotalAmount]=useState(0);
  


useEffect(()=>{

  if(products.length==0){
      dispatch(getAllProducts())
  }
else{
   setProduct(products.find(o=>o._id==`${productId}`))
}   
  
},[products])


  useEffect(()=>{
    setTotalAmount(totalHours*product.rentPerHour)
    
  },[totalHours])


  function selectTimeSlots(values){
    setFrom(moment(values[0]).format('MMM-DD-YYYY HH:mm'))
    setTo(moment(values[1]).format('MMM-DD-YYYY HH:mm'))

    setTotalHours(values[1].diff(values[0], 'hours'))
  }

function bookNow(){
  const reqObj ={
    user:JSON.parse(localStorage.getItem('user'))._id,
    product:product._id,
    totalHours,
    totalAmount,
    bookedTimeSlots :{
      from,
      to
    }
  }
  dispatch(bookProduct(reqObj))
}

  
  return (
    <DefaultLayout>
      {loading && (<Spinner/>)}
      
      <Row justify="center" className="d-flex align-items-center" style={{minHeight:"90vh"}}>
        <Col lg={10} sm={24} xs={24}>
        <img src={product.image} className="productimg2 bs1"/>
        </Col>

          <Col lg={10} sm={24} xs={24} className="text-right">
        <Divider style={{borderColor:"black"}} type='horizontal' dashed>Product info</Divider>
            <div style={{textAlign:'right'}}>
            <p>{product.name}</p>
              <p>Rent Per Hour = {product.rentPerHour}/-</p>
              <p>Product Type = {product.Type}</p>
              <p>Lens = {product.lens}mm</p>
            </div>
<Divider style={{borderColor:"black"}} type='horizontal' dashed>Select Time Slots</Divider>
            <div style={{textAlign:'right'}}>
 <RangePicker 
      showTime={{format: 'HH:mm'}} format="MMM-DD-YYYY HH:mm"
   onChange={selectTimeSlots}
    />
              {from && to && ( <div>
              <p>Total Hours : <b>{totalHours}</b></p>
              <p>Rent Per Hour : <b>{product.rentPerHour}</b> </p>
              <h3>Total Amount= {totalAmount}</h3>
              <button className="btn1" onClick={bookNow}>Book Now</button>
            </div>)}
            </div>
        </Col>
      </Row>
    
      
    </DefaultLayout>
  );
}
