import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Axios from 'axios';

import Breadcrumbs from '../components/Breadcrumbs';

ChartJS.register(ArcElement, Tooltip, Legend);

function ViewProfitReport() {

    const [selectedOption, setSelectedOption] = useState(3)
    const [isContentAvailiable, setIsContentAvailiable] = useState(false)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [name, setName] = useState('')
    const [prodList, setProdList] = useState([])
    const [orderList, setOrderList] = useState([])

    const [chartDataOne, setChartDataOne] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
            },
        ],
    })

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const dataset = context.dataset.data;
                        const total = dataset.reduce((acc, current) => acc + current);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    useEffect(() => {
        Axios.post(`http://localhost:8000/report/getProducts`, { usrId: localStorage.getItem('usrId') }).then((response) => {
            setProdList(response.data);
        })
    }, []);

    useEffect(() => {
        let totalPrice = 0
        let totalProfit = 0
        orderList.map((order) => {
            totalPrice += order.Price
            totalProfit += order.Profit
        })
        setChartDataOne(
            {
                labels: ['Price', 'Profit'],
                datasets: [
                    {
                        data: [totalPrice, totalProfit],
                        backgroundColor: ['#FF6384', '#36A2EB'],
                    },
                ],
            })
    }, [orderList]);

    const getReport = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setIsFirstRender(false);
        const selectedItem = prodList.find(prod => prod.id == selectedValue);
        setName(selectedItem.name)
        Axios.post(`http://localhost:8000/report/getProfit/${selectedValue}`).then((response) => {
            setOrderList(response.data);
            setIsContentAvailiable(response.data.length > 0);
        });
    }


    return (
        <div>
            <Breadcrumbs breadcrumbs_title='Report - Product Wise Profit' breadcrumbs_icon='flask' />
            <div className="row">
                <div className="col-6">
                    <div className='fw-bold fs-3 text-center mb-3'>Customize Report</div>

                    <div className="form-group mb-3">
                        <select value={selectedOption} onChange={getReport} className="form-select" required>
                            {
                                prodList.map((prod, index) => (
                                    <option key={index} value={prod.id}>
                                        {prod.name} - {new Date(prod.date).toISOString().split('T')[0]}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {(!isFirstRender) ?
                        <>
                            <div className='text-center fw-bold fs-3 mt-5'>{name}</div>
                            {
                                (isContentAvailiable) ?
                                    <div className='small-chart-container' style={{ width: '600px', height: '400px' }}>
                                        <Pie data={chartDataOne} options={options} className='mx-auto' />
                                    </div>
                                    :
                                    <div className='text-danger text-danger'>*No orders availiable for this product.</div>
                            }

                        </>
                        :
                        <>
                            <div className='text-center fw-bold fs-3 mb-3'>Demo</div>
                            <div className='text-danger'>*This is just a demo. Please choose a product to get to know the profit vs price report.</div>
                            <div className='small-chart-container mx-auto' style={{ width: '600px', height: '400px' }}>
                                <Pie data={{
                                    labels: ['Price', 'Profit'],
                                    datasets: [
                                        {
                                            data: [10000, 1000],
                                            backgroundColor: ['#FF6384', '#36A2EB'],
                                        },
                                    ],
                                }} options={options} className='mx-auto' />
                            </div>
                        </>
                    }
                </div>
                <div className="col-6">
                    {
                        (isContentAvailiable) ?
                            <div className='mx-auto'>
                                <div className='text-center fw-bold fs-3 mb-3'>Different orders on {name}</div>
                                {
                                    <>
                                        {
                                            orderList.map((order, index) => (
                                                <>
                                                    <div className='text-center'>{order.Retailer_name}</div>
                                                    <div key={index} className='small-chart-container mx-auto mb-3' style={{ width: '300px', height: '200px' }}>
                                                        <Pie data={{
                                                            labels: ['Price', 'Profit'],
                                                            datasets: [
                                                                {
                                                                    data: [order.Price, order.Profit],
                                                                    backgroundColor: ['#FF6384', '#36A2EB'],
                                                                },
                                                            ],
                                                        }} options={options} className='mx-auto' />
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </>
                                }
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewProfitReport
