// Import libraries
import { useState, useEffect } from "react";
import { RiTableView, RiGalleryView2 } from "@remixicon/react";
import SingleProductListView from "../components/SingleProductListView";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";
import StaticLang from "../utils/StaticLang";
import Loading from "../components/Loading";

// Import styles
import "../assets/styles/pages/Products.css";
import 'react-range-slider-input/dist/style.css';

// Extract unique values from an array
const getUniqueValues = (array, key) => {
    let uniqueValues = [];
    array.forEach(item => {
        if (!uniqueValues.includes(item[key])) {
            uniqueValues.push(item[key]);
        }
    });
    return uniqueValues;
}

// TODO: Implement reset all the filters button
// Products component
const Products = () => {
    // State variables
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [formats, setFormats] = useState([]);
    const [colors, setColors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [release_years, setReleaseYears] = useState([]);
    const [labels, setLabels] = useState([]);
    const [viewType, setViewType] = useState("gallery");
    const [loading, setLoading] = useState(true);

    // State variables for filtering
    const [defaultMinPrice, setDefaultMinPrice] = useState(0);
    const [defaultMaxPrice, setDefaultMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedReleaseYears, setSelectedReleaseYears] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedStock, setSelectedStock] = useState(true);

    useEffect(() => {
        // Get products from the database
        const getproducts = async () => {
            // get ?s query from the URL
            const search = new URLSearchParams(window.location.search);
            const searchQuery = search.get("s") || "";

            // Get products from the database
            const { data } = await supabase.from("vinyls").select("*").like("title", `%${searchQuery}%`);
            setProducts(data);
            setProductCount(data.length);

            // Get unique keys from the products
            setFormats(getUniqueValues(data, "format"));
            setColors(getUniqueValues(data, "color"));
            setGenres(getUniqueValues(data, "genre"));
            setReleaseYears(getUniqueValues(data, "release_year"));
            setLabels(getUniqueValues(data, "label"));

            // Get min and max prices from the products
            const prices = data.map(product => product.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setMinPrice(min);
            setMaxPrice(max);
            setDefaultMinPrice(min);
            setDefaultMaxPrice(max);
        }

        getproducts();

        // Set loading to false
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Filter functions
    const formatFilter = (format, checked) => {
        if (checked) {
            setSelectedFormats([...selectedFormats, format]);
        } else {
            setSelectedFormats(selectedFormats.filter(item => item !== format));
        }
    }

    const colorFilter = (color, checked) => {
        if (checked) {
            setSelectedColors([...selectedColors, color]);
        } else {
            setSelectedColors(selectedColors.filter(item => item !== color));
        }
    }

    const genreFilter = (genre, checked) => {
        if (checked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        }
    }

    const releaseYearFilter = (release_year, checked) => {
        if (checked) {
            setSelectedReleaseYears([...selectedReleaseYears, release_year]);
        } else {
            setSelectedReleaseYears(selectedReleaseYears.filter(item => item !== release_year));
        }
    }

    const labelFilter = (label, checked) => {
        if (checked) {
            setSelectedLabels([...selectedLabels, label]);
        } else {
            setSelectedLabels(selectedLabels.filter(item => item !== label));
        }
    }

    if(loading) {
        return <Loading />
    }

    if(products.length === 0) {
        return (
            <div className="products-page">
                <h1>
                    <StaticLang en="No products found" az="Heç bir məhsul tapılmadı" />
                </h1>
            </div>
        )
    }

    // Render the products
    return (
        <div className="products-page">
            <div className="filters">
                <div className="filter">
                    <h3><StaticLang en="PRICE" az="QİYMƏT" /></h3>
                    <div className="inputs">
                        <input type="text" value={minPrice} onInput={e => e.target.value = e.target.value.replace(/[^0-9.]/g, '')} onChange={(e) => { setMinPrice(e.target.value) }} />
                        <p>-</p>
                        <input type="text" value={maxPrice} onInput={e => e.target.value = e.target.value.replace(/[^0-9.]/g, '')} onChange={(e) => { setMaxPrice(e.target.value) }} />
                    </div>
                </div>

                <div className="filter">
                    <h3>FORMAT</h3>

                    <div className="selection">
                        {formats && formats.map((format, index) => (
                            <div className="option" key={index}>
                                <label>
                                    <input type="checkbox" onChange={e => formatFilter(format, e.target.checked)} />
                                    <p>{format}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter">
                    <h3><StaticLang en="COLOR" az="RƏNG" /></h3>

                    <div className="selection">
                        {colors && colors.map((color, index) => (
                            <div className="option" key={index}>
                                <label>
                                    <input type="checkbox" onChange={e => colorFilter(color, e.target.checked)} />
                                    <p>{color}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter">
                    <h3><StaticLang en="GENRE" az="JANR" /></h3>

                    <div className="selection">
                        {genres && genres.map((genre, index) => (
                            <div className="option" key={index}>
                                <label>
                                    <input type="checkbox" onChange={e => genreFilter(genre, e.target.checked)} />
                                    <p>{genre}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter">
                    <h3><StaticLang en="RELEASE YEAR" az="ÇIXIŞ İLİ" /></h3>

                    <div className="selection">
                        {release_years && release_years.map((release_year, index) => (
                            <div className="option" key={index}>
                                <label>
                                    <input type="checkbox" onChange={e => releaseYearFilter(release_year, e.target.checked)} />
                                    <p>{release_year}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter">
                    <h3><StaticLang en="LABEL" az="ETİKET" /></h3>

                    <div className="selection">
                        {labels && labels.map((label, index) => (
                            <div className="option" key={index}>
                                <label>
                                    <input type="checkbox" onChange={e => labelFilter(label, e.target.checked)} />
                                    <p>{label}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter">
                    <h3><StaticLang en="STOCK" az="STOK" /></h3>

                    <div className="selection">
                        <div className="option">
                            <label>
                                <input type="checkbox" checked={selectedStock} onChange={e => { setSelectedStock(e.target.checked) }} />
                                <p><StaticLang en="In stock" az="Stokda var" /></p>
                            </label>
                        </div>
                        <div className="option">
                            <label>
                                <input type="checkbox" checked={!selectedStock} onChange={e => { setSelectedStock(!e.target.checked) }} />
                                <p><StaticLang en="Out of stock" az="Stokda yoxdur" /></p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="products">
                <div className="name">
                    <h1><StaticLang en="Products" az="Məhsullar" /></h1>
                </div>
                <div className="top">
                    <div className="views">
                        <p><StaticLang en="View as" az="Belə görüntüləyin" /></p>
                        <RiGalleryView2 size={25} className={viewType == "gallery" ? "active" : ""} onClick={() => { setViewType("gallery") }} />
                        <RiTableView size={25} className={viewType == "gallery" ? "" : "active"} onClick={() => { setViewType("list") }} />
                    </div>

                    <div className="count">
                        <p>{productCount} <StaticLang en="Products" az="Məhsul" /></p>
                    </div>

                    <div className="sort">
                        <select>
                            <option value="manual">Manual</option>
                            <option value="price_ascending"><StaticLang en="Price ascending" az="Qiymət artaraq" /></option>
                            <option value="price_descending"><StaticLang en="Price descending" az="Qiymət azalaraq" /></option>
                            <option value="title_ascending"><StaticLang en="Title ascending" az="Əlifba sırasına görə" /></option>
                            <option value="title_descending"><StaticLang en="Title descending" az="Əlifba sırasının əksinə" /></option>
                            <option value="created_ascending"><StaticLang en="Created ascending" az="Yaradılma tarixinə görə" /></option>
                            <option value="created_descending"><StaticLang en="Created descending" az="Yaradılma tarixinin əksinə" /></option>
                        </select>
                    </div>
                </div>

                <div className={`product-list ${viewType}`}>
                    {products && products.filter(product =>
                        (selectedFormats.length > 0 ? selectedFormats.includes(product.format) : true) &&
                        (selectedColors.length > 0 ? selectedColors.includes(product.color) : true) &&
                        (selectedGenres.length > 0 ? selectedGenres.includes(product.genre) : true) &&
                        (selectedReleaseYears.length > 0 ? selectedReleaseYears.includes(product.release_year) : true) &&
                        (selectedLabels.length > 0 ? selectedLabels.includes(product.label) : true) &&
                        (selectedStock == product.stock) &&
                        product.price >= minPrice && product.price <= maxPrice
                    ).map((product, index) => {
                        if (viewType === "gallery") {
                            return (<SingleProduct key={index} product={product} />)
                        }
                        return (<SingleProductListView key={index} product={product} />)
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products;