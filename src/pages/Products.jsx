// Import libraries
import { useState, useEffect } from "react";
import { RiTableView, RiGalleryView2 } from "@remixicon/react";
import supabase from "../utils/supabase";
import RangeSlider from 'react-range-slider-input';
import SingleProduct from "../components/SingleProduct";

// Import styles
import "../assets/styles/pages/Products.css";
import 'react-range-slider-input/dist/style.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formats, setFormats] = useState([]);
    const [colors, setColors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [release_years, setReleaseYears] = useState([]);
    const [labels, setLabels] = useState([]);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    useEffect(() => {
        const getproducts = async () => {
            const { data } = await supabase.from("vinyls").select("*");
            setProducts(data);

            let formats = [];
            data.forEach(product => {
                if (!formats.includes(product.format)) {
                    formats.push(product.format);
                }
            });
            setFormats(formats);

            let colors = [];
            data.forEach(product => {
                if (!colors.includes(product.color)) {
                    colors.push(product.color);
                }
            });
            setColors(colors);

            let genres = [];
            data.forEach(product => {
                if (!genres.includes(product.genre)) {
                    genres.push(product.genre);
                }
            });
            setGenres(genres);

            let release_years = [];
            data.forEach(product => {
                if (!release_years.includes(product.release_year)) {
                    release_years.push(product.release_year);
                }
            });
            setReleaseYears(release_years);

            let labels = [];
            data.forEach(product => {
                if (!labels.includes(product.label)) {
                    labels.push(product.label);
                }
            });
            setLabels(labels);

            const prices = data.map(product => product.price);
            setMinPrice(Math.min(...prices));
            setMaxPrice(Math.max(...prices));
        }

        getproducts();
    }, []);

    return (
        <div className="products-page">
            <div className="filters">
                {/* TODO: Implement the filters and change the min, max price based on the values by inputs */}
                <div className="filter">
                    <h3>PRICE</h3>
                    <div className="inputs">
                        <input type="text" defaultValue={minPrice} min={minPrice} max={maxPrice} />
                        <p>-</p>
                        <input type="text" defaultValue={maxPrice} min={minPrice} max={maxPrice} />
                    </div>
                    <div className="slider">
                        <RangeSlider min={minPrice} max={maxPrice}/>
                    </div>
                </div>

                <div className="filter">
                    <h3>FORMAT</h3>

                    <div className="selection">
                        {formats && formats.map((format, index) => (
                            <div className="option" key={index}>
                                <label>
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
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
                                    <input type="checkbox" />
                                    <p>{label}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="products">
                <div className="name">
                    <h1>Products</h1>
                </div>
                <div className="top">
                    <div className="views">
                        <p>View as</p>
                        <RiGalleryView2 size={25} className="active" />
                        <RiTableView size={25} />
                    </div>

                    <div className="count">
                        <p>10 Products</p>
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
                    {products && products.map(product => (
                        <SingleProduct
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products;