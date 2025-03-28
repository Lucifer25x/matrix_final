// Import context providers
import { CartProvider } from "react-use-cart";
import { ThemeProvider } from "./ThemeContext";
import { LangProvider } from "./LangContext";
import { UserProvider } from "./UserContext";
import { Provider } from "react-redux";

// Import store
import store from "../tools/store";

// Context Provider component
const ContextProvider = ({ children }) => {
    return (
        <CartProvider>
            <LangProvider>
                <ThemeProvider>
                    <UserProvider>
                        <Provider store={store}>
                            {children}
                        </Provider>
                    </UserProvider>
                </ThemeProvider>
            </LangProvider>
        </CartProvider>
    );
}

export default ContextProvider;