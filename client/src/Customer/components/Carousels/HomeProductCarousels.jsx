import React, { useEffect, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from "@mui/material";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Product from "../product/ProductCard";
import axios from 'axios';
import { MdChevronLeft,MdChevronRight } from "react-icons/md";
import { FaAngleUp,FaAngleDown } from "react-icons/fa6";
import HeaderTittle from "../HeaderTittle";

const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4.5 },
};

const HomeProductCarousels = ({ Categories }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    // get data from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products/category/allproduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // filter date by category 

    useEffect(() => {
        const filterAndMapData = (Categories) => {
            const filteredProducts = products.filter(
                (products) => products.category === Categories.toLowerCase()
            );
            setFilteredData(filteredProducts);
        };
        filterAndMapData(Categories);

    }, [Categories, products]);


    const slidePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
            setActiveIndex(activeIndex - 1);
        }
    };

    const slideNext = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
            setActiveIndex(activeIndex + 1);

        }
    };



    const items = filteredData.map((item) =>
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
    );

    return (
        <>
            <div className="px-2 mb-3 bg-slate-300 dark:bg-slate-700 h-[auto]">
                {/* <h3 className="text-2xl font-bold">Product from {`${Categories}`}</h3> */}
                <HeaderTittle tittle={`Product from ${Categories}`}/>
                <div className="relative p-5">
                    <AliceCarousel
                        items={items}
                        ref={carouselRef}
                        disableButtonsControls
                        responsive={responsive}
                        disableDotsControls
                    />

                    {activeIndex !== items.length - 5 && (
                        <Button
                            variant="contained"
                            aria-label="next"
                            className="z-50"
                            onClick={slideNext}
                            sx={{
                                position: "absolute",
                                top: "8rem",
                                right: "0rem",
                                transform: "translateX(50%) rotate(90deg)",
                                bgcolor: "white",
                            }}
                        >
                            <FaAngleUp size={20} color="black"
                                // sx={{ transform: "rotate(90deg)" }}
                            />
                        </Button>
                    )}

                    {activeIndex !== 0 && (
                        <Button
                            variant="contained"
                            aria-label="next"
                            className="z-50"
                            onClick={slidePrev}
                            sx={{
                                position: "absolute",
                                top: "8rem",
                                left: "0rem",
                                transform: "translateX(-50%) rotate(90deg)",
                                bgcolor: "white",
                            }}
                        >
                            <FaAngleDown size={20} color="black"
                                // sx={{ transform: "rotate(90deg)", }}
                            />
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default
    HomeProductCarousels;