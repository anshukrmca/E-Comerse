import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { FaCheck } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { GoHeartFill, GoHeart } from "react-icons/go";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductReview from '../ProductReview/ProductReview';
import HeaderTittle from '../HeaderTittle';
import Product from './Product';

const SingleProduct = () => {

    const [isAddToCart, setIsAddToCart] = useState(false)
    const [isAddwishList, setIsAddwishList] = useState(false)
    const [products, setProducts] = useState({})
    const [Relatedproducts, setRelatedproducts] = useState([])
    const P_ID = useParams()

    // product data 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products/${P_ID.id}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [P_ID]);

    // Related product data 
    useEffect(() => {
        const fetchProducts = async () => {
            const category = products.category;
            try {
                const response = await axios.get(`/api/products/category/${category}`);
                setRelatedproducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if(products.category != undefined){
            fetchProducts();
        }
    }, [products.category]);


    const handleAddToCart = () => {
        setIsAddToCart(true)
        setTimeout(() => {
            setIsAddToCart(false)
        }, 2000) // Reset success message after 2 seconds
    }
    const handleAddToWish = () => {
        setIsAddwishList(true)
        setTimeout(() => {
            setIsAddwishList(false)
        }, 2000) // Reset success message after 2 seconds
    }

    console.log("R Pro", Relatedproducts);
    return (
        <>
            <Layout>
                <section className="overflow-hidden bg-slate-300 py-11 font-poppins dark:bg-slate-800 mx-4">
                    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="sticky top-0 z-20 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                        <img src={products.image} alt=""
                                            className="object-cover w-full lg:h-[80dvh] " />
                                    </div>
                                    <div className="flex-wrap hidden md:flex ">
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a href="#"
                                                className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                    className="object-cover w-full lg:h-20" />
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a href="#"
                                                className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                    className="object-cover w-full lg:h-20" />
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a href="#"
                                                className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                    className="object-cover w-full lg:h-20" />
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a href="#"
                                                className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                    className="object-cover w-full lg:h-20" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="lg:pl-20">
                                    <div className="mb-8 ">
                                        <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                            {products.title}</h2>
                                        <div className="flex items-center mb-6">
                                            <ul className="flex mr-2">
                                                <li>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor"
                                                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor"
                                                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor"
                                                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="currentColor"
                                                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                            </ul>
                                            <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                                        </div>
                                        <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                            {products.description}
                                        </p>
                                        <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                            <span>₹{products.price}</span>
                                        </p>
                                        {products.inStock ? <p className="text-green-600 dark:text-green-300 ">In Stock</p>
                                            : <p className="text-red-700 dark:text-red-600 ">Out of Stock</p>}
                                    </div>
                                    {products.color && products.color.length !== 0 ?
                                        <div className="mb-8">
                                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                                                Color</h2>
                                            <div className="flex flex-wrap -mb-2">
                                                {products.color.map((c) => {
                                                    return (
                                                        <button key={c}
                                                            className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                                                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: c }}></div>
                                                        </button>
                                                    )
                                                })}


                                            </div>
                                        </div>
                                        : ""
                                    }
                                    {products.size && products.size.length !== 0 ?
                                        <div className="flex items-center mb-8">
                                            <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                                Size:</h2>
                                            <div className="flex flex-wrap -mx-2 -mb-2">
                                                {products.size.map((s) => {
                                                    return (
                                                        <button key={s}
                                                            className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                                                            {s}
                                                        </button>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                        : ""
                                    }
                                    <div className="flex flex-wrap items-center">
                                        <div className="mb-4 mr-4 lg:mb-0">
                                            <div className="w-28">
                                                <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                    <button
                                                        className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                        <span className="m-auto text-2xl font-thin">-</span>
                                                    </button>
                                                    <input type="number"
                                                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                        placeholder="1" />
                                                    <button
                                                        className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                        <span className="m-auto text-2xl font-thin">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 mr-4 lg:mb-0">
                                            <button
                                                onClick={products.inStock ? handleAddToCart : null}
                                                className={`${products.inStock ? 'cursor-pointer bg-blue-500' : 'cursor-no-drop bg-red-600'} w-full h-10 p-2 mr-4`}>
                                                Buy Now</button>
                                        </div>
                                        <div className="mb-4 mr-4 lg:mb-0 flex gap-3">
                                            <div
                                                onClick={handleAddToWish}
                                                className={` cursor-pointer p-2 rounded ${isAddwishList ? 'bg-slate-500 transition duration-500' : ""}`}>
                                                {isAddwishList ? <GoHeartFill size={28} className='text-red-600' /> : <GoHeart size={28} />}
                                            </div>
                                            <div
                                                onClick={products.inStock ? handleAddToCart : null}
                                                className={`${products.inStock ? 'cursor-pointer' : 'cursor-no-drop'}   p-2 rounded ${isAddToCart ? 'bg-green-500/80 transition duration-500' : ""}`}>
                                                {isAddToCart ? <FaCheck size={28} /> : <BsCart3 size={28} />}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* rating  */}
                    <ProductReview />

                    {/* related product   */}
                    <div className='px-4'>
                        <HeaderTittle tittle="Related Products" />
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-4 mb-2">
                            {Relatedproducts && Relatedproducts.map((item) => {
                                return (
                                    <Product
                                        key={item._id}
                                        P_id={item._id}
                                        P_name={item.title}
                                        description={item.description}
                                        price={item.price}
                                        color={item.color}
                                        size={item.size}
                                        image={item.image}

                                    />
                                )
                            })}
                        </div >
                    </div>
                </section>

            </Layout>

        </>
    )
}

export default SingleProduct