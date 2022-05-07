import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route, useLocation } from "react-router-dom";
import { CtxProvider } from "./context/AppContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";

const App = () => {
  const { pathname } = useLocation();
  return (
    <CtxProvider>
      {pathname !== "/signup" && pathname !== "/signin" && (
        <>
          <Navbar />
          <Announcement />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {pathname !== "/signup" && pathname !== "/signin" && <Footer />}
    </CtxProvider>
  );
};

export default App;
