import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import ViewOrder from '../components/ViewOrder'
import Breadcrumbs from '../components/Breadcrumbs'
import OptionMenuContainer from '../components/OptionMenuContainer'
import Footer from './Footer';

function ViewRetailerOrders() {
  const { ch } = useParams();

  const [title, setTitle] = useState()
  const [icon, setIcon] = useState()

  useEffect(() => {
    if (ch == 1) {
      setTitle('Retailer')
      setIcon('cubes')
    }
    if (ch == 2) {
      setTitle('Pending')
      setIcon('bell')
    }
    else if (ch == 3) {
      setTitle('Shippable')
      setIcon('truck')
    }
    else if (ch == 4) {
      setTitle('Cancelled')
      setIcon('exclamation-triangle')
    }
    else if (ch == 5) {
      setTitle('Completed')
      setIcon('magic')
    }
  }, [ch])

  let options=[
    { title:'All Orders', ch:'/farmer/view_retailer_orders/1', icon:'cubes' },
    { title:'Pending Orders', ch:'/farmer/view_retailer_orders/2', icon:'bell' },
    { title:'Shippable Orders', ch:'/farmer/view_retailer_orders/3', icon:'truck' },
    { title:'Completed Orders', ch:'/farmer/view_retailer_orders/5', icon:'magic' },
    { title:'Cancelled Orders', ch:'/farmer/view_retailer_orders/4', icon:'exclamation-triangle' }
  ]


  return (
    <>
    <div className='farmer_content_area container-fluid p-4'>
      <div className="row">
        <div className="col-3">
          <OptionMenuContainer title='My Orders' options={options}/>
        </div>

        <div className="col-9 ps-3">
          <Breadcrumbs breadcrumbs_title={`${title} Orders`} breadcrumbs_icon={`${icon}`} />
          <ViewOrder choice={ch} />
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default ViewRetailerOrders
