import "./App.css";
import "react-toastify/dist/ReactToastify.css";
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
import Dashboard from "./admin/component/Dashboard/Dashboard";
import Products from "./admin/component/product/Products";
import User from "./admin/component/user/User";
import Category from "./admin/component/category/Category";
import PaymentSuccess from "./Customer/components/paymentMode/PaymentSuccess";
import Sidebar from "./admin/component/Dashboard/Sidebar";
import { ColorModeContext, tokens, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Order from "./admin/component/order/Order.jsx";
import ReviewForm from "./Customer/components/ProductReview/ReviewForm.jsx";
import UserAllInformation from "./admin/component/user/UserAllInformation.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
const App = () => {
  const [theme, colorMode] = useMode();
  // const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ color: `${colors.grey[200]}` }}>
            <Routes>
              <Route path="/login" element={<Home />} />
              <Route path="/signup" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/:levelThree" element={<ProductStore />} />
              <Route path="/store" element={<ProductStore />} />
              <Route
                path="/:levelOne/:levelTwo/:levelThree"
                element={<ProductStore />}
              />

              <Route element={<PrivateRoute />}>
                <Route path="/review/:id" element={<ReviewForm />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout/" element={<Checkout />} />
                <Route
                  path="/payment/order/:orderid/payment/:paymentid"
                  element={<PaymentSuccess />}
                />
              </Route>

              {/* profile  */}
              <Route element={<PrivateRoute />}>
                <Route path="/Setting" element={<UProfileSetting />}>
                  <Route path="/Setting/profile" element={<UserProfile />} />
                  <Route path="/Setting/address" element={<UserAddress />} />
                  <Route path="/Setting/order" element={<OrderDetail />} />
                </Route>
                <Route
                  path="/order-summery/:orderid"
                  element={<OrderSummery />}
                />
              </Route>

              {/* admin  */}
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<Sidebar />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/product" element={<Products />} />
                  <Route path="/admin/user" element={<User />} />
                  <Route path="/admin/category" element={<Category />} />
                  <Route path="/admin/color" element={<Category />} />
                  <Route path="/admin/order" element={<Order />} />
                  <Route
                    path="/admin/user/:id"
                    element={<UserAllInformation />}
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
