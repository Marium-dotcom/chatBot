"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import menu from "../../api/menu.json"
const CategoryDetails = () => {

    const {Category} = useParams();
console.log(Category);
const categorys = decodeURI(Category);

console.log(categorys);
console.log(menu);
const categoryItems = menu.filter((item) => item.category === categorys);
console.log(categoryItems);
  return (
    <div className="container bg-white text-red-900 max-w-md mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{categorys} Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryItems.map(item => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-md">
            <img src={item.imageURL} alt={item.itemName} className="mb-2" />
            <p className="font-bold">{item.itemName}</p>
            <p>${item.priceInUSD}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

  
  export default CategoryDetails;
  