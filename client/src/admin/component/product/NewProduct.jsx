import React, { useEffect, useState } from "react";
import axios from "axios";
import FormColor from "../FormColor";
import Image from "../Image";
import { Button, Grid, useTheme } from "@mui/material";
import { toast } from 'react-toastify'
import { tokens } from "../../../theme";
import HeaderTittle from "../../../Customer/components/HeaderTittle";
import { getProductList } from "../../../redux/features/productSlice";
import { useDispatch } from "react-redux";

const productField = [
  {
    id: "title",
    lable: "Product Title",
    colSize: 12,
    smColSize: 12,
    dataType: "text",
    placeholder: "Enter Product Title"

  },
  {
    id: "brand",
    lable: "Product Brand",
    colSize: 12,
    smColSize: 6,
    dataType: "text",
    placeholder: "Enter Product Brand"
  },
  {
    id: "price",
    lable: "Product Price",
    colSize: 12,
    smColSize: 6,
    dataType: "number",
    placeholder: "Enter Product Price"
  },
  {
    id: "discountedPrice",
    lable: "Discounted Price",
    colSize: 12,
    smColSize: 6,
    dataType: "number",
    placeholder: "Enter Discounted Price"
  },
  {
    id: "discountedPercentage",
    lable: "Discounted Percentage",
    colSize: 12,
    smColSize: 6,
    dataType: "number",
    placeholder: "Enter Discounted Percentage"
  },
  {
    id: "quantity",
    lable: "Quantity",
    colSize: 12,
    smColSize: 6,
    dataType: "number",
    placeholder: "Enter product Quantity"
  }
];

//  function to calculate the discount percentage
function calculateDiscountPercentage(price, discountedPrice) {
  if (price && discountedPrice) {
    const percentage = ((price - discountedPrice) / price) * 100;
    return Math.round(percentage);
  }
  return 0;
}

const NewProduct = ({ closeForm, productId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch()
  const [FstLevel, setFstLevel] = useState([])
  const [SndLevel, setSndLevel] = useState([])
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [subImage, setSubImage] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [topLevelCategory, settopLevelCategory] = useState('');
  const [secondLevelCategory, setsecondLevelCategory] = useState('');
  const [thirdLevelCategory, setthirdLevelCategory] = useState('');
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    price: 0,
    discountedPrice: 0,
    discountedPercentage: 0,
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    quantity: 0,
    description: "",
    color: [],
    size: [],
    mainImage: "",
    subImages: [],
  });

  // for getting Category 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fstLevelresponse = await axios.get("/api/category/topLevelCategory");
        const data1 = fstLevelresponse.data;
        setFstLevel(data1);
        const sndLevelresponse = await axios.get("/api/category/secondLevelCategory");
        const data2 = sndLevelresponse.data;
        setSndLevel(data2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])


  // get data for edit modde 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product/id/${productId}`);
        setProductData(response.data);
        setthirdLevelCategory(response.data.category.name);
        setSelectedSizes(response.data.size);
        setSelectedColor(response.data.color);
        setMainImage(response.data.mainImage)
        setSubImage(response.data.subImage)
        const res = await axios.get("/api/category/thirdLevelCategory");
        const productCategoryId = response.data.category._id;
        const matchingCategories = res.data.getThirdLevelCategory.filter(category => category._id === productCategoryId);
        if (matchingCategories.length > 0) {
          settopLevelCategory(matchingCategories[0].parentCategory.parentCategory.name);
          setsecondLevelCategory(matchingCategories[0].parentCategory.name);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    if (productId) {
      fetchProducts();
    }
  }, [productId]);


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

  const handlesubmit = async () => {
    const updatedProductData = {
      ...productData,
      color: selectedColor,
      size: selectedSizes,
      subImage: subImage,
      mainImage: mainImage,
      topLevelCategory: topLevelCategory,
      secondLevelCategory: secondLevelCategory,
      thirdLevelCategory: thirdLevelCategory,
    };
    if (productId) {
      const response = await axios.put(`/api/admin/product/${productId}`, updatedProductData);
      const data = response.data.message;
      toast.success(data);
    } else {
      const response = await axios.post('/api/admin/product', updatedProductData);
      const data = response.data.message;
      toast.success(data);
    }
    dispatch(getProductList());
    await closeForm();
    setTimeout(() => {
      //  window.location.reload();
    }, 2000);
  };


  return (
    <>
      <div className="p-4 text-sm" style={{ backgroundColor: `${colors.primary[400]}`, color: `${colors.grey[300]}` }}>
        <HeaderTittle tittle={"Product"} subtitle={"add new product"} />
        {/* <form onSubmit={handlesubmit}> */}
        <Grid container spacing={1} >
          {productField.map((item, i) => {
            return (
              <Grid key={i} item xs={item.colSize} sm={item.smColSize}>
                <div className="mb-2">
                  <label className="block font-bold mb-2">
                    {item.lable}
                  </label>
                  <input
                    required
                    type={item.dataType}
                    name={item.id}
                    className="w-full px-3 h-[38px]  py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder={item.placeholder}
                    value={productData[item.id]}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            );
          })}

          <Grid item xs={12} sm={6}>
            <label className="block  font-bold mb-2">
              Top Level Category
            </label>
            <select
              value={topLevelCategory}
              onChange={(e) => { settopLevelCategory(e.target.value) }}
              className="block w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Choose top level</option>
              {FstLevel.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="block  font-bold mb-2">
              Second Level Category
            </label>
            <select
              value={secondLevelCategory}
              onChange={(e) => { setsecondLevelCategory(e.target.value) }}
              className="block w-full p-2 border rounded-md focus:outline-none focus:border-slate-500"
            >
              <option value="" disabled>Choose second level</option>
              {SndLevel.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name} ({item.parentCategory.name})
                </option>
              ))}
            </select>

          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="mb-2">
              <label className="block font-bold mb-2">
                Third Level Category
              </label>
              <input
                required
                type="text"
                name="thirdLevelCategory"
                className="w-full px-3 h-[38px]  py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder='Enter third Level category'
                value={thirdLevelCategory}
                onChange={(e) => { setthirdLevelCategory(e.target.value) }}
              />
            </div>

          </Grid>
          <Grid item xs={12}>
            <div>
              <label className="block  font-bold mb-2">
                Description
              </label>
              <textarea
                type="text"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="product description"
                value={productData.description}
                onChange={(e) => setProductData((prevData) => ({ ...prevData, description: e.target.value }))}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="mb-4">
              <label className="block font-bold mb-2">
                Size
              </label>
              <input
                type="text"
                className="w-full px-3 h-[38px]  py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter sizes (S,M,L)"
                value={selectedSizes.join(",")}
                onChange={(e) => setSelectedSizes(e.target.value.split(","))}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="block font-bold mb-2">
              Color
            </label>
            <FormColor setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
          </Grid>

          <Grid item xs={12}>
            <Image setSubImage={setSubImage} setMainImage={setMainImage} mainImagess={mainImage} subImagess={subImage} />
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
              {productId ? "Update" : "Save"}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => { closeForm() }}
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

export default NewProduct;


