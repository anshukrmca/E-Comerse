import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const FormColor = ({ setSelectedColor, selectedColor }) => {
  const [color, setColor] = useState([]);
  const [Editcolor, setEditcolor] = useState([]);


  // edit mode set color 
  useEffect(()=>{
    const initialSelectedValues = selectedColor.map((colorValue) => ({
      value: colorValue.value, // Assuming your selectedColor is an array of objects with value and label properties
      label: colorValue.label,
      colorCode: getColorCodeFromValue(colorValue.value),
    }));

    if(selectedColor != ''){
      setEditcolor(initialSelectedValues);
     }else{
      setEditcolor([])
     }
  },[selectedColor])
  
  // get color from api 
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

  const getColorCodeFromValue = (value) => {
    const colorOption = color.find((c) => c.colorCode === value);
    return colorOption ? colorOption.colorCode : '';
  };

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
    const brightness = parseInt(backgroundColor, 16) > 0xffffff / 2 ? 'black' : 'black';
    return brightness;
  };


  const handleChange = (selectedOption) => {
    const selectedValues = selectedOption.map(option => ({
      value: option.value,
      label: option.label
    }));
    console.log("on c", selectedValues)
    setSelectedColor(selectedValues);
  };

  const optionsWithDisabled = [
    { value: '', label: 'Choose color', isDisabled: true },
    ...color.map((colorOption) => ({
      value: colorOption.colorCode,
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
        value={Editcolor}
      />
    </div>
  );
};

export default FormColor;
