import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { GoHeartFill, GoHeart } from "react-icons/go";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductReview from '../ProductReview/ProductReview';
import HeaderTittle from '../HeaderTittle';
import Product from './ProductCard';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';

const SingleProduct = () => {

    const [isAddToCart, setIsAddToCart] = useState(false)
    const [isAddwishList, setIsAddwishList] = useState(false)
    const [products, setProducts] = useState({})
    const [Relatedproducts, setRelatedproducts] = useState([])
    const [selectedColor, setSelecetedColor] = useState("")
    const [selectedSize, setSelecetedSize] = useState("")
    const [selectedQuantity, setSelecetedQuantity] = useState(1)
    const P_ID = useParams()
    // product data 


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/product/id/${P_ID.id}`);
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
            const category = products.category.name;
            try {
                const response = await axios.get('/api/product', {
                    params: {
                        category: category,
                    }
                });
                //    console.log(response);
                // setRelatedproducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (products.category != undefined) {
            fetchProducts();
        }
    }, [products.category]);


    const handleAddToCart = async() => {
        let data = {
            color: selectedColor,
            size: selectedSize,
            quantity: selectedQuantity,
            ProductId:products._id
        }
        console.log(data)
        const res= await axios.post('/api/cart/add',data);
        console.log(res)
        toast.success(res.data)
    }
    const handleAddToWish = () => {
        setIsAddwishList(true)
        setTimeout(() => {
            setIsAddwishList(false)
        }, 2000) // Reset success message after 2 seconds
    }
    return (
        <>
            <Layout>
                <section className="overflow-hidden bg-slate-300 py-11 font-poppins dark:bg-slate-800 mx-4">
                    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="sticky top-0 z-20 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                        <img src={products.mainImage} alt="Product Image"
                                            className="object-cover object-left-top w-full lg:h-[80dvh] " />
                                    </div>
                                    <div className="flex-wrap hidden md:flex ">
                                        {products.subImage && products.subImage.map((img, index) => {
                                            return (
                                                <div className="w-1/2 p-2 sm:w-1/4" key={index}>
                                                    <a href="#"
                                                        className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                        <img src={img} alt=""
                                                            className="w-full object-left-top object-cover h-20" />
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="lg:pl-20">
                                    <div className="mb-8 ">
                                        <h2 className="max-w-xl mt-2 mb-4 text-xl font-bold dark:text-gray-400 md:text-2xl">
                                            {products.title}</h2>
                                        <div className="flex items-center mb-6">
                                            <Rating sx={{ borderColor: 'green' }} name="half-rating" defaultValue={2.5} precision={0.5} />
                                            <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                                        </div>
                                        <p className="max-w-md mb-5 text-gray-700 dark:text-gray-400">
                                            {products.description}
                                        </p>
                                        <p className="inline-block mb-4 font-bold text-gray-700 dark:text-gray-400">
                                            <span className='text-2xl font-semibold'>₹{products.discountedPrice}</span>&nbsp;<span className='line-through'>{products.price}</span>&nbsp;<span className='text-green-400 text-sm'>{products.discountedPercentage}%</span>
                                        </p>
                                        {products.quantity !== 0 ? <p className="text-green-600 dark:text-green-300 ">In Stock</p>
                                            : <p className="text-red-700 dark:text-red-600 ">Out of Stock</p>}
                                    </div>
                                    {products.color && products.color.length !== 0 ?
                                        <div className="mb-4">
                                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                                                Color</h2>
                                            <div className="flex flex-wrap -mb-2">
                                                {products.color.map((c) => {
                                                    return (
                                                        <button key={c}
                                                            onClick={() => setSelecetedColor(c)}
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
                                        <div className="flex items-center mb-4">
                                            <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                                Size:</h2>
                                            <div className="flex flex-wrap -mx-2 -mb-2">
                                                {products.size.map((s) => {
                                                    return (
                                                        <button key={s}
                                                            onClick={() => setSelecetedSize(s)}
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
                                                    <button onClick={(e) => {
                                                        if (selectedQuantity > 1) {
                                                            setSelecetedQuantity(selectedQuantity - 1);
                                                        }
                                                    }}
                                                        className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                        <span className="m-auto text-2xl font-thin">-</span>
                                                    </button>
                                                    <input type="number"
                                                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                        value={selectedQuantity} readOnly />
                                                    <button
                                                        onClick={(e) => { setSelecetedQuantity(selectedQuantity + 1) }}
                                                        className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                        <span className="m-auto text-2xl font-thin">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 mr-4 lg:mb-0">
                                            <button
                                                onClick={products.quantity !== 0 ? handleAddToCart : null}
                                                className={`${products.quantity !== 0 ? 'cursor-pointer bg-blue-500' : 'cursor-not-allowed bg-red-600'} w-full h-10 p-2 mr-4`}
                                            >
                                                Add to Bag
                                            </button>

                                        </div>
                                        <div className="mb-4 mr-4 lg:mb-0 flex gap-3">
                                            <div
                                                onClick={handleAddToWish}
                                                className={` cursor-pointer p-2 rounded ${isAddwishList ? 'bg-slate-500 transition duration-500' : ""}`}>
                                                {isAddwishList ? <GoHeartFill size={28} className='text-red-600' /> : <GoHeart size={28} />}
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
                            {/* {Relatedproducts && Relatedproducts.map((item) => {
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
                            })} */}
                        </div >
                    </div>
                </section>

            </Layout>

        </>
    )
}

export default SingleProduct