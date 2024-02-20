import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const Products = () => {
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

  // useEffect(() => {
  //   const filterAndMapData = (Categories) => {
  //     const filteredProducts = products.filter(
  //       (products) => products.category === Categories.toLowerCase()
  //     );
  //     setFilteredData(filteredProducts);
  //   };
  //   filterAndMapData(Categories);

  // }, [Categories, products]);


  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4 mb-2">
        {filteredData.map((item) => (
          <ProductCard
            key={item._id}
            P_id={item._id}
            P_name={item.title}
            description={item.description}
            price={item.price}
            color={item.color}
            size={item.size}
            image={item.mainImage}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
