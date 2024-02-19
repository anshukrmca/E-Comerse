import React from 'react'
import { Avatar, Box, Grid, Rating } from "@mui/material";

const ProductRevirewCard = () => {
    return (
        <>
            <div className="p-4 shadow-lg">
                <Grid container gap={3}>
                    <Grid item xs={12} md={1}>
                        <Box>
                            <Avatar
                                className="text-white"
                                sx={{ width: 46, height: 46, bgcolor: "#9155fd" }}
                            >
                                A
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="">
                            <div>
                                <p className="font-semiblod text-lg">Anshu Kumar</p>
                                <p className="opacity-50 text-sm">April 3, 2024</p>
                            </div>
                            <Rating value={4.5} name="half-ratimg" readOnly precision={0.5} />
                            <p className="text-sm font-thin">
                                Lorem ipsum dolor amet consectetur adipisicing elit.
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ProductRevirewCard