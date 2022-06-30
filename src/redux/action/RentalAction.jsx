import axios from "axios";
import {API} from "./global";
import {message} from "antd";


export const getAllProducts=()=>async dispatch=>{

  dispatch({type:'LOADING', payload:true})

  try {
    const response = await axios.get(`${API}/api/products/getallproducts`)
    dispatch({type:'GET_ALL_PRODUCTS',payload:response.data})
    dispatch({type:'LOADING',payload:false})
  } catch (error) {
    console.log(error)
    dispatch({type:'LOADING',payload:false})
  }
  
}

export const addProduct=(reqObj)=>async dispatch=>{

  dispatch({type:'LOADING', payload:true})

  try {
    const response = await axios.post(`${API}/api/products/addproduct`,reqObj)
  
    dispatch({type:'LOADING',payload:false})
    message.success('New Product Added Successfully')
    setTimeout(()=>{
      window.location.href="/"
    },500);
  } catch (error) {
    console.log(error)
    dispatch({type:'LOADING',payload:false})
  }
  
}