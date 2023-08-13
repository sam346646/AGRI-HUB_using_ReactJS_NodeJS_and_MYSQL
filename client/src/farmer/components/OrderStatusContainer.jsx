import { React } from 'react'

function OrderStatusContainer({ status }) {

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

    const cancels = (s) => {
        return (
            <>
                <span className='text-danger'><i className='fa fa-exclamation-triangle'></i> {s}</span> <br />
            </>
        )
    }

    const cstatuses = [
        'Retailer placed order.',
        'Farmer confirmed order.',
        `Waiting for retailer's confirmation.`,
        'Retailer confirmed order.',
        'Retailer cancelled the order.',
        `Farmer cancelled the order.`,
        'Order delivered successfully.'
    ]

    const statuses = [
        'You confirmed order.',
        'Waiting for your confirmation.',
        'You cancelled order.',
        'Order confirmed.'
    ]

    return (
        <div>

            {confirms(cstatuses[0])}

            {(status === cstatuses[1]) ? confirms(statuses[0]) : null}

            {(status === cstatuses[2]) ? <> {confirms('You placed a request to change shipping charge')} {waitings(status)} </> : null}

            {(status === cstatuses[0]) ? waitings(statuses[1]) : null}


            {(status === cstatuses[3]) ? <> {confirms('You placed a request to change shipping charge')} {confirms(status)} </> : null}

            {(status === cstatuses[4]) ?  cancels(status) : null}

            {(status === cstatuses[5]) ? cancels(statuses[2]) : null }

            {(status === cstatuses[6]) ? <> {confirms(statuses[3])} {confirms(cstatuses[6])} </> : null }
        </div>
    )
}

export default OrderStatusContainer
