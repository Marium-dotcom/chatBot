"use client"
import React, { useState } from 'react';
import feedbackav from '../assets/feedback.png';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";

export default function FeedbackForm({ handleFeedbackClose }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
const [hover, setHover] = useState();
const [rating, setRate] = useState();
const [activeSuggestion, setActiveSuggestion] = useState(null);


  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = () => {
    console.log('reccomendation:', selectedSuggestion);
    console.log('Comment submitted:', comment);
    console.log('Name submitted:', name);
    console.log('Phone Number submitted:', phoneNumber);
    console.log('RATE:', rating);

    // Reset form state if needed
    setSelectedSuggestion(null);
    setComment('');
    setName('');
    setPhoneNumber('');
    handleFeedbackClose();

  };


const feedbackSuggestions = [
  {  text: 'No 😐' },
  {  text: 'Absolutly! 😋' },
];


const ratingChanged = (newRating) => {
  console.log(newRating)
}



  return (
    <div className='flex  items-end '>
      <Image alt="avatar" width={350} src={feedbackav}  />
      <section className="   flex text-black justify-between flex-col m-8 bg-[#FFFBF9]  rounded-md shadow-md p-6">
        <p className=' mb-4 '>Dish Ratings</p>
        <div className="flex justify-around mb-4">
{[...Array(5)].map((star, index) => {const currentRate = index+1;
return(<label key={index}>

        <input className=' hidden' type="radio" name='rating' value={currentRate} onClick={()=> setRate(currentRate)}/>
      <FaStar
      className='star'
      size={50}
      color={currentRate <= (hover  || rating)? "#84141A": "#e4e5e9"}
      onMouseEnter={()=>setHover(currentRate)}
      onMouseLeave={()=>setHover(null)}
     ></FaStar>
      </label>)
      })}
        </div>
        <p className=' mb-2 '>Would you reccomend us?</p>
        <div className="flex justify-around mb-4">
          {feedbackSuggestions.map((suggestion) => (
            <button
              key={suggestion.text}
              className={`p-2 bg-white border-red-900 border rounded-sm }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
            {suggestion.text}  
            </button>
          ))}
        </div>
        <label className="block mb-2  " htmlFor="comment">
          Comments
        </label>
        <textarea
          id="comment"
          className="p-2 border rounded-md focus:outline-none focus:border-[#84141A] mb-4"
          placeholder="Leave a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <label className="block mb-2  " htmlFor="name">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          className="p-2 border rounded-md focus:outline-none focus:border-[#84141A] mb-4"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
        />
        <label className="block mb-2  " htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className="p-2 border rounded-md focus:outline-none focus:border-[#84141A] mb-4"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button
          className="bg-[#84141A] hover:bg-[#570c10] text-white py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
     
      </section>
    </div>
  );
}
