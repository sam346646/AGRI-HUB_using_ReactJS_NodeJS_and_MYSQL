import Axios from 'axios'
import { React, useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from '../AppContext';

import PurchaseSize from '../components/PurchaseSize';
import Footer from './Footer';

function ViewProduct() {

    const { id } = useParams();
    const navigate = useNavigate()

    const { selectedQuantity, setSelectedQuantity } = useContext(AppContext);

    let prodType = '';

    const [prodList, setProdList] = useState([])
    const [firstRender, setFirstRender] = useState(true)
    const [verifyCode, setVerifyCode] = useState('')

    const [updatedOffer, setUpdatedOffer] = useState()
    const [actualPrice, setActualPrice] = useState()
    const [discountedPrice, setDiscountedPrice] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        Axios.get(`http://localhost:8000/product/get/${id}`).then((response) => {
            setProdList(response.data);
            setFirstRender(false);
        })

        setSelectedQuantity(0)

    }, [])


    useEffect(() => {
        if (firstRender) return;

        setUpdatedOffer(prodList[0].Prod_offer);
        let temp = (selectedQuantity * prodList[0].Prod_price / ((100 - prodList[0].Prod_offer) / 100)).toFixed(2);
        setActualPrice(temp)
        setDiscountedPrice(Math.round(temp - temp * prodList[0].Prod_offer / 100))
    }, [prodList])


    useEffect(() => {
        let newOffer = 0;
        let newActualPrice = 0;
        let price = 0;

        if (firstRender) return;

        if (selectedQuantity >= 100) {
            newOffer = prodList[0].Prod_offer + 1;
            price = prodList[0].Prod_price - 0.01 * prodList[0].Prod_price;
            setUpdatedOffer(newOffer);
        }
        else {
            newOffer = prodList[0].Prod_offer;
            price = prodList[0].Prod_price;
            setUpdatedOffer(newOffer);
        }

        newActualPrice = (selectedQuantity * price / ((100 - newOffer) / 100)).toFixed(2);
        setActualPrice((selectedQuantity * price / ((100 - newOffer) / 100)).toFixed(2))
        setDiscountedPrice(Math.round(newActualPrice - newActualPrice * newOffer / 100))

    }, [selectedQuantity])

    const placeOrder = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('retailer_id', localStorage.getItem('usrId'))
        formdata.append('prod_id', id)
        formdata.append('qty', selectedQuantity)
        formdata.append('price', discountedPrice)
        Axios.post('http://localhost:8000/order/insert', formdata);
        navigate("../view_orders");
    }

    const updateCart = () => {
        const formdata = new FormData();
        formdata.append('usrId', localStorage.getItem('usrId'))
        formdata.append('prodId', id)
        formdata.append('cartQty', selectedQuantity)
        formdata.append('cartPrice', discountedPrice)
        Axios.post('http://localhost:8000/retailer/insertCart', formdata).then((response) => {
            if (response.data.cartStatus == '') {
                setMessage(`You've successfully added product to your cart!`)
            }
            else {
                setMessage(response.data.cartStatus + '!')
            }
            const timeoutId = setTimeout(() => {
                navigate("/retailer");
                setMessage('');
            }, 5000);
        });
    }

    const cancelHandle = () => {
        setVerifyCode('')
    }
    return (
        <>
            <div className="retailer_content_area">
                <div className="container row p-5 mx-auto plr-sm plr-md">

                    {
                        prodList.map((prod) => {
                            prodType = prod.Prod_type.length === 0 ? '' : ` - ${prod.Prod_type}`;
                            return (
                                <>
                                    <div className="col-md-6 mb-3">
                                        <div id="carousel_img" class="carousel slide carousel-dark" data-bs-ride="carousel">
                                            <div className="carousel-indicators">
                                                <button type="button" data-bs-target="#carousel_img" data-bs-slide-to="0" className="active bg-success" aria-current="true"></button>
                                                <button type="button" data-bs-target="#carousel_img" data-bs-slide-to="1" className="bg-success"></button>
                                                <button type="button" data-bs-target="#carousel_img" data-bs-slide-to="2" className="bg-success"></button>
                                            </div>

                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <center><img className="rounded img-sm img-md" width='520' height='520' src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="not found" /></center>
                                                </div>
                                                <div className="carousel-item">
                                                    <center><img className="rounded img-sm img-md" width='520' height='520' src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="not found" /></center>
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


                                    <div className="col-md-5 ps-5 text-secondary plr-sm plr-md">
                                        {message && <div className="position-fixed start-50 translate-middle-x text-success mb-3 fw-bold fs-4" style={{ zIndex: "1000", top: '10%' }}><span className="bg-success bg-opacity-25 p-2 rounded">{message}</span></div>}
                                        <div className="py-2 fs-2 fw-bold text-success">
                                            {prod.Prod_name}{prodType}
                                        </div>

                                        <h5 className="text-dark fw-bold">Price: &#8377;{discountedPrice} <span className="fw-normal text-secondary">(&#8377;{(discountedPrice / selectedQuantity).toFixed(2)} / {prod.Measure})</span></h5>

                                        <div>MRP: &#8377;<s>{actualPrice}</s> <span className="bg-success text-success bg-opacity-25 p-1">{updatedOffer}% OFF</span></div>

                                        <div className='fs-6 text-success'><i className='fa fa-gift fw-bold'></i> You can save &#8377;{Math.round(actualPrice - discountedPrice)} in this order.</div>

                                        <div>(Shipping charge: &#8377;100)</div>
                                        
                                        <div className="text-secondary"><i className='fa fa-truck'></i> Order now, Get it delivered Tomorrow</div><br />

                                        <div class="fw-bold text-dark">Pack size</div>
                                        <PurchaseSize qty={prod.Prod_qty} measure={prod.Measure} price={prod.Prod_price} offer={prod.Prod_offer} />
                                        {(selectedQuantity) ? <span className='text-success ps-2'>{selectedQuantity} Units is selected.</span> : null}


                                        <div className='mt-3 mx-auto'>
                                            <button className="btn btn-success btn-lg mb-1" onClick={() => updateCart()}><i class="fa fa-shopping-basket"></i> Add to cart</button>&emsp;

                                            <button type="button" class="btn btn-secondary btn-lg" data-bs-toggle="modal" data-bs-target="#orderModal">
                                                <i class="fa fa-tags"></i> Buy now
                                            </button>
                                        </div>

                                        <div class="modal fade" id="orderModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdroporderModalLabelLabel">You are one step away from buying</h1>
                                                        <button type="button" onClick={cancelHandle} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body mx-5">
                                                        <div className='float-end'>
                                                            MRP: <s>Rs.{actualPrice}</s><br />
                                                            {selectedQuantity} * {discountedPrice / selectedQuantity} -&gt; <span className='fs-4 text-success'>Rs. {discountedPrice}</span><br />
                                                            <span className='text-success text-opacity-75'><i className='fa fa-gift'></i> saved Rs. {Math.round(actualPrice - discountedPrice)}</span>
                                                        </div>
                                                        <div>
                                                            <div className='text-dark fs-4 fw-bold'>{prod.Prod_name}</div>
                                                            Quantity: {selectedQuantity}
                                                        </div>

                                                        <div className='text-center mt-5'>
                                                            <div>[{discountedPrice}] <br /><span className='text-danger'>Enter number shown above ....</span></div>
                                                            <input type='number' value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} className='form-control form-control-sm w-25 mx-auto' />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={placeOrder} disabled={Number(verifyCode) !== Number(discountedPrice)}>Buy now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <br /><br />
                                        <div className="text-secondary"><i className="fa fa-user"></i> <b>Farmer:</b> {prod.Farmer_name}, {prod.Farmer_area}, {prod.Farmer_village}, {prod.Farmer_district}</div> 
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewProduct
