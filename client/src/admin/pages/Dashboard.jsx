import { React } from "react"

import Breadcrumbs from '../components/Breadcrumbs';
import Panels from '../components/Panels';

import ViewQueries from "./ViewQueries";
import Footer from "../pages/Footer";

function Dashboard() {
  return (
    <>
      <div className='content_area'>
        <Breadcrumbs breadcrumbs_title='Dashboard' breadcrumbs_icon='dashboard' />

        <div className="row mb-4">
          <Panels panel_action='admin/view_orders' panel_color='info' panel_title='Orders' panel_icon='truck' />
          <Panels panel_action='admin/view_products' panel_color='success' panel_title='Products' panel_icon='tag' />
          <Panels panel_action='admin/view_retailers' panel_color='warning' panel_title='Retailers' panel_icon='users' />
          <Panels panel_action='admin/view_farmers' panel_color='danger' panel_title='Farmers' panel_icon='user' />
        </div>

        <ViewQueries />
      </div>
    </>
  )
}

export default Dashboard
