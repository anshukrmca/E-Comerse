import React from 'react'
import { Avatar, Box, Grid, Rating } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";

const ProductRevirewCard = ({item}) => {
    return (
        <>
            <div className="p-4 shadow-lg">
                <Grid container gap={3}>
                    <Grid item xs={12} md={1}>
                        <Box>
                            <Avatar
                                className="text-white"
                                sx={{ width: 46, height: 46, bgcolor: "#9155fd" }}
                                src={item?.user.profilePicture}
                            >
                                A
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="">
                            <div>
                                <p className="font-semiblod text-lg">{item?.user.name}</p>
                                <p className="opacity-50 text-sm">{item?.createdAt}</p>
                            </div>
                            <Rating value={item?.rating} name="half-ratimg" readOnly precision={0.5} />
                            <p className="text-sm font-thin">
                               {item?.review}
                            </p>
                        </div>
                    </Grid>
                    {/* <div>
                        <MdDeleteForever/>
                    </div> */}
                </Grid>
            </div>
        </>
    )
}

export default ProductRevirewCard