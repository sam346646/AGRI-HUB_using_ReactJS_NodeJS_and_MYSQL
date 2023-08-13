import Axios from 'axios'
import { useNavigate,useParams } from "react-router-dom"

function UpdateOrder() {

    const navigate= useNavigate()
    const { id } = useParams();

    const deleteProduct=async ()=>{
        const res=await Axios.delete(`http://localhost:8000/product/delete/${id}`);
        navigate("/farmer");
     }
     deleteProduct()
}

export default UpdateOrder;
