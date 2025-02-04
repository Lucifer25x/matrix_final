// Import libraries
import { Link } from "react-router-dom"

// Import styles
import "../assets/styles/pages/Login.css";

const Login = () => {
    return (
        <div className="login-page">
            <h1>CUSTOMER LOGIN</h1>

            <div className="sections">
                <div className="section">
                    <form>
                        <div className="input">
                            <label htmlFor="email">Email address*</label>
                            <input type="email" id="email" placeholder="Enter email" required/>
                        </div>

                        <div className="input">
                            <label htmlFor="password">Password*</label>
                            <input type="password" id="password" placeholder="Enter password" required/>
                        </div>

                        <button type="submit">LOGIN</button>
                    </form>

                    <p>New Customer? <Link to="/register">Sign Up</Link></p>
                </div>

                <div className="section">
                    <p>
                        If you're an existing customer but you didn't setup an account when you checked out, you can do so here by clicking <Link to="/register">"Sign Up"</Link>.
                    </p>

                    <p>
                        When signing up use the same email address as when you made your order and you will then be able to view your full purchase history from within your account.
                    </p>

                    <p>
                        If you haven't purchased from us yet but want to save your wishlist, simply <Link to="/register">"Sign Up"</Link> here also.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login