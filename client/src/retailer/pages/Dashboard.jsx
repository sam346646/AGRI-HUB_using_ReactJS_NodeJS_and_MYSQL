import Axios from "axios";
import { React, useState, useEffect } from "react"
import { NavLink } from "react-router-dom";


function Dashboard() {

  const [prodList, setProdList] = useState([])
  let actualPrice = 0;
  let savePrice = 0;
  let updatedSavePrice = 0;
  let prodType = '';

  useEffect(() => {
    Axios.get('http://localhost:8000/product/getall').then((response) => {
      setProdList(response.data)
    })
  }, [])


  return (
    <div className="retailer_content_area px-5 pt-5">
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
                    <NavLink to="" className="btn btn-success"><i className="fa fa-shopping-basket"></i> Add to cart</NavLink><br /><br />

                    <div className="text-secondary"><i className='fa fa-truck'></i> Order now, Get it delivered Tomorrow</div>

                    <div className="text-danger">*{prod.Prod_qty}{prod.Measure} in stock</div>

                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )

}

export default Dashboard