// Import libraries
import { useEffect } from "react";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/NotFound.css";

// TODO: Implement a proper 404 page
// Not Found page
const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "404 | The Record Hub";
    }, []);
    
    return (
        <div className="not-found-page">
            <h1><StaticLang en="PAGE NOT FOUND" az="SƏHİFƏ TAPILMADI" /></h1>
            <p><StaticLang en="We're sorry, but the page you requested could not be found." az="Üzr istəyirik, lakin sorğu etdiyiniz səhifəni tapmaq mümkün olmadı." /></p>
            <p><StaticLang en="Try searching or continue shopping." az="Axtarmağa cəhd edin və ya alış-verişə davam edin." /></p>
        </div>
    )
}

export default NotFound