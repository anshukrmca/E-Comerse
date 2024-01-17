import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from './Product';
import HeaderTittle from '../HeaderTittle';
import Layout from '../layout/Layout';

const AllProducts = () => {
  const category = useParams()
  const [products, setProducts] = useState([])

  // product data 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/category/${category.name.toLowerCase()}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <Layout>
        <HeaderTittle tittle={`Products from ${category.name} `} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-4 mb-2 mx-4 ">
          {products.map((item) => {
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
          })}
        </div >
      </Layout>
    </>
  )
}

export default AllProducts