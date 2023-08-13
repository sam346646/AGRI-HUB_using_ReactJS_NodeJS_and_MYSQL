import { React } from 'react'

function OrderStatusContainer({ status }) {

    const confirms = (s) => {
        return (
            <>
                <span className='text-success'><i className='fa fa-check-circle-o'></i> {s}</span>
            </>
        )
    }

    const waitings = (s) => {
        return (
            <>
                <span className='text-danger'><i className='fa fa-spinner'></i> {s}</span>
            </>
        )
    }

    const cancels = (s) => {
        return (
            <>
                <span className='text-danger'><i className='fa fa-exclamation-triangle'></i> {s}</span>
            </>
        )
    }

    const cstatuses = [
        'Retailer placed order.',
        'Farmer confirmed order.',
        `Waiting for retailer's confirmation.`,
        'Retailer confirmed order.',
        'Farmer cancelled the order.',
        'Retailer cancelled the order.',
        'Order delivered successfully.'
    ]

    const statuses = [
        `Waiting for farmer's approval.`,
        `Order confirmed, It'll be delivered soon...`,
        'Shipping charge increased to Rs.',
        'You cancelled the order'
    ]

    return (
        <>

            {(status === cstatuses[0]) ? waitings(statuses[0]) : null}

            {(status === cstatuses[1] || status === cstatuses[3]) ? confirms(statuses[1]) : null}

            {(status === cstatuses[2]) ? cancels(statuses[2]) : null}

            {(status === cstatuses[4]) ? cancels(status) : null}

            {(status === cstatuses[5]) ? cancels(statuses[3]) : null}

            {(status === cstatuses[6]) ? <span className='text-success'><i className='fa fa-magic'></i> Congratulations! Your order has been successfully completed!</span> : null}
        </>
    )
}

export default OrderStatusContainer
