import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/order";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Signup from "./pages/registrattion/SignUp";
import Login from "./pages/registrattion/Login";
import ProductInfo from "./pages/productinfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order/>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard/>
              </ProtectedRouteForAdmin>
            } />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='productinfo/:id' element={<ProductInfo/>}/>
            <Route path='/addproduct' element={
              <ProtectedRouteForAdmin>
                <AddProduct/>
              </ProtectedRouteForAdmin>
            } />
            <Route path="/updateproduct" element={<UpdateProduct/>}/>
            <Route path="/cart"  element={<Cart/>}/>
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <ToastContainer/>
        </Router>
      </MyState>
    </>
  );
}

export default App;

export const ProtectedRoute=({children})=>{
  const user=localStorage.getItem('user')
  if(user){
return children
  }else{
return <Navigate  to={'/login'}/>
  }
}
const ProtectedRouteForAdmin=({children})=>{
  const admin=JSON.parse(localStorage.getItem('user'));
  if(admin.user.email === 'akhilvarma2004@gmail.com'){
    return children;
  }else{
    return <Navigate to={'/login'}/>
  }
}