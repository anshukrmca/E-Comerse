import React from 'react'
import { Box, Grid, LinearProgress, Rating } from "@mui/material";
import ProductRevirewCard from './ProductRevirewCard';

const ratingdata = [
    {
      reviewTitle: "Excellent",
      value: 90,
      reviewNo: 33564,
      color: "success",
    },
    {
      reviewTitle: "Good",
      value: 60,
      reviewNo: 33564,
      color: "primary",
    },
    {
      reviewTitle: "Average",
      value: 50,
      reviewNo: 33564,
      color: "warning",
    },
    {
      reviewTitle: "Poor",
      value: 30,
      reviewNo: 33564,
      color: "error",
    },
  ];

const ProductReview = () => {
  return (
    <>
<section className=" p-4">
        <h1 className="font-semiblod text-lg pb-4">Recent Review & Rating</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="space-y-5 mb-4">
              {[1, 1, 1].map((item, index) => (
                <ProductRevirewCard key={index} />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-xl font-semibold pb-2">Product Rating</h1>
            <div className="flex items-center space-x-3">
              <Rating value={4.5} precision={0.5} readOnly />
            </div>
            {ratingdata.map((item, index) => (
              <Box className="mt-5 space-y-3" key={index}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={3}>
                    <p>{item.reviewTitle}</p>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <LinearProgress
                      sx={{
                        bgcolor: "#d0d0d0",
                        borderRadius: 4,
                        height: 7,
                      }}
                      variant="determinate"
                      value={item.value}
                      color={item.color}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <p>{item.reviewNo}</p>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductReview