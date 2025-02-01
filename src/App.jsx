import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import the pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/contact" element={<h1>Contact</h1>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App