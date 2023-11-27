"use client"
import React, { useState, useEffect, useRef } from 'react';
import data from './api/data';
import Image from 'next/image';
import bakr2 from "./assets/avatar.png";
import smallbakr from "./assets/chat.png";
import send from "./assets/send.svg";
import Link from 'next/link';

function Home() {
  const [options, setOptions] = useState([
    'Menu Exploration',
    'Specials Announcement',
    'Reserve',
    'Feedback',
  ]);
  const [isFirstOpen, setFirstOpen] = useState(true);

  const [conversation, setConversation] = useState([]);
  const [response, setResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isChatVisible, setChatVisible] = useState(false);
  const chatContainerRef = useRef(null);

  const handleOptionClick = async (option) => {
    try {
      const userMessage = { type: 'user', text: option };
      setConversation((prev) => [...prev, userMessage]);

      const botResponse = data[option];
      const botMessage = { type: 'bot', text: botResponse };
      setConversation((prev) => [...prev, botMessage]);

      setResponse(botResponse);
    } catch (error) {
      console.error('Error accessing data:', error);
    }
  };

  const handleUserInput = (text) => {
    setUserInput(text);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      const userMessage = { type: 'user', text: userInput };
      setConversation((prev) => [...prev, userMessage]);


      setUserInput(''); 
    }
  };




  const handleAvatarClick = () => {
    setChatVisible(!isChatVisible);
    if (isFirstOpen) {
      setFirstOpen(false);
    }
  };

  const handleCloseClick = () => {
    setChatVisible(false);
  };

  return (
    <main className='bg-[#FFFBF0] bg h-screen flex flex-col   justify-between items-end '>
   <Link href={'/ChatBot'}>   <button className=' bg-yellow-300 text-black p-10'>CLICK HERE FOR THE WHOLE CHAT PAGE</button> </Link>
      {isChatVisible && (
        <>

        <div className=" relative chat flex justify-between flex-col     m-8 bg-[#FFFBF9]   max-w-md h-[80%] rounded-md shadow-md overflow-y-auto" ref={chatContainerRef}>
                         <div className='bg-[#84141A] p-4 flex justify-between'> <p>Chatbot</p>               <p onClick={handleCloseClick} className="cursor-pointer">X</p>
 </div>

          <div className='flex p-5'>

            <Image  width={50} src={smallbakr} alt="Chatbot Avatar" className=" w-12 h-14 rounded-full mr-2" />
            <div>
              <p className="mb-2 text-[#84141A]">Bakr here! 🌟 Ready to guide you through a feast of flavors at Karazah. What can I assist you with today?</p>

              {options.map((option) => (
                <div key={option} className=''>
                  <button
                    onClick={() => handleOptionClick(option)}
                    className="bg-[#84141A] hover:bg-[#570c10] text-white py-2 px-4 rounded mr-2 mb-2">
                    {option}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {conversation.length > 0 && (
            <div className="flex flex-col p-5 flex-1 overflow-y-auto">
              {conversation.map((message, index) => (
                <div key={index} className={`flex items-start mb-2 ${message.type === 'user' ? 'justify-end ' : 'justify-start'}`}>
                  {message.type === 'bot' && (
                    <Image key={`avatar-${index}`} width={60} src={smallbakr} alt="Chatbot Avatar" className=" w-10 h-12   rounded-full mr-2" />
                  )}
                  <div key={`message-${index}`} className={`py-2 px-3 rounded-lg ${message.type === 'user' ? 'bg-[#F0F0F0] text-black self-end' : 'text-[#84141A] self-start'}`}>
                    {message.type === 'bot' ? <TypingEffect text={message.text} /> : message.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex  sticky bottom-0">
            <input
              type="text"
              value={userInput}
              onChange={(e) => handleUserInput(e.target.value)}
              className=" text-black border-gray-400 p-2 flex-1 rounded-l-md"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className=" bg-white p-3 rounded">
              <Image width={30} src={send}></Image>
            </button>
          </div>
        </div></>
      )}

      {!isChatVisible && (
        <div className='flex items-start px-1'>
          <p onClick={handleAvatarClick} className='cursor-pointer animate-bounce max-w-sm bg-red-900  text-white p-2 rounded-l-[20px] rounded-tr-[10px] '> 
          Hello! 🌟 Bakr here, ready with my virtual tablet! How may I assist you today?</p>
          <Image width={200} src={bakr2} style={{ opacity: isChatVisible ? 0 : 1, transition: 'opacity 0.5s ease' }}></Image>
        </div>
      )}
    </main>
  );
}


const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => {
        const nextChar = text[prevText.length];
        return prevText + (nextChar || '');
      });
    }, 50); // Adjust the delay as needed

    return () => clearInterval(typingInterval);
  }, [text]);

  return <>{displayText}</>;
};

export default Home;
