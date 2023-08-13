import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import CustomModal from './CustomModal'

function CartQuantityContainer({ prodQty, prodOffer, prodPrice, shippingCharge, cartQty, cartId, reloadCartData }) {

    const navigate = useNavigate()

    const tempPrice = (cartQty >= 100) ? Math.round(cartQty * (prodPrice - 0.01 * prodPrice) / ((100 - (prodOffer + 1)) / 100)) : Math.round(cartQty * prodPrice / ((100 - prodOffer) / 100))
    const tempFinalPrice = (cartQty >= 100) ? Math.round(tempPrice - tempPrice * (prodOffer + 1) / 100) : Math.round(tempPrice - tempPrice * prodOffer / 100)
    const tempOffer = (cartQty >= 100) ? prodOffer + 1 : prodOffer

    const [qty, setQty] = useState(cartQty)
    const [offer, setOffer] = useState(tempOffer)
    const [price, setPrice] = useState(tempPrice)
    const [finalPrice, setFinalPrice] = useState(tempFinalPrice)
    const [errMessage, setErrMessage] = useState()
    const [changeStatus, setChangeStauts] = useState(false)

    const handleQty = (tempQty) => {
        setChangeStauts(true)
        setQty(tempQty)
        if ((tempQty >= 50 && tempQty <= prodQty - 50) || tempQty == (prodQty)) {
            setErrMessage(``)
        }
        else {
            setErrMessage(`Either 51 to ${prodQty - 50} or ${prodQty} availiable!`)
        }
    }

    useEffect(() => {
        const tempPrice = (qty >= 100) ? Math.round(qty * (prodPrice - 0.01 * prodPrice) / ((100 - (prodOffer + 1)) / 100)) : Math.round(qty * prodPrice / ((100 - prodOffer) / 100))
        const tempFinalPrice = (qty >= 100) ? Math.round(tempPrice - tempPrice * (prodOffer + 1) / 100) : Math.round(tempPrice - tempPrice * prodOffer / 100)
        const tempOffer = (qty >= 100) ? prodOffer + 1 : prodOffer
        setPrice(tempPrice)
        setFinalPrice(tempFinalPrice)
        setOffer(tempOffer)
    }, [qty])

    const updateCart=()=>{
        const formdata = new FormData();
        formdata.append('cartId', cartId)
        formdata.append('cartQty', qty)
        formdata.append('cartPrice', finalPrice)
        Axios.put('http://localhost:8000/retailer/updatecart', formdata);
        setChangeStauts(false)
        navigate("../view_cart");
        reloadCartData()
    }

    const removeCartItem=(cartid)=>{
        Axios.delete(`http://localhost:8000/retailer/deletecartitem/${cartid}`).then((res,err)=>{
            console.log(cartid)
            if(err){console.log(err)}
        })
        navigate("../view_cart");
        reloadCartData()
    }


    return (
        <>
            <div className="col-3 my-auto">
                <div>Quantity: {qty}</div>

                <div>MRP: <s>Rs.{price}</s> &nbsp;<b className='fs-5'>Rs.{(finalPrice)}</b></div>

                <span className="bg-success text-success bg-opacity-25 p-1">{offer}% OFF</span>
            </div>
            <div className="col-4 mt-3">
                <div class="d-flex w-75 mx-auto">
                    <button class="btn btn-outline-secondary" onClick={() => handleQty(qty - 1)}>-</button>
                    <input type='text' value={qty} onChange={(e) => handleQty(e.target.value)} className='form-control text-center form-control-sm mx-3' />
                    <button class="btn btn-outline-secondary" onClick={() => handleQty(qty + 1)}>+</button>
                </div>
                <div className='text-danger text-center'>{errMessage}</div>
                <div className='text-center mt-2'>
                    {changeStatus && <button className='btn btn-success btn-sm' onClick={updateCart}disabled={errMessage}>Save Changes</button>}
                </div>
            </div>
            <div className="col-3 my-auto">
                <div className='mb-3'><b className='fs-5'>
                    Rs.{(finalPrice)}</b> + {shippingCharge}(Shipping)
                    <div className='text-success'><i className='fa fa-gift'></i> You can Save Rs.{Math.round(price - finalPrice)}.</div>
                    <div className='mt-3'>
                        <button className='btn btn-outline-secondary btn-sm me-3'>Buy now</button>

                        <button className='btn btn-outline-danger btn-sm' data-bs-toggle="modal" data-bs-target={`#${cartId}`}>Remove</button>
                        <CustomModal message={`You are removing this item from cart.`} action={() => removeCartItem(cartId)} modId={`${cartId}`} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartQuantityContainer
