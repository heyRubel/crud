import Nav from "./components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/productlist/ProductList";
import AddProduct from "./components/addProduct/AddProduct";
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import Signup from "./components/signup/SignUp";
import Login from "./components/login/Login";
import ProtectedComponent from "./components/protectedComponent/ProtectedComponent";
import { ProtectedComponentTwo } from "./components/protectedComponent/ProtectedComponent";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";

const App = () => {
 

  return (
    <>
      <Nav />
      <Routes>
        <Route element={<ProtectedComponent />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Route>
        <Route element={<ProtectedComponentTwo />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};

export default App;
