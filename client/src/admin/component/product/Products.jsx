import React, { useEffect, useState } from "react";
import axios from "axios";
import FormColor from "../FormColor";
import Image from "../Image";
import { Button, Grid } from "@mui/material";

const productField = [
  {
    id: "title",
    lable: "Product Title",
    colSize: 12,
    smColSize: 12,
    dataType:"text"
  },
  {
    id: "brand",
    lable: "Product Brand",
    colSize: 12,
    smColSize: 6,
    dataType:"text"
  },
  {
    id: "price",
    lable: "Product Price",
    colSize: 12,
    smColSize: 6,
    dataType:"number"
  },
  {
    id: "discountedPrice",
    lable: "Discounted Price",
    colSize: 12,
    smColSize: 6,
    dataType:"number"
  },
  {
    id: "discountedPercentage",
    lable: "Discounted Percentage",
    colSize: 12,
    smColSize: 6,
    dataType:"number"
  },
  {
    id: "topCategory",
    lable: "Top Category",
    colSize: 12,
    smColSize: 6,
    dataType:"text"
  },
  {
    id: "secondCategory",
    lable: "Second Category",
    colSize: 12,
    smColSize: 6,
    dataType:"text"
  },
  {
    id: "thirdCategory",
    lable: "Third Category",
    colSize: 12,
    smColSize: 6,
    dataType:"text"
  },
  {
    id: "quantity",
    lable: "Quantity",
    colSize: 12,
    smColSize: 6,
    dataType:"number"
  },
];

// Helper function to calculate the discount percentage
function calculateDiscountPercentage(price, discountedPrice) {
  if (price && discountedPrice) {
    const percentage = ((price - discountedPrice) / price) * 100;
    return Math.round(percentage);
  }
  return 0;
}

const Products = () => {
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [subImage, setSubImage] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    price: 0,
    discountedPrice: 0,
    discountedPercentage: 0,
    topCategory: "",
    secondCategory: "",
    thirdCategory: "",
    quantity: 0,
    description: "",
    color: [],
    size: [],
    mainImage: "",
    subImages: [],
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductData((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: value,
      };

      // Calculate discountedPercentage if both price and discountedPrice are present
      if ((name === 'price' || name === 'discountedPrice') && updatedData.price && updatedData.discountedPrice) {
        const calculatedPercentage = calculateDiscountPercentage(updatedData.price, updatedData.discountedPrice);
        updatedData.discountedPercentage = calculatedPercentage;
      }

      return updatedData;
    });
  };

  // Update productData.color with selectedColor
  const handlesubmit = () => {
    const updatedProductData = {
      ...productData,
      color: selectedColor,
      size: selectedSizes,
      subImages: subImage,
      mainImage:mainImage
    };

    // Add logic to handle form submission with updatedProductData
    console.log("Form submitted with data:", updatedProductData);
  };

  return (
    <>
      <div className="bg-[#f0f5ff] dark:bg-slate-400 p-4">
        <p className="text-indigo-700  font-semibold mb-4">ADD A NEW ADDRESS</p>
        {/* <form onSubmit={handlesubmit}> */}
        <Grid container spacing={1}>
          {productField.map((item, i) => {
            return (
              <Grid key={i} item xs={item.colSize} sm={item.smColSize}>
                <div className="mb-2">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    {item.lable}
                  </label>
                  <input
                    required
                    type={item.dataType}
                    name={item.id}
                    className="w-full px-3 h-[38px] text-black py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder={`Enter ${item.lable}`}
                    value={productData[item.id]}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                type="text"
                className="w-full px-3 text-black py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="product description"
                value={productData.description}
                onChange={(e) => setProductData((prevData) => ({ ...prevData, description: e.target.value }))}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Size
              </label>
              <input
                type="text"
                className="w-full px-3 h-[38px] text-black py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter sizes (S,M,L)"
                value={selectedSizes.join(",")}
                onChange={(e) => setSelectedSizes(e.target.value.split(","))}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block text-gray-600 text-sm font-bold mb-2">
              Color
            </label>
            <FormColor setSelectedColor={setSelectedColor} />
          </Grid>

          <Grid item xs={12}>
            <Image setSubImage={setSubImage} setMainImage={setMainImage}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
            onClick={handlesubmit}
              className="w-full"
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                padding: ".4rem 0",
                bgcolor: "#9155FD",
                "&:hover": {
                  bgcolor: "#9175FD",
                },
              }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              className="w-full"
              variant="contained"
              sx={{
                mt: 1,
                padding: ".4rem 0",
                bgcolor: "#9155FD",
                "&:hover": {
                  bgcolor: "#9175FD",
                },
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        {/* </form> */}
      </div>
    </>
  );
};

export default Products;

{
  /* Add your form fields here */
}
{
  /* <FormColor setSelectedColor={setSelectedColor}/>

       <div className="mb-4">
          <label htmlFor="sizes" className="block text-gray-700">
            Sizes:
          </label>
          <input
            type="text"
            id="sizes"
            className="w-full p-2 border rounded text-black"
            placeholder="Enter sizes (S,M,L)"
            value={selectedSizes.join(',')}
            onChange={(e) => setSelectedSizes(e.target.value.split(','))}
          />
        </div> */
}

{
  /* <Image setSubImage={setSubImage}/> */
}
