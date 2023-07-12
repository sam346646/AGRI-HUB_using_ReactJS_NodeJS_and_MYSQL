import { React } from 'react'
import SizeContainer from './SizeContainer'

function PurchaseSize({ qty, measure, price, offer }) {
    

    return (
        <div class="d-grid gap-2">
            {(qty > 100) ? <SizeContainer qty={qty/2} measure={measure} price={price-0.01*price} offer={offer+1} custom={true} /> : null }

            {(qty >= 100) ? <SizeContainer qty={50} measure={measure} price={price} offer={offer} /> : null }

            {(qty >= 100) ?<SizeContainer qty={qty} measure={measure} price={price-0.01*price} offer={offer+1} /> : <SizeContainer qty={qty} measure={measure} price={price} offer={offer} /> }

            {(qty >= 50) && (qty < 100) ? <span className='text-danger ps-2'>Only {qty}{measure} pack size availiable</span> : null }
            
            {(qty === 100) ? <span className='text-danger ps-2'>Only {qty / 2}{measure} and {qty}{measure} pack sizes are availiable</span> : null }
        </div>
    )
}

export default PurchaseSize
