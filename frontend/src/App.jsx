import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { authUser } from "./store/thunkFunctions";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedPage from "./pages/ProtectedPage";
import UploadProductPage from "./pages/UploadProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import NotAuthRoutes from "./components/NotAuthRoutes";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />

      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // 페이지 이동할 때마다 데이터베이스에 있는 user의 데이터를 클라이언트로 호출함
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />

        {/* 로그인하지 않았을 경우 접근 불가*/}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/product/upload" element={<UploadProductPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        {/* 로그인했을 경우 접근 불가 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
