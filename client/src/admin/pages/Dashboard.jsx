import { React } from "react"

import Panels from '../components/Panels';
import Breadcrumbs from '../components/Breadcrumbs';
import ViewQueries from "./ViewQueries";

function Dashboard() {
  return (
    <div className='content_area'>
      <Breadcrumbs breadcrumbs_title='Dashboard' breadcrumbs_icon='dashboard' />

      <div className="row mb-4">
        <Panels panel_action='add_product' panel_color='info' panel_title='Farmer' panel_icon='tag' />
        <Panels panel_action='add_product' panel_color='success' panel_title='Retailer' panel_icon='gear' />
        <Panels panel_action='add_product' panel_color='warning' panel_title='Product' panel_icon='users' />
        <Panels panel_action='add_product' panel_color='danger' panel_title='Order' panel_icon='user' />
      </div>

      <Breadcrumbs breadcrumbs_title='Report Issued' breadcrumbs_icon='bell' />
      <ViewQueries />
      
    </div>
  )
}

export default Dashboard
