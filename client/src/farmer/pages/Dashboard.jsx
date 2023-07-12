import { React } from "react"

import Panels from '../components/Panels';
import Breadcrumbs from '../components/Breadcrumbs';
import ViewProduct from '../components/ViewProduct';

function Dashboard() {
  return (
    <div className='content_area'>
      <Breadcrumbs breadcrumbs_title='Dashboard' breadcrumbs_icon='dashboard' />

      <div className="row">
        <Panels panel_action='add_product' panel_color='info' panel_title='Products' panel_icon='tag' />
        <Panels panel_action='add_product' panel_color='success' panel_title='Categories' panel_icon='gear' />
        <Panels panel_action='add_product' panel_color='warning' panel_title='Customer' panel_icon='users' />
        <Panels panel_action='add_product' panel_color='danger' panel_title='Admin' panel_icon='user' />
      </div>

      <ViewProduct view_action="view_dashboard_orders"/>
      <ViewProduct view_action="view_dashboard_product"/>
    </div>
  )
}

export default Dashboard
