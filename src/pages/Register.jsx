// Import libraries
import { Link } from "react-router-dom"

// Import styles
import "../assets/styles/pages/Register.css";

const Register = () => {
    return (
        <div className="register-page">
            <h1>Create account</h1>

            <form>
                <div className="input">
                    <label htmlFor="first-name">First name</label>

                    <input type="text" id="first-name" placeholder="Enter first name" required/>
                </div>

                <div className="input">
                    <label htmlFor="last-name">Last name</label>

                    <input type="text" id="last-name" placeholder="Enter last name" required/>
                </div>

                <div className="input">
                    <label htmlFor="email">Email address</label>

                    <input type="email" id="email" placeholder="Enter email" required/>
                </div>

                <div className="input">
                    <label htmlFor="password">Password</label>

                    <input type="password" id="password" placeholder="Enter password" required/>
                </div>

                <button type="submit">SIGN UP</button>
            </form>

            <p>Returning Customer? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register