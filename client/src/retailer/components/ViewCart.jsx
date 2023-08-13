import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import Axios from "axios"
import CartQuantityContainer from './CartQuantityContainer'

function ViewCart() {

  const [total, setTotal] = useState(0)
  const [shippingCharge, setShippingCharge] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [cartList, setCartList] = useState([])
  const [isContentAvailiable, setIsContentAvailiable] = useState(true)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    Axios.get('http://localhost:8000/retailer/getcartitems').then((response) => {
      setCartList(response.data)
    }) 
  }, [reload])

  const reloadCartData = () => {
    setReload(!reload); 
  };


  useEffect(() => {
    let cumulativeTotal = 0;
    let cumulativeShippingCharge = 0;

    (cartList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
  
    cartList.forEach((cart) => {
      cumulativeTotal += cart.Cart_price;
      cumulativeShippingCharge += cart.Shipping_charge;
    });
  
    setTotal(cumulativeTotal);
    setShippingCharge(cumulativeShippingCharge);
    setGrandTotal(cumulativeTotal + cumulativeShippingCharge);
  }, [cartList]);


  return (
    <div className="retailer_content_area container-fluid px-5 py-5">
      <div className="row">
        <div className="col-md-8">
          <div style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>
            *Sorry, No products availiable in cart.<br /><br />
            <NavLink to="../" className="btn btn-secondary">Shop now</NavLink>
          </div>
          <div style={(isContentAvailiable === true) ? null : { display: 'none' }} className="card shadow-sm">
            {
              cartList.map((cart, i) => {
                return (
                  <div className='card-header text-secondary bg-white'>
                    <div className='row px-2'>
                      <div className="col-2 text-center">
                        <img src={`http://localhost:8000/includes/images/${cart.Prod_image1}`} alt="" width='100' height='100' className='rounded' />
                        <div className='fs-5 fw-bold fst-italic'>{cart.Prod_name}</div>
                      </div>
                      <CartQuantityContainer prodQty={cart.Prod_qty} prodOffer={cart.Prod_offer} prodPrice={cart.Prod_price} shippingCharge={cart.Shipping_charge} cartQty={cart.Cart_quantity} cartId={cart.Cart_id} reloadCartData={reloadCartData} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-md-4 mb-5 shadow-sm bg-white text-secondary h-25 rounded p-5 ">
          <div>Cart Total: {total}</div>
          <div>Shipping Charge: {shippingCharge}</div>
          <div className='mt-2'>Grand Total: <span className='fw-bold fs-4 text-dark'>Rs.{grandTotal}</span></div>
          <div className='text-success'><i className='fa fa-magic'></i> complete your order now to claim a offer! </div>
          <div className='text-center mt-2'><button className='btn btn-success'>Buy Now</button></div>
        </div>
      </div>
    </div>
  )
}

export default ViewCart
