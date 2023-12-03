"use client"
import React, { useState } from 'react';
import feedbackav from '../assets/feedback.png';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function FeedbackForm({ handleFeedbackClose, handleCloseClick }) {
  const [formData, setFormData] = useState({
    selectedSuggestion: null,
    comment: '',
    name: '',
    phoneNumber: '',
    rating: null,
    dish: '',
  });

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(null);


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };



  const ratingChanged = (newRating) => {
    handleInputChange('rating', newRating);
  };

  const handleSubmit = () => {
    console.log(formData);
    console.log('Recommendation:', formData.selectedSuggestion);
    console.log('Comment submitted:', formData.comment);
    console.log('Name submitted:', formData.name);
    console.log('Phone Number submitted:', formData.phoneNumber);
    console.log('RATE:', formData.rating);
    console.log('Dish:', formData.dish);

    // Reset form state if needed
    setFormData({
      selectedSuggestion: null,
      comment: '',
      name: '',
      phoneNumber: '',
      hover: null,
      rating: null,
      dish: '',
    });

    handleFeedbackClose();
  };

  const feedbackSuggestions = [
    { text: 'No 😐' },
    { text: 'Absolutely! 😋' },
  ];
  const handleSuggestionClick = (suggestion, index) => {
    handleInputChange('selectedSuggestion', suggestion);
    setSelectedSuggestionIndex(index);
  };

  return (
    <div className='flex  flex-col items-center justify-center lg:flex-row  m-3 lg:items-end '>
      <section className='  flex justify-start text-start  flex-col lg:m-8 bg-[#FFFBF9] max-w-md rounded-md shadow-md '>
        <div className='bg-[#84141A] text-white px-6 py-3 flex sticky top-0 justify-between'>
          <p>Help us serve you better!</p>
          <p onClick={handleCloseClick}
                    className="cursor-pointer">X</p>

        </div>
        <div className='p-5  md:mt-3'>
          <p className='font-medium'>Star Power</p>
          <p className='font-light'>Share your star-studded thoughts! How many stars would you award Karazah?</p>
          <div className='my-3'>
            {[...Array(5)].map((star, index) => {
              const currentRate = index + 1;
              return (
                <label key={index}>
                  <input
                    className='hidden'
                    type='radio'
                    name='rating'
                    value={currentRate}
                    onClick={() => ratingChanged(currentRate)}
                  />
                  <FaStar
                    className='star'
                    size={30}
                    color={currentRate <= (formData.hover || formData.rating) ? '#84141A' : '#e4e5e9'}
                    onMouseEnter={() => handleInputChange('hover', currentRate)}
                    onMouseLeave={() => handleInputChange('hover', null)}
                  ></FaStar>
                </label>
              );
            })}
          </div>
          <p className='my-3'>Would you recommend us to friends and family?</p>
          <div className='flex'>
        {feedbackSuggestions.map((suggestion, index) => (
          <button
            key={suggestion.text}
            className={`p-1 mr-4 ${
              selectedSuggestionIndex === index ? 'bg-red-900 text-white' : 'bg-white border-red-900 border'
            } rounded-md`}
            onClick={() => handleSuggestionClick(suggestion, index)}
          >
            {suggestion.text}
          </button>
        ))}
      </div>
          <label className='block mt-4 mb-3 ' htmlFor='dish'>
            Your Most Loved Dish! 🎉
          </label>
          <input
            id='dish'
            type='text'
            className='p-1 w-[95%]  border rounded-md focus:outline-none focus:border-[#84141A] mb-4'
            placeholder='Loved Dish'
            value={formData.dish}
            onChange={(e) => handleInputChange('dish', e.target.value)}
          />
          <label className='block my-2 ' htmlFor='comment'>
            Comments
          </label>
          <textarea
            id='comment'
            className='w-[95%] p-3 border rounded-md focus:outline-none focus:border-[#84141A] mb-4'
            placeholder='Dining or delivery, your experience matters. Let us know what you think'
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
          />
          <label className='block mb-1 ' htmlFor='name'>
            Your Name
          </label>
          <input
            id='name'
            type='text'
            className='p-1 w-[95%]  border rounded-md focus:outline-none focus:border-[#84141A] mb-4'
            placeholder='Your Name'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <label className='block my-2' htmlFor='phoneNumber'>
            Phone Number
          </label>
          <input
            id='phoneNumber'
            type='tel'
            className='p-1 w-[95%]  border rounded-md focus:outline-none focus:border-[#84141A] mb-4'
            placeholder='Phone Number'
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          />
          <button
            className='bg-[#84141A] w-[95%] block hover:bg-[#570c10] text-white m-1 py-2 px-4 rounded'
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      </section>
      <Image alt='avatar' className='lg:block hidden' width={250} src={feedbackav} />
    </div>
  );
}
