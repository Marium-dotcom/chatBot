"use client"
import { useEffect, useRef, useState } from 'react';
import menu from '../api/menu.json';
import { motion, AnimatePresence } from 'framer-motion'; 
import chef from "../assets/chef.png"
import Image from 'next/image';

const Menu = ({handleMenuClose}) => {
  const [selectedCategory, setSelectedCategory] = useState('All dishes');
  const categoryRef = useRef(null);
  const CarRef = useRef(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(CarRef.current.scrollWidth - CarRef.current.offsetWidth)

  }, []);

  // it extracts the uique category fom the json data
  const categories = ["All dishes", ...Array.from(new Set(menu.map(item => item.category)))];

  const filteredMenu = selectedCategory === "All dishes" 
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className='flex justify-end items-end'>
      <div className="w-[370px] lg:max-w-lg rounded shadow-lg bg-white flex flex-col justify-between h-[600px] mx-auto">
        <div className='bg-[#84141A] text-white px-6 py-3 flex sticky top-0 justify-between'>
          <p>Deliciously Crafted food 😋</p>
          <p onClick={handleMenuClose}
                    className="cursor-pointer">X</p>
        </div>
<motion.div ref={CarRef} className=' overflow-hidden cursor-grab'>
        <motion.div
          className="flex   "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={categoryRef}
          drag={'x'}
          dragConstraints={{right:0, left: -width}}
          
        >
          {categories.map(category => (
            <motion.button
              key={category}
              className={`flex-shrink-0 flex items-center justify-center my-4 mx-2 py-1 px-4 rounded-md shadow-sm ${
                selectedCategory === category ? 'bg-red-900 text-white' : 'bg-white border border-red-900 text-gray-700'
              }`}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCategory(category)}
              variants={itemVariants}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
</motion.div>
        <div className="flex mt-1 overflow-y-auto scrollbar-hide h-[90%] flex-col">
          <AnimatePresence>
            {filteredMenu.map(item => (
              <motion.div
                key={item.id}
                className='flex items-center p-2 border-b border-red-900 mx-3'
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -50 }}
              >
                <Image
                  src={item.imageURL}
                  alt={item.itemName}
                  width={100}
                  height={50}
                ></Image>
                <div className=' ml-2'>
                  <h3 className=" text-red-900 font-medium  mb-2">{item.itemName}</h3>
                  <p className="text-gray-900 text-sm font-light  mb-2">{item.ingredients.join(', ')}</p>
                  <p className="text-green-600 font-bold">${item.priceInUSD.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Image className='hidden lg:block' src={chef} width={350} alt='chef'></Image>
    </div>
  );
};

export default Menu;

