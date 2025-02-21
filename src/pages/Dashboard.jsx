// Import libraries
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";
import CountUp from 'react-countup';

// Import components
import BannerEditor from "../components/BannerEditor";

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
    const [showBannerEditor, setShowBannerEditor] = useState(true);
    const [showProductEditor, setShowProductEditor] = useState(false);
    const [showBlogEditor, setShowBlogEditor] = useState(false);

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

    const handleTabClick = (e) => {
        const tab = e.target.innerText;
        if (tab === "BANNERS") {
            setShowBannerEditor(true);
            setShowProductEditor(false);
            setShowBlogEditor(false);
        } else if (tab === "PRODUCTS") {
            setShowBannerEditor(false);
            setShowProductEditor(true);
            setShowBlogEditor(false);
        } else if (tab === "BLOGS") {
            setShowBannerEditor(false);
            setShowProductEditor(false);
            setShowBlogEditor(true);
        }
    }

    if (loading || !isAdmin) {
        return <Loading />
    }

    return (
        <div className="dashboard-page">
            <h1 data-aos="zooom-in">
                <StaticLang en="Dashboard" az="İdarə Paneli" />
            </h1>

            <div className="counters">
                <div className="counter">
                    <p><StaticLang en="Product" az="Məhsul" /></p>
                    <h2><CountUp duration={2.75} end={productCount} /></h2>
                </div>
                <div className="counter">
                    <p>Blog</p>
                    <h2><CountUp duration={2.75} end={blogCount} /></h2>
                </div>
            </div>

            <div className="tabs">
                <div className={`tab ${showBannerEditor ? "active" : ""}`} onClick={handleTabClick}>
                    <h2>BANNERS</h2>
                </div>
                <div className={`tab ${showProductEditor ? "active" : ""}`} onClick={handleTabClick}>
                    <h2>PRODUCTS</h2>
                </div>
                <div className={`tab ${showBlogEditor ? "active" : ""}`} onClick={handleTabClick}>
                    <h2>BLOGS</h2>
                </div>
            </div>

            <div className="tab-content">
                <div className={`tab ${showBannerEditor ? "active" : ""}`}>
                    <BannerEditor />
                </div>
                <div className={`tab ${showProductEditor ? "active" : ""}`} >
                    <h2>PRODUCTS CONTENT</h2>
                </div>
                <div className={`tab ${showBlogEditor ? "active" : ""}`}>
                    <h2>BLOGS CONTENT</h2>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;