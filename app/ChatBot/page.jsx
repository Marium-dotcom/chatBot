"use client"
import React, { useState, useEffect } from 'react';
import data from '../api/data';
import Image from 'next/image';
import bakr from "../assets/ava.png";
import smallbakr from "../assets/chat.png";
import send from "../assets/send.svg"
function Home() {
  const [options, setOptions] = useState([
    'Menu Exploration',
    'Specials Announcement',
    'Reserve',
    'Feedback',
  ]);

  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleOptionClick = async (option) => {
    try {
      const userMessage = { type: 'user', text: option };
      setConversation((prev) => [...prev, userMessage]);

      const botResponse = data[option];
      console.log("Bot response: " + botResponse);
      const botMessage = { type: 'bot', text: botResponse };
      console.log("botMess"+ botMessage.text, botMessage.type);
      setConversation((prev) => [...prev, botMessage]);
      console.log("convo"+ JSON.stringify(conversation));
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


      setUserInput(''); // Clear the input after sending
    }
  };


  return (
    <main className='bg-[#FFFBF0] bg flex justify-around p-5 flex-col md:flex-row relative md:p-0 h-screen items-center'>
      <div className="container   relative flex flex-col justify-between chat
    m-8 bg-[#FFFBF9] max-w-xl h-[80%] rounded-md shadow-md overflow-y-auto">
                               <div className='bg-[#84141A] p-4 flex sticky top-0 justify-between'> <p>🌟 Chat with Bakr</p>             </div>

          <div className='flex p-3'>
            <Image  width={50} src={smallbakr} alt="Chatbot Avatar" className=" w-14 h-12 rounded-full mr-2" />
            <div>
              <p className="mb-2 text-[#84141A]">
              Bakr here! 🌟 Ready to guide you through a feast of flavors at Karazah. What can I assist you with today?</p>

              {options.map((option) => (
                <div  key={option} className=''>
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
          <div className="flex flex-col p-3 mac  ">
            {conversation.map((message, index) => (
              <div key={index} className={`flex items-center mb-2 ${message.type === 'user' ? 'justify-end ' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <Image key={`avatar-${index}`} width={50} src={smallbakr} alt="Chatbot Avatar" className="w-10 h-12 rounded-full mr-2" />
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
    className=" text-black  p-2 flex-1 focus:outline-none "
    placeholder="Type your message..."
  />

  <button
    onClick={handleSendMessage}
    className=" bg-white p-3 rounded">
      
    <Image width={30} src={send}></Image>
  </button>
</div>

      </div>






      <div className=' hidden lg:block'>
        <Image alt="alt" className='w-[200px] lg:w-[500px]' src={bakr} width={500}></Image>
      </div>

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
