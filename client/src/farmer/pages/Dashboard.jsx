import { React } from "react"

import Breadcrumbs from '../components/Breadcrumbs';
import ViewProducts from './ViewProducts';
import ViewOrder from "../components/ViewOrder";

function Dashboard() {
  return (

    <div className='farmer_content_area container-fluid px-5 py-4'>
      <div className="row">
        <div className="col-9">

          <Breadcrumbs breadcrumbs_title='Retailer Orders' breadcrumbs_icon='cubes' />
          <ViewOrder choice={1} />

          <ViewProducts ch={'dashboard'} />
        </div>

        <div className="col-3">
          videos
        </div>
      </div>
    </div>
  )
}

export default Dashboard
