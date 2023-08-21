import Axios from "axios";
import { React, useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

function Dashboard() {

  const [prodList, setProdList] = useState([])
  const [message, setMessage] = useState()

  let actualPrice = 0;
  let savePrice = 0;
  let updatedSavePrice = 0;
  let prodType = '';

  useEffect(() => {
    Axios.get('http://localhost:8000/product/getall').then((response) => {
      setProdList(response.data)
    })
  }, [])

  //Cart
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage('');
    }, 5000);
  }, [message])

  const updateCart = (prodId, name, prodPrice) => {
    const formdata = new FormData();
    formdata.append('usrId', localStorage.getItem('usrId'))
    formdata.append('prodId', prodId)
    formdata.append('cartQty', 50)
    formdata.append('cartPrice', prodPrice * 50)
    Axios.post('http://localhost:8000/retailer/insertCart', formdata).then((response) => {
      if (response.data.cartStatus == '') {
        setMessage(`You've successfully added product to your cart!`)
      }
      else {
        setMessage(response.data.cartStatus + '!')
      }
    });
  }


  return (
    <>
      <div className="retailer_content_area px-5 py-4">
        {message && <div className="position-fixed start-50 translate-middle-x text-success mb-3 fw-bold fs-4" style={{ zIndex: "1000", top: '10%' }}><span className="bg-success bg-opacity-25 p-2 rounded">{message}</span></div>}
        <div className="row">
          {
            prodList.map((prod) => {
              actualPrice = (prod.Prod_price / ((100 - prod.Prod_offer) / 100)).toFixed(2);
              savePrice = actualPrice - prod.Prod_price;
              updatedSavePrice = savePrice % 1 === 0 ? savePrice : savePrice.toFixed(2);

              prodType = prod.Prod_type.length === 0 ? '' : ` - ${prod.Prod_type}`;


              return (
                <div className="col-lg-3 col-md-6 mb-5">
                  <div className="card mx-2 pt-3">
                    <img className="mx-auto rounded" src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} width="190" height="190" alt="not found" />
                    <div className="card-body text-secondary">
                      <div className="py-2 fs-4 fw-bold text-center text-success">
                        {prod.Prod_name}{prodType}
                      </div>
                      <div>MRP: &#8377;<s>{actualPrice}</s></div>

                      <h6 className="text-dark">Price: &#8377;{prod.Prod_price} <span className="text-secondary">(You Save: &#8377;{updatedSavePrice} / {prod.Measure})</span></h6>

                      <div className="text-success">Offer: <span className="bg-success text-success bg-opacity-25 p-1">{prod.Prod_offer}% OFF</span></div>

                      <div>(Shipping charge: &#8377;100)</div><br />

                      <NavLink to={`./view_product/${prod.Prod_id}`} className="btn text-success border border-success-subtle me-2">View details <i className="fa fa-arrow-circle-right"></i></NavLink>

                      <button className="btn btn-success" onClick={() => updateCart(prod.Prod_id, prod.Prod_name, prod.Prod_price)}><i className="fa fa-shopping-basket"></i> Add to cart</button><br /><br />

                      <div className="text-secondary"><i className="fa fa-user"></i> {prod.Farmer_name}, {prod.Farmer_village}, {prod.Farmer_district}</div>                   

                      <div className="text-danger">*{prod.Prod_qty}{prod.Measure} in stock</div>

                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <Footer />
    </>
  )

}

export default Dashboard
