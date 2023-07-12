import Axios from 'axios'
import { React, useState, useEffect, useContext } from "react"
import { useParams, NavLink } from "react-router-dom";
import { AppContext } from '../AppContext';

import PurchaseSize from '../components/PurchaseSize';
import CategoryContainer from '../components/CategoryContainer';

function ViewProduct(props) {

    const { id } = useParams();
    const { selectedQuantity, setSelectedQuantity } = useContext(AppContext);

    let prodType = '';

    const [prodList, setProdList] = useState([])
    const [firstRender, setFirstRender] = useState(true)

    const [updatedOffer, setUpdatedOffer] = useState()
    const [actualPrice, setActualPrice] = useState()
    const [discountedPrice, setDiscountedPrice] = useState()

    useEffect(() => {
        Axios.get(`http://localhost:8000/product/get/${id}`).then((response) => {
            setProdList(response.data);
            setFirstRender(false);
        })

        setSelectedQuantity(50)
       
    }, [])


    useEffect(()=>{
        if (firstRender) return;

        setUpdatedOffer(prodList[0].Prod_offer);
        let temp=(selectedQuantity * prodList[0].Prod_price / ((100 - prodList[0].Prod_offer) / 100)).toFixed(2);
        setActualPrice(temp)
        setDiscountedPrice(Math.round(temp - temp * prodList[0].Prod_offer / 100))
    },[prodList])


    useEffect(() => {
        let newOffer = 0;
        let newActualPrice = 0;
        let price=0;

        if (firstRender) return;

        if (selectedQuantity >= 100) {
            newOffer = prodList[0].Prod_offer + 1;
            price=prodList[0].Prod_price-0.01*prodList[0].Prod_price;
            setUpdatedOffer(newOffer);
        }
        else {
            newOffer = prodList[0].Prod_offer;
            price=prodList[0].Prod_price;
            setUpdatedOffer(newOffer);
        }

        newActualPrice = (selectedQuantity * price / ((100 - newOffer) / 100)).toFixed(2);
        setActualPrice((selectedQuantity * price / ((100 - newOffer) / 100)).toFixed(2))
        setDiscountedPrice(Math.round(newActualPrice - newActualPrice * newOffer / 100))

    }, [selectedQuantity])

    const placeOrder=(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('retailer_id', 1)
        formdata.append('prod_id', id)
        formdata.append('qty', selectedQuantity)
        formdata.append('price', discountedPrice)
        Axios.post('http://localhost:8000/order/insert', formdata);
    }

    return (
        <div className="retailer_content_area">
            <div className="container row p-5">

                <div className="col-md-3 mb-3">
                    <CategoryContainer />
                </div>

                {
                    prodList.map((prod) => {
                        prodType = prod.Prod_type.length === 0 ? '' : ` - ${prod.Prod_type}`;
                        return (
                            <>
                                <div className="col-md-5 mb-3">
                                    <div id="carousel_img" class="carousel slide carousel-dark" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carousel_img" data-bs-slide-to="0" className="active bg-success" aria-current="true"></button>
                                            <button type="button" data-bs-target="#carousel_img" data-bs-slide-to="1" className="bg-success"></button>
                                            <button type="button" data-bs-target="#carousel_img" data-bs-slide-to="2" className="bg-success"></button>
                                        </div>

                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <center><img className="rounded" width='520' height='520' src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="not found" /></center>
                                            </div>
                                            <div className="carousel-item">
                                                <center><img className="rounded" width='520' height='520' src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="not found" /></center>
                                            </div>
                                        </div>

                                        <button className="carousel-control-prev" type="button" data-bs-target="#carousel_img" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon text-danger"></span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carousel_img" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div >
                                </div>


                                <div className="col-md-4 ps-4 text-secondary">
                                    <div className="py-2 fs-2 fw-bold text-success">
                                        {prod.Prod_name}{prodType}
                                    </div>

                                    <h5 className="text-dark fw-bold">Price: &#8377;{discountedPrice} <span className="fw-normal text-secondary">(&#8377;{discountedPrice/selectedQuantity} / {prod.Measure})</span></h5>

                                    <div>MRP: &#8377;<s>{actualPrice}</s> <span className="bg-success text-success bg-opacity-25 p-1">{updatedOffer}% OFF</span></div>

                                    <div className='fs-6'><i className='fa fa-gift fw-bold'></i> You can save &#8377;{Math.round(actualPrice-discountedPrice)} in this order.</div>

                                    <div>(Shipping charge: &#8377;100)</div><br/>

                                    <div class="fw-bold text-dark">Pack size</div>
                                    <PurchaseSize qty={prod.Prod_qty} measure={prod.Measure} price={prod.Prod_price} offer={prod.Prod_offer} />
                                    {(selectedQuantity) ? <span className='text-success ps-2'>{selectedQuantity} Units is selected.</span> : null}

                                    <br /><NavLink className="btn btn-success btn-lg mb-1 ms-4" to=""><i class="fa fa-shopping-basket"></i> Add to cart</NavLink>&emsp;
                                    <button className="btn btn-secondary btn-lg" onClick={placeOrder}><i class="fa fa-tags"></i> Buy now</button>

                                    <br /><br /><div className="text-secondary"><i className='fa fa-truck'></i> Order now, Get it delivered Tomorrow</div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewProduct
