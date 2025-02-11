// Import libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import the components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Import the pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer />

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />

            <ScrollToTop />
        </BrowserRouter>
    )
}

export default App