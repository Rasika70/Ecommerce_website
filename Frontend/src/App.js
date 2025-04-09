import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';

import {Puff} from 'react-loader-spinner';
import UserProductList from './components/user/UserProductList';
import Wishlist from './components/wishlist/WishList';
import NewsletterSender from './components/newsletter/Newsletter';
import About from './components/layouts/About';
import PrivacyPolicy from './components/layouts/Privacy_Policy';
import TotalSalesByDay from './components/admin/TotalSales';
//import Home1 from './components/Home1';






function App() {

  const [loading, setLoading] = useState(false);
  

  useEffect(() =>{
    setLoading(true)
    setTimeout(() =>{
      setLoading(false)
    },1000)
  },[])

  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
  

  return (
    <BrowserRouter>
      <div className="App"> 
      {
    loading &&
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set the height to cover the entire viewport
    }}>
        {/* <img src= './images/loading.png' alt="Logo"
            style={{ marginBottom: "20px" }} />
        <Puff
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="loading"
        /> */}
    </div>
        
      } 
      :      
        <HelmetProvider>
             <Header/> 
                <div className='container container-fluid'>
                  <ToastContainer theme='dark' />
                  
                  <Routes>
                      <Route path='/' element={<Home/>} /> 
                      <Route path='/search/:keyword' element={<ProductSearch/>} />
                      <Route path='/product/:id' element={<ProductDetail/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
                      <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
                      <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
                      <Route path='/password/forgot' element={<ForgotPassword/> } />
                      <Route path='/password/reset/:token' element={<ResetPassword/> } />
                      <Route path='/cart' element={<Cart/> } />
                      <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute> } />
                      <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } />
                      <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> } />
                      <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
                      <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
                      {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />}
                      <Route path='/user/filtered-products' element={ <ProtectedRoute><UserProductList/></ProtectedRoute> } />
                      <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute> } />
                      <Route path='/about' element={<About />} />
                      <Route path='/privacy_policy' element={<PrivacyPolicy />} />
                                             
                  </Routes>                  
                </div>
                
                <Routes>                  
                  <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
                  <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
                  <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
                  <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
                  <Route path='/admin/orders' element={ <ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } />
                  <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
                  <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
                  <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
                   <Route path='/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } /> 
                  {/* <Route path='/reviews' element={ <ProtectedRoute><ReviewList/></ProtectedRoute> } /> */}
                  <Route path='/admin/newsletter' element={<ProtectedRoute><NewsletterSender/></ProtectedRoute> } />
                  <Route path='/admin/sales' element={ <ProtectedRoute isAdmin={true}><TotalSalesByDay/></ProtectedRoute> } />
                </Routes>                
            <Footer/>
        </HelmetProvider>
      </div>
      </BrowserRouter>
  );
}

export default App;
