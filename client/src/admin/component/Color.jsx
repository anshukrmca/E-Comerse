import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const Color = () => {
  const [color, setColor] = useState([]);

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

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.colorCode,
      color: getTextColor(data.colorCode),
    }),
    multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.colorCode,
      color: getTextColor(data.colorCode),
    }),
    multiValueLabel: (styles) => ({ ...styles, color: 'white' }),
    multiValueRemove: (styles) => ({ ...styles, color: 'white' }),
  };

  const getTextColor = (backgroundColor) => {
    const brightness = parseInt(backgroundColor, 16) > 0xffffff / 2 ? 'black' : 'white';
    return brightness;
  };

  const handleChange = (selectedOption) => {
    console.log('handleChange', selectedOption.selecterlable);
  };

//   const handleInputChange = (inputValue, actionMeta) => {
//     console.log('handleInputChange', inputValue, actionMeta);
//   };

  const optionsWithDisabled = [
    { value: '', label: 'Choose color', isDisabled: true },
    ...color.map((colorOption) => ({
      value: colorOption.colorName,
      label: colorOption.colorName,
      colorCode: colorOption.colorCode,
    })),
  ];

  return (
    <CreatableSelect
      options={optionsWithDisabled}
      onChange={handleChange}
    //   onInputChange={handleInputChange}
      isMulti
      styles={colorStyles}
    />
  );
};

export default Color;
