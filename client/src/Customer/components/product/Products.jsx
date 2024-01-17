import React, { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import HeaderTittle from '../HeaderTittle';

const Products = ({ Categories }) => {
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


  return (
    <>
    <HeaderTittle tittle={`Product from ${Categories}`}/>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-4 mb-2">
        {filteredData.map((item) => (
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
        ))}
      </div>
    </>
  );
};

export default Products;
