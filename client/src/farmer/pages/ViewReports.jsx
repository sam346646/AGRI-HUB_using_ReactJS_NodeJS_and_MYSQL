import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import OptionMenuContainer from '../components/OptionMenuContainer';
import Footer from '../pages/Footer';
import ViewProfitReport from './ViewProfitReport';

ChartJS.register(ArcElement, Tooltip, Legend);

function ViewReports() {

  const { menuCh }=useParams()

  const menuoptions = [
    { title: 'Product Sales', ch: '/farmer/reports/1', icon: 'pie-chart' },
    { title: 'Profit', ch: '/farmer/reports/2', icon: 'ticket' },
  ];

  const dropdownoptions = ['Last Year', 'Last Quarter(3-month)', 'Last Month', 'All time']

  const [selectedOption, setSelectedOption] = useState(3)
  const [isContentAvailiable, setIsContentAvailiable] = useState(true)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  let currentDate;
  let selectedFromDate;
  let selectedToDate;


  function getRandomColor(len) {
    let colors = ['#FF6384', '#36A2EB', '#FFCE56']
    const letters = '0123456789ABCDEF';
    let c;

    for (let i = 0; i < len - 3; i++) {
      c = '#'
      for (let i = 0; i < 6; i++) {
        c += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(c);
    }
    return colors;
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: getRandomColor(3),
      },
    ],
  });



  useEffect(() => {
    getReport()
  }, []);

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

  const getReport = (op) => {
    let ch;
    if (op == 1) {
      ch = 10;
      selectedFromDate = new Date(fromDate).toISOString().split('T')[0];
      selectedToDate = new Date(toDate).toISOString().split('T')[0];
    }
    else {
      currentDate = new Date()
      selectedToDate = currentDate.toISOString().split('T')[0];

      if (selectedOption == 3) {
        selectedFromDate = 0;
      }

      else if (selectedOption == 0) {
        const previousYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
        selectedFromDate = previousYearDate.toISOString().split('T')[0];
      }

      else if (selectedOption == 1) {
        let previousQuarterYear;
        let previousQuarterMonth = currentDate.getMonth() - 3;
        if (previousQuarterMonth < 0) {
          previousQuarterMonth = 12 + previousQuarterMonth;
          previousQuarterYear = currentDate.getFullYear() - 1;
        }
        else {
          previousQuarterYear = currentDate.getFullYear();
        }
        const previousQuarterDate = new Date(previousQuarterYear, previousQuarterMonth, currentDate.getDate());
        selectedFromDate = previousQuarterDate.toISOString().split('T')[0];
      }

      else if (selectedOption == 2) {
        const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        if (currentDate.getMonth() === 0) {
          previousMonthDate.setFullYear(currentDate.getFullYear() - 1);
          previousMonthDate.setMonth(11);
        }
        selectedFromDate = previousMonthDate.toISOString().split('T')[0];
      }
      ch = selectedOption;
    }

    Axios.post(`http://localhost:8000/report/getsales/${ch}`, { from: selectedFromDate, to: selectedToDate }).then((response) => {
      if (response.data.length == 0) {
        setIsContentAvailiable(false);
      }
      else {
        setIsContentAvailiable(true);
      }
      const productNames = response.data.map((product) => product.Prod_name);
      const quantities = response.data.map((product) => product.Quantity);

      setChartData((prevData) => ({
        ...prevData,
        labels: productNames,
        datasets: [
          {
            ...prevData.datasets[0],
            data: quantities,
            backgroundColor: getRandomColor(productNames.length),
          },
        ],
      }));
    });
  }


  return (
    <>
      <div className='farmer_content_area container-fluid p-4'>
        <div className="row">
          <div className="col-lg-3">
            <OptionMenuContainer title='Reports' options={menuoptions} />
          </div>

          <div className="col-lg-9 ps-3">
            {(menuCh == 1) ?
              <>
                <Breadcrumbs breadcrumbs_title='Report - Product Sales' breadcrumbs_icon='flask' />
                <div className="row">
                  <div className="col-6">
                    {(isContentAvailiable) ?
                      <div className='small-chart-container w-sm-report' style={{ width: '600px', height: '400px' }}>
                        <Pie data={chartData} options={options} />
                      </div>
                      :
                      <div className='text-danger'>* No orders availiable in between selected dates.</div>
                    }
                  </div>
                  <div className="col-lg-6">
                    <div className='fw-bold fs-3 text-center mb-3'>Customize Report</div>

                    <div className="form-group mb-3">
                      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="form-select" required>
                        {dropdownoptions.map((op, index) => (
                          <option key={index} value={index}>{op}</option>
                        ))}
                      </select>
                    </div>

                    <button onClick={() => getReport(0)} className="btn btn-secondary form-control">Get Report</button>

                    <div className='mt-4 fw-bold fs-5 text-center mb-2'>----- OR -----</div>

                    <div class="mb-3">
                      <label class="form-label">From</label>
                      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} class="form-control" />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">To</label>
                      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} class="form-control" />
                    </div>

                    <button onClick={() => getReport(1)} className="btn btn-secondary form-control">Get Report</button>
                  </div>
                </div>
              </>
              :
              <ViewProfitReport />
            }
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewReports