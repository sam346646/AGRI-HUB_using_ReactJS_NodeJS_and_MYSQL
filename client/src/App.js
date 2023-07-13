import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/css/mystyle.css';

import Navbar from "./farmer/pages/Navbar";
import Dashboard from "./farmer/pages/Dashboard";
import ViewProduct from "./farmer/pages/ViewProducts";
import SellProduct from "./farmer/pages/SellProduct";
import UpdateProduct from "./farmer/pages/UpdateProduct";
import DeleteProduct from "./farmer/pages/DeleteProduct";
import UpdateOrder from "./farmer/pages/UpdateOrder";
import ViewRetailerOrders from "./farmer/pages/ViewRetailerOrders";

import NavbarRetailer from "./retailer/pages/Navbar" 
import DashboardRetailer from "./retailer/pages/Dashboard" 
import ViewProductRetailer from "./retailer/pages/ViewProduct" 
import ViewCategoryWiseProductRetailer from "./retailer/pages/ViewCategoryWiseProduct" 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Farmer side */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Dashboard />} />
          <Route path="sell_product" element={<SellProduct />} />
          <Route path="view_product" element={<ViewProduct />} />
          <Route path="update_product/:id" element={<UpdateProduct />} />
          <Route path="delete_product/:id" element={<DeleteProduct />} />
          <Route path="update_order/:id" element={<UpdateOrder />} />
          <Route path="view_retailer_orders" element={<ViewRetailerOrders />} />
        </Route>

        {/* Retailer side */}
        <Route path="/retailer" element={<NavbarRetailer />}>
          <Route index element={<DashboardRetailer />} />
          <Route path="view_product/:id" element={<ViewProductRetailer />} />
          <Route path="view_category_wise_product/:categoryId" element={<ViewCategoryWiseProductRetailer />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
