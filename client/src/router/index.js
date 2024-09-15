import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Register/Signup";
import AdminLogin from "../pages/Adminlogin/AdminLogin";
import AdminHome from "../pages/AdminHome/AdminHome"
import Navbar from "../components/NavBar/Navbar";
import About from "../pages/About/About";
import Product from "../pages/Product/Product";
import Contact from "../pages/Contact/Contact";
import Services from "../pages/Services/Services";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminProfile from "../pages/AdminHome/Adminprofile";
import Addproduct from "../pages/AddProduct/Addproduct";
import ProductList from "../pages/ProductList/ProductList";
import UserList from "../pages/AdminHome/UserList/UserList";
import AdminProduct from "../pages/AdminHome/ProductList/AdminProduct";
import UpdateProduct from "../pages/AdminHome/UpdateProduct/UpdateProduct";
import BuyProduct from "../pages/BuyProduct/BuyProduct";
import Payment from "../pages/Payment/Payment";
import Successful from "../pages/Payment/Successful";
import Myorders from "../pages/BuyProduct/Myorders";
import Orderlist from "../pages/AdminHome/OrderList/Orderlist";


function index() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/product" element={<Product />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/adminproduct" element={<AdminProduct />} />
          <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
          <Route path="/buyproduct/:productId" element={<BuyProduct />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/successful" element={<Successful />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/orderslist" element={<Orderlist />} />
          
          

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default index;
