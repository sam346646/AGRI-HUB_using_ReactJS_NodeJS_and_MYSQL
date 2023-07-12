import { React, useState, useEffect, useContext } from 'react'
import { AppContext } from '../AppContext';

function SizeContainer({ qty, measure, price, offer, custom }) {

    const { selectedQuantity, setSelectedQuantity } = useContext(AppContext);

    const [customQty, setCustomQty] = useState(qty);
    const [total, setTotal] = useState((qty * price / ((100 - offer) / 100)).toFixed(2));
    const [qtyStatus, setQtyStatus] = useState(true);
    const [updatedPrice, setUpdatedPrice] = useState(Math.round(total - total * offer / 100))
    const [updatedOffer, setUpdatedOffer] = useState(offer)
    const [errMessage, setErrMessage] = useState('')

    const quantityHandler = (e) => {
        const newCustomQty = e.target.value;
        var newOffer = offer;
        var newTotal;

        if (newCustomQty >= 100) {
            newOffer = offer;
            setUpdatedOffer(prevNewOffer => newOffer);
        }
        else {
            price=price+0.01*price;
            newOffer = offer - 1;
            setUpdatedOffer(prevNewOffer => newOffer);
        }

        setCustomQty(newCustomQty);
        newTotal = (newCustomQty * price / ((100 - newOffer) / 100)).toFixed(2);
        setTotal(newTotal);
        setUpdatedPrice(prevUpdatedPrice => Math.round(newTotal - ((newTotal * newOffer) / 100)));
        if ((newCustomQty >= 50 && newCustomQty <= qty * 2 - 50) || newCustomQty == (qty * 2)) {
            setSelectedQuantity(newCustomQty);
            setErrMessage(``)
            setQtyStatus(true);
        }
        else {
            setSelectedQuantity('');
            setQtyStatus(false);
            setErrMessage(`Please select a quantity between 51${measure} to ${qty * 2 - 50}${measure}!`)
            const timeout = setTimeout(() => {
                setErrMessage(``)
            }, 7000);
            
        }
    };

    const customQuantityElement = [
        <span className='form-group'>
            <div className='form-label text-secondary'>Quantity:</div>
            <input type='text' name="customQty" value={customQty} onChange={quantityHandler} className='form-control w-50 text-center form-control-sm d-inline' />&nbsp;
        </span>
    ]

    const ChangeQuantity = () => {
        if ((customQty >= 50 && customQty <= qty * 2 - 50) || customQty == (qty * 2)) {
            setSelectedQuantity(customQty);
        }
        else {
            setSelectedQuantity('');
        }
    };


    return (
        <>
            <button className="btn text-start border border-dark" type="button" onClick={ChangeQuantity}>
                <div className="row">
                    <div className="col-5">
                        <h6>{(custom === true) ? customQuantityElement : qty}{measure}</h6>
                    </div>
                    {
                        (qtyStatus === true) ?
                            <div className="col-7">
                                <h6>
                                    &#8377;<span>{updatedPrice}</span>
                                    <span className="text-secondary">(&#8377;{(updatedPrice/customQty).toFixed(1)} / {measure})</span>
                                </h6>
                                <s className="text-secondary">&#8377; {total}</s>
                                &emsp;<span className="bg-success text-success bg-opacity-25 px-2">{updatedOffer}% OFF</span>
                            </div>
                            :
                            null
                    }
                </div>
            </button>
            <span className="text-danger ps-2">{errMessage}</span>
        </>
    )
}

export default SizeContainer
