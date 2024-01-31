import React, { useEffect, useState } from 'react'
import AddCategory from '../InputForm/AddCategory'
import axios from 'axios'
import HeaderTittle from '../../../Customer/components/HeaderTittle'
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const Category = () => {
  const [category, setCategory] = useState([])
  const [newCategory, setNewCategory] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/category/secondLevelCategory");
        const data = response.data;
        setCategory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const closeForm = () => {
    setNewCategory(false);
  }

  const handleEdit = async(TopId,SecId)=>{
    console.log("T",TopId,"s",SecId);
  }
  const handleDelete = async(TopId,SecId)=>{
    console.log("T",TopId,"s",SecId);
  }
  return (
    <div>
      <div onClick={(e) => { setNewCategory(!newCategory) }} className="font-semibold cursor-pointer p-2 mb-4  uppercase bg-gray-50 dark:bg-gray-700">
        <span className='px-3'>&#128073;</span>Add New Category
      </div>
      {newCategory && <AddCategory closeForm={closeForm} />}


      <div>
        <HeaderTittle tittle={"All Category List"} />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Level
                </th>
                <th scope="col" className="px-6 py-3">
                  Second Level
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {
                category.map((item, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.parentCategory.name}
                      </th>
                      <td className="px-6 py-4">
                        {item.name} ({item.parentCategory.name.toLowerCase()})
                      </td>
                      <td className="px-6 py-4 flex gap-4 text-white">
                        <span className='bg-yellow-500 p-2 rounded-full cursor-pointer' onClick={()=>{handleEdit(item._id,item.parentCategory._id)}}><FaRegEdit  size={20} /></span>
                        <span className='bg-red-200 p-2 rounded-full text-red-700 cursor-pointer' onClick={()=>{handleDelete(item._id,item.parentCategory._id)}}><FaTrash  size={20} /></span>
                      </td>

                    </tr>
                  )
                })
              }


            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Category