import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Avatar, Box, Button, Rating, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { FaRegStar } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectorder } from '../../../redux/features/orderSlice';

const ReviewForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [reviewContaint, setreviewContaint] = useState('');
    const [hover, setHover] = useState(-1);
    const [BuyProduct, setBuyproduct] = useState(false)
    const [products, setProducts] = useState();
    const navigate = useNavigate()
    const orderHistory = useSelector(selectorder);

    const data = [
        {
            question: "Have you used this product ?",
            suggesion: "Your review should be about your experience with the product."
        },
        {
            question: "Why review a product ?",
            suggesion: "Your valuable feedback will help fellow shoppers decide ! "
        },
        {
            question: "How to review a product?",
            suggesion: 'Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service, please contact us from the help centre.'
        }

    ]
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    useEffect(() => {
        orderHistory?.map((item, i) => {
            item.orderItem?.map((data, i) => {
                if (data.product._id === id) {
                    console.log("o p id :",data.product._id)
                    console.log("p id :",id)
                    setBuyproduct(true);
                    setProducts(data.product);
                }
            })

        })

    }, [orderHistory, id])
  
    const handleReview = async () => {
        const data = {
            product: products._id,
            rating: value,
            review: reviewContaint
        }
        const response = await axios.post('/api/review/create', data);
        console.log(response.data);
        toast.success(response.data.message);
        setTimeout(() => {
            navigate(`/products/${id}`);
        }, 2000);
    }

    return (

        <>
            <Layout>
                <div className='m-4 p-4 px-8 md:flex justify-between items-center' style={{ backgroundColor: `${colors.primary[400]}` }}>
                    <h3 className='font-bold text-xl'>Ratings & Reviews</h3>
                    <Link className='flex gap-4 items-center cursor-pointer' to={`/products/${products && products._id}`}>
                        <p>{products && products.title}</p>
                        <Avatar src={products && products.mainImage} sx={{ backgroundColor: "lightblue", height: 66, width: 66 }}>s</Avatar>
                    </Link>
                </div>
                <div className='p-4 md:flex gap-3'>

                    <div className='p-2 shadow-md w-full md:w-1/3' style={{ backgroundColor: `${colors.primary[400]}` }}>
                        <h5 className='font-bold text-xl text-center border-b-2 pb-2 mt-2'>What makes a good review</h5>
                        {data.map((item, i) => {
                            return (
                                <div className='mb-3 p-2' key={i}>
                                    <p className='text-lg p-1'>{item.question}</p>
                                    <p className='p-1'>{item.suggesion}</p>
                                    <hr className='bg-gray-400' />
                                </div>
                            )
                        })}
                    </div>

                    <div className='p-4 shadow-md w-full md:w-3/4' style={{ backgroundColor: `${colors.primary[400]}` }}>
                        {BuyProduct ?
                            <div className='border-b-2 border-gray-300 mb-4'>
                                <h5 className='font-bold text-xl p-2'>Rate this product </h5>
                                <div className='flex gap-2 p-2'>
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<FaRegStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </div>
                                <div>
                                    <h5 className='font-bold text-xl p-2'>Review this product</h5>
                                    <textarea
                                        value={reviewContaint}
                                        onChange={(e) => { setreviewContaint(e.target.value) }}
                                        placeholder='Description'
                                        className='w-full h-48 outline-none p-2 bg-transparent border-2 border-gray-300' />
                                </div>
                                <div>
                                    <p>Title (optional)</p>
                                    {value !== null && (
                                        <Box className='text-green-400'>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </div>
                                <div>
                                    <Button
                                        onClick={handleReview}
                                        className="w-full"
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            padding: ".4rem 0",
                                            marginBottom: 3,
                                            bgcolor: "#9155FD",
                                            "&:hover": {
                                                bgcolor: "#9175FD",
                                            },
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                            :
                            <div className='text-center'>
                                <img className='mb-4 mx-[auto]' src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-404_4134d8.png' alt='revire image' />
                                <h3 className='font-bold text-2xl'>Haven't purchased this product ?</h3>
                                <p className='text-lg m-2'>Sorry! You are not allowed to review this product since you haven't bought it on Flipkart.</p>
                            </div>}
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default ReviewForm