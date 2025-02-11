// TODO: Add translation

// Import libraries
import { useState, useEffect } from "react";
import { RiTableView, RiGalleryView2 } from "@remixicon/react";
import supabase from "../utils/supabase";
import SingleProduct from "../components/SingleProduct";

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
            const { data } = await supabase.from("vinyls").select("*");
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

    // TODO: Implement reset all the filters button

    // Render the products
    return (
        <div className="products-page">
            <div className="filters">
                <div className="filter">
                    <h3>PRICE</h3>
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
                    <h3>COLOR</h3>

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
                    <h3>GENRE</h3>

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
                    <h3>RELEASE YEAR</h3>

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
                    <h3>LABEL</h3>

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
                    <h3>STOCK</h3>

                    <div className="selection">
                        <div className="option">
                            <label>
                                <input type="checkbox" checked={selectedStock} onChange={e => { setSelectedStock(e.target.checked) }} />
                                <p>In stock</p>
                            </label>
                        </div>
                        <div className="option">
                            <label>
                                <input type="checkbox" checked={!selectedStock} onChange={e => { setSelectedStock(!e.target.checked) }} />
                                <p>Out of stock</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="products">
                <div className="name">
                    <h1>Products</h1>
                </div>
                <div className="top">
                    {/* TODO: Implement different types of views (table/gallery) */}
                    <div className="views">
                        <p>View as</p>
                        <RiGalleryView2 size={25} className="active" />
                        <RiTableView size={25} />
                    </div>

                    <div className="count">
                        <p>{productCount} Products</p>
                    </div>

                    <div className="sort">
                        <select>
                            <option value="manual">Manual</option>
                            <option value="price_ascending">Price ascending</option>
                            <option value="price_descending">Price descending</option>
                            <option value="title_ascending">Title ascending</option>
                            <option value="title_descending">Title descending</option>
                            <option value="created_ascending">Created ascending</option>
                            <option value="created_descending">Created descending</option>
                        </select>
                    </div>
                </div>

                <div className="product-list">
                    {products && products.filter(product =>
                        (selectedFormats.length > 0 ? selectedFormats.includes(product.format) : true) &&
                        (selectedColors.length > 0 ? selectedColors.includes(product.color) : true) &&
                        (selectedGenres.length > 0 ? selectedGenres.includes(product.genre) : true) &&
                        (selectedReleaseYears.length > 0 ? selectedReleaseYears.includes(product.release_year) : true) &&
                        (selectedLabels.length > 0 ? selectedLabels.includes(product.label) : true) &&
                        (selectedStock == product.stock) &&
                        product.price >= minPrice && product.price <= maxPrice
                    ).map((product, index) => {
                        return (<SingleProduct key={index} product={product} />)
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products;