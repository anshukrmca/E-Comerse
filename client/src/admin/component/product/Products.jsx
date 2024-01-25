import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Products = () => {
  const [color, setColor] = useState([])
  const [selectedColor, setSelectedColor] = useState([]);
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    discountedPercentage: 0,
    quantity: 0,
    color: [],
    size: [],
    mainImage: '',
    subImages: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/color');
        const data = response.data;
        setColor(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching color data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-2xl mx-auto">
        {/* Add your form fields here */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            Title
          </label>
          <select
            id="colorDropdown"
            name="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full text-black p-2 border rounded"
          >
            <option value="" disabled>Select a color</option>
            {color.map((colorOption) => (
              <option key={colorOption._id} value={colorOption.colorName} style={{ color: `#${colorOption.colorCode}` }}>
                {colorOption.colorName}
              </option>
            ))}
          </select>


        </div>


        {/* Repeat the above structure for other form fields */}

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Products;
