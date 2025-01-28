import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default App;