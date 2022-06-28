import axios from "axios";


export const userLogin=()=>async dispatch=>{

  dispatch({type:'LOADING', payload:true})

  try {
    const response = await axios.get('https://server.abhinav80555.repl.co/api/products/getallproducts')
    dispatch({type:'GET_ALL_PRODUCTS',payload:response.data})
    dispatch({type:'LOADING',payload:false})
  } catch (error) {
    console.log(error)
    dispatch({type:'LOADING',payload:false})
  }

  
}