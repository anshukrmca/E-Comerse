import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Home from "./Customer/pages/Home/Home";
import About from "./Customer/pages/About/About";
import SingleProduct from "./Customer/components/product/SingleProduct";
import Cart from "./Customer/components/cart/Cart";
import ProductStore from "./Customer/components/product/ProductStore";
import Checkout from "./Customer/components/checkout/Checkout";
import UProfileSetting from "./Customer/components/userProfileSetting/UProfileSetting";
import UserProfile from "./Customer/components/userProfileSetting/UserProfile";
import UserAddress from "./Customer/components/userProfileSetting/UserAddress";
import OrderDetail from "./Customer/components/userProfileSetting/OrderDetail";
import OrderSummery from "./Customer/components/userProfileSetting/OrderSummery";
import Dashboard from './admin/component/Dashboard/Dashboard'
import Products from "./admin/component/product/Products";
import User from "./admin/component/user/User";
import Navbar from "./admin/component/Dashboard/Navbar";
import Category from "./admin/component/category/Category";
import PaymentSuccess from "./Customer/components/paymentMode/PaymentSuccess";

const App = () => {

  return (
    <div className="dark:bg-black text-black dark:text-white bg-white h-full w-[160dvw] md:w-full">
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/category/:name" element={<ProductStore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<ProductStore />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<ProductStore />} />
        <Route path="/payment/order/:orderid/payment/:paymentid" element={<PaymentSuccess />} />


        {/* profile  */}
        <Route path="/Setting" element={<UProfileSetting />} >
          <Route path="/Setting/profile" element={<UserProfile />} />
          <Route path="/Setting/address" element={<UserAddress />} />
          <Route path="/Setting/order" element={<OrderDetail />} />
        </Route>
        <Route path="/order-summery/:orderid" element={<OrderSummery />} />

        <Route path='/admin' element={<Navbar />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/color" element={<Category />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
