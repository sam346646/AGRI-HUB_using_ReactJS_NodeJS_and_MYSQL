import React, { useState, useEffect } from 'react'
import ViewOrder from '../components/ViewOrder'
import Breadcrumbs from '../components/Breadcrumbs'
import { useParams } from 'react-router-dom';

function ViewRetailerOrders() {
  const { ch } = useParams();

  const [title, setTitle] = useState('Pending')
  const [icon, setIcon] = useState('bell')
  
  useEffect(() => {
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
  }, [ch])


  return (
    <div className='content_area'>
      <Breadcrumbs breadcrumbs_title={`${title} Orders`} breadcrumbs_icon={`${icon}`} />
      <ViewOrder choice={ch} />
    </div>
  )
}

export default ViewRetailerOrders
