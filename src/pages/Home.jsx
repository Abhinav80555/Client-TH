import React, {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { DefaultLayout } from "../components/DefaultLayout";
import {getAllProducts} from "../redux/action/RentalAction";

export function Home() {
  const { products } = useSelector((state) => state.RentalReducers);
  const dispatch=useDispatch()


useEffect(()=>{
  dispatch(getAllProducts())
},[])

  

  
  return (
    <DefaultLayout>
      <h1>Home page</h1>
      <h1>The of rental array is {products.length}</h1>
    </DefaultLayout>
  );
}
