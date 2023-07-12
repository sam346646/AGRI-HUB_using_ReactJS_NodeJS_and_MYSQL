import Axios from 'axios'
import {React,useState,useEffect} from "react"
import { useNavigate,useParams } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs'

function UpdateOrder() {

    const navigate= useNavigate()
    const { id } = useParams();

    const deleteProduct=async ()=>{
        const res=await Axios.delete(`http://localhost:8000/product/delete/${id}`);
        navigate("/");
     }
     deleteProduct()
}

export default UpdateOrder;
