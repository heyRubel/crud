import { Navigate, Outlet } from "react-router-dom";

const auth = localStorage.getItem("user");

const ProtectedComponent = () => {
  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedComponent;

const ProtectedComponentTwo = () => {
  return auth ? <Navigate to={"/"} /> : <Outlet />;
};
export { ProtectedComponentTwo };
