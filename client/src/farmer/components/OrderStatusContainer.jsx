import { React, useState } from 'react'

function OrderStatusContainer({ status }) {

    const [retailer, setRetailer] = useState('your')
    const [farmer, setFarmer] = useState('You')

    const confirms = (s) => {
        return (
            <>
                <span className='text-success'><i className='fa fa-check-circle-o'></i> {s}</span> <br />
            </>
        )
    }

    const waitings = (s) => {
        return (
            <>
                <span className='text-danger'><i className='fa fa-spinner'></i> {s}</span> <br />
            </>
        )
    }

    const cstatuses = [
        'Retailer placed order.',
        'Farmer approved order.',
        'Waiting for retailer approval.',
        'Retailer approved order.',
        'Retailer cancelled the order.',

        `Farmer cancelled the order.`
    ]

    const statuses = [
        'You approved order.',
        'Waiting for your approval.',
    ]

    return (
        <div>

            {confirms(cstatuses[0])}

            {(status === cstatuses[1]) ? confirms(statuses[0]) : null}

            {(status === cstatuses[2]) ? <> {confirms('You placed a request to change shipping charge')} {waitings(status)} </> : null}

            {(status === cstatuses[0]) ? waitings(statuses[1]) : null}


            {(status === cstatuses[3]) ? <> {confirms('You placed a request to change shipping charge')} {confirms(status)} </> : null}

            {(status === cstatuses[4]) ? <> {confirms('You placed a request to change shipping charge')} {waitings(status)} </> : null}
        </div>
    )
}

export default OrderStatusContainer
