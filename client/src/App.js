import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import './assets/css/mystyle.css';

import Navbar from "./farmer/pages/Navbar";
import Dashboard from "./farmer/pages/Dashboard";
import ViewProducts from "./farmer/pages/ViewProducts";
import SellProduct from "./farmer/pages/SellProduct";
import UpdateProduct from "./farmer/pages/UpdateProduct";
import DeleteProduct from "./farmer/pages/DeleteProduct";
import UpdateOrder from "./farmer/pages/UpdateOrder";
import ViewRetailerOrders from "./farmer/pages/ViewRetailerOrders";
import ReportIssue from './farmer/pages/ReportIssue';
import ManageProfileFarmer from './farmer/pages/ManageProfile';
import ViewReports from './farmer/pages/ViewReports';

import NavbarRetailer from "./retailer/pages/Navbar"
import DashboardRetailer from "./retailer/pages/Dashboard"
import ViewProductRetailer from "./retailer/pages/ViewProduct"
import ViewCategoryWiseProductRetailer from "./retailer/pages/ViewCategoryWiseProduct"
import ViewOrder from './retailer/pages/ViewOrder';
import ManageOrders from './retailer/pages/ManageOrders';
import ViewCart from './retailer/pages/ViewCart';
import ManageProfile from './retailer/pages/ManageProfile';
import ReportIssueRetailer from './farmer/pages/ReportIssue';

import NavbarAdmin from "./admin/pages/Navbar"
import DashboardAdmin from "./admin/pages/Dashboard"
import SolveQuery from './admin/pages/SolveQuery';
import ViewQueries from './admin/pages/ViewQueries';
import ViewRetailers from './admin/pages/ViewRetailers';
import ViewFarmers from './admin/pages/ViewFarmers';
import ViewAdminOrders from './admin/pages/ViewAdminOrders';

import Login from './Login';

function App() {

  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  useEffect(() => {
    setUserType(localStorage.getItem('userType'));
  }, []);

  // localStorage.setItem('userType','')
  // localStorage.removeItem('userType')

  return (
    <BrowserRouter>
      <Routes>
        {/* Farmer side */}
        {userType === 'farmer' && (
          <Route path="/farmer" element={<Navbar />}>
            <Route index element={<Dashboard />} />
            <Route path="sell_product" element={<SellProduct />} />
            <Route path="view_product" element={<ViewProducts />} />
            <Route path="update_product/:id" element={<UpdateProduct />} />
            <Route path="delete_product/:id" element={<DeleteProduct />} />
            <Route path="update_order/:id" element={<UpdateOrder />} />
            <Route path="view_retailer_orders/:ch" element={<ViewRetailerOrders />} />
            <Route path="report_issue/:ch" element={<ReportIssue />} />
            <Route path="manage_profile/:manageProfileCh" element={<ManageProfileFarmer />} />
            <Route path="reports/:menuCh" element={<ViewReports />} />
          </Route>
        )}

        {/* Admin side */}
        {userType === 'admin' && (
          <Route path="/admin" element={<NavbarAdmin />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="solve_query/:id" element={<SolveQuery />} />
            <Route path="add_category" element={<SolveQuery withoutIssue={true} />} />
            <Route path="view_queries" element={<ViewQueries fromNavbar={true} />} />
            <Route path="view_retailers" element={<ViewRetailers />} />
            <Route path="view_farmers" element={<ViewFarmers />} />
            <Route path="view_orders" element={<ViewAdminOrders />} />
          </Route>
        )}

        {/* Retailer side */}
        {userType === 'retailer' && (
          <Route path="/retailer" element={<NavbarRetailer />}>
            <Route index element={<DashboardRetailer />} />
            <Route path="view_product/:id" element={<ViewProductRetailer />} />
            <Route path="view_category_wise_product" element={<ViewCategoryWiseProductRetailer />} />
            <Route path="view_cart" element={<ViewCart />} />
            <Route path="view_orders" element={<ViewOrder choice={1} />} />
            <Route path="view_retailer_orders/:ch" element={<ManageOrders />} />
            <Route path="report_issue/:ch" element={<ReportIssueRetailer />} />
            <Route path="manage_profile/:manageProfileCh" element={<ManageProfile />} />
          </Route>
        )}

        {userType === null && (
          <Route path="/*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
