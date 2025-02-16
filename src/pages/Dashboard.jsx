// Import libraries
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import Loading from "../components/Loading";
import CountUp from 'react-countup';

// Import styles
import "../assets/styles/pages/Dashboard.css";

// TODO: Implement fully functional admin dashboard
// Dashboard page
const Dashboard = () => {
    // User related states
    const { user, loading } = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();

    // Other states
    const [productCount, setProductCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);

    useEffect(() => {
        if (!user && !loading) {
            navigate("/not-found")
        }

        const checkAdmin = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("roles")
                    .select("role")
                    .eq("id", user.id);

                if (error) {
                    navigate("/not-found");
                }

                if (data && data.length > 0) {
                    if (data[0].role != "admin") {
                        navigate("/not-found");
                    } else {
                        setIsAdmin(true);
                    }
                } else {
                    navigate("/not-found");
                }
            }
        }

        checkAdmin()

        const fetchProductCount = async () => {
            const { data, error } = await supabase
                .from("vinyls")
                .select("id", { count: "exact" });

            if (error) {
                console.log(error.message);
            }

            if (data) {
                setProductCount(data.length);
            }
        }

        const fetchBlogCount = async () => {
            const { data, error } = await supabase
                .from("blogs")
                .select("id", { count: "exact" });

            if (error) {
                console.log(error.message);
            }

            if (data) {
                setBlogCount(data.length);
            }
        }

        fetchProductCount()
        fetchBlogCount()
        document.title = "Admin Dashboard | The Record Hub"
    }, [user, loading]);

    if (loading || !isAdmin) {
        return <Loading />
    }

    return (
        <div className="dashboard-page">
            <h1 data-aos="zooom-in">Admin Dashboard</h1>
            <p>WIP...</p>
            <p>Product count: <CountUp duration={2.75} end={productCount} /></p>
            <p>Blog count: <CountUp duration={2.75} end={blogCount} /></p>
            <div className="buttons">
                <button>EDIT BANNERS</button>
                <button>EDIT PRODUCTS</button>
                <button>EDIT BLOGS</button>
            </div>
        </div>
    )
}

export default Dashboard;