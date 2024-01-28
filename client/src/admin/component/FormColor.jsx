import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const FormColor = ({setSelectedColor}) => {
  const [color, setColor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/color');
        const data = response.data;
        setColor(data);
      } catch (error) {
        console.error('Error fetching color data:', error);
      }
    };

    fetchData();
  }, []);

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white'}),
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
    const brightness = parseInt(backgroundColor, 16) > 0xffffff / 2 ? 'black' : 'black';
    return brightness;
  };
  

  const handleChange = (selectedOption) => {
    const selectedValues = selectedOption.map(option => option.value);
    setSelectedColor(selectedValues);
  };

  const optionsWithDisabled = [
    { value: '', label: 'Choose color', isDisabled: true },
    ...color.map((colorOption) => ({
      value: colorOption.colorName,
      label: colorOption.colorName,
      colorCode: colorOption.colorCode,
    })),
  ];

  return (
    <div>
      <CreatableSelect
      options={optionsWithDisabled}
      onChange={handleChange}
    //   onInputChange={handleInputChange}
      isMulti
      styles={colorStyles}
    />
    </div>
  );
};

export default FormColor;
