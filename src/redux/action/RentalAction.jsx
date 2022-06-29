import axios from "axios";
import {API} from "./global"


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