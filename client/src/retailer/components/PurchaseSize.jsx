import { React, useEffect, useContext } from 'react'
import SizeContainer from './SizeContainer'
import { AppContext } from '../AppContext';

function PurchaseSize({ qty, measure, price, offer }) {
    
    const { selectedQuantity, setSelectedQuantity } = useContext(AppContext);

    useEffect(()=>{
        (qty>50 && qty<100) ? setSelectedQuantity(qty) :setSelectedQuantity(50) 
    },[])

    return (
        <div class="d-grid gap-2">
            {(qty > 100) ? <SizeContainer qty={qty/2} measure={measure} price={price-0.01*price} offer={offer+1} custom={true} /> : null }

            {(qty >= 100) ? <SizeContainer qty={50} measure={measure} price={price} offer={offer} /> : null }

            {(qty >= 100) ?<SizeContainer qty={qty} measure={measure} price={price-0.01*price} offer={offer+1} /> : <SizeContainer qty={qty} measure={measure} price={price} offer={offer} /> }
            
        </div>
    )
}

export default PurchaseSize
