import axios from "axios";
import {API} from "./global";
import {message} from "antd";


export const bookProduct=(reqObj)=>async dispatch=>{

  dispatch({type:'LOADING', payload:true})

  try {
    await axios.post(`${API}/api/bookings/bookproduct`, reqObj)
    
    dispatch({type:'LOADING',payload:false})
    message.success('your product booked successfully')
  } catch (error) {
    console.log(error)
    dispatch({type:'LOADING',payload:false})
    message.error('something went wrong, please try later')
  }
  
}