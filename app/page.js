"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import bakr2 from "./assets/avatar.png";
import smallbakr from "./assets/chat.png";
import send from "./assets/send.svg";
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import FeedbackForm from './Feedback/page';

function Home() {
  const [options, setOptions] = useState([
    'Menu Exploration',
    'Specials Announcement',
    'Reserve',
  ]);

  const [isFirstOpen, setFirstOpen] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatVisible, setChatVisible] = useState(false);
  const [clickedFeedback, setClickedFeedback] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    time: '',
    people: '',
    confirm: false,
  });
  console.log(formData);
  const messagesRef = useRef(null);

  useEffect(() => {
    const sound = new Howl({
      src: ['/notify.wav']
    });
    sound.play();
    return () => {
      sound.stop();
    };

  }, []); // Empty array => run once on mount

  useEffect(() => {
    // Scroll to the bottom after new messages are added
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [conversation]);

  const handleOptionClick = (option) => {
    try {
      const userMessage = { type: 'user', text: option };
      setConversation((prev) => [...prev, userMessage]);

      if (option.toLowerCase() === 'reserve') {
        const botMessage1 = { type: 'bot', text: 'Hello! Welcome to Restaurant Reservation Bot. May I know your name, please?' };
        setConversation((prev) => [...prev, botMessage1]);
      } else {
        // Handle other options Menu Exploration, Specials Announcement as before
        const botResponse = 'Bot response for ' + option;
        const botMessage = { type: 'bot', text: botResponse, showTypingEffect: true };
        setConversation((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserInput = (text) => {
    setUserInput(text);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      const userMessage = { type: 'user', text: userInput.trim() };
      setConversation((prev) => [...prev, userMessage]);

      const lastBotMessage = conversation[conversation.length - 1];
      if (lastBotMessage && lastBotMessage.text.includes('May I know your name, please?')) {
        const botMessage2 = {
          type: 'bot',
          text: `Hi ${userInput.trim()}! What date would you like to make a reservation for?`,
          withDateInput: true,
        };
        setFormData((prev) => ({ ...prev, name: userInput.trim() }));
        setConversation((prev) => [...prev, botMessage2]);
      } else if (lastBotMessage && lastBotMessage.text.includes('What date would you like to make a reservation for?')) {
        const botMessage3 = {
          type: 'bot',
          text: `Thanks! ${formData.name}! What time would you prefer for your reservation?`,
          withTimeInput: true,
        };
        setFormData((prev) => ({ ...prev, date: userInput.trim() }));
        setConversation((prev) => [...prev, botMessage3]);
      } else if (lastBotMessage && lastBotMessage.text.includes('would you prefer for your reservation?')) {
        const botMessage4 = {
          type: 'bot',
          text: `Perfect!👌 How many people will be in your party?`,
          withPeopleInput: true,
        };
        setFormData((prev) => ({ ...prev, time: userInput.trim() }));
        setConversation((prev) => [...prev, botMessage4]);
      } else if (lastBotMessage && lastBotMessage.text.includes('Perfect!👌 How many people will be in your party?')) {
        const botMessage5 = {
          type: 'bot',
          text: `Excellent! Let me confirm your reservation details:`,
          withConfirmBtn: true,
        };
        setFormData((prev) => ({ ...prev, people: userInput.trim() }));
        setConversation((prev) => [...prev, botMessage5]);
      } else if (lastBotMessage && lastBotMessage.text.includes('Let me confirm your reservation details') && formData.confirm === true) {
        const botMessage6 = {
          type: 'bot',
          text: `Reservation confirmed! Your table is booked. Thank you for choosing our restaurant. If you have any other questions, feel free to ask. Have a good day, ${formData.name}! 🤲❤️`,
        };
        setConversation((prev) => [...prev, botMessage6]);
      } else {
        // Handle other responses
        const botResponse = 'Bot response for other cases';
        const botMessage = { type: 'bot', text: botResponse, showTypingEffect: true };
        setConversation((prev) => [...prev, botMessage]);
      }

      setUserInput('');
    }
  };

  const handleFeedbackClick = () => {
    setChatVisible(false);
    setClickedFeedback(true);
  };

  const handleFeedbackClose = () => {
    setClickedFeedback(false);
    setChatVisible(true);
  };

  const handleAvatarClick = () => {
    setChatVisible(!isChatVisible);
    if (isFirstOpen) {
      setFirstOpen(false);
    }
  };

  const handleCloseClick = () => {
    setChatVisible(false);
    setClickedFeedback(false);
  };

return (
  <>
    <main className='bg-[#FFFBF0] bg h-screen  bg-contain text-black flex justify-center items-end lg:justify-end lg:items-end '>

      {clickedFeedback ?
        <AnimatePresence>
          <motion.div
            className='mb-10'
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackForm handleFeedbackClose={handleFeedbackClose} handleCloseClick={handleCloseClick} />
          </motion.div>
        </AnimatePresence>
        :

        <>
          <section
            ref={messagesRef} className="overflow-y-auto chat bg-cover  relative flex chat justify-between flex-col m-8 bg-[#FFFBF9] max-w-md rounded-md shadow-md "
            style={{
              opacity: isChatVisible ? 1 : 0,
              transform: isChatVisible ? 'translateY(0)' : null,
              transition: 'opacity 0.3s ease, transform 0.3s ease, height 0.3s ease',
              height: isChatVisible ? '80%' : '0',
            }}
          >

            {isChatVisible && (
              <>
                <div className='bg-[#84141A] text-white p-4 flex sticky top-0 justify-between'>
                  <p>Chatbot</p>
                  <p onClick={handleCloseClick}
                    className="cursor-pointer">X</p>
                </div>

                <div className='flex p-5'>
                  <Image width={50} src={smallbakr} alt="Chatbot Avatar" className=" w-12 h-14 rounded-full mr-2" />
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
                    <button onClick={handleFeedbackClick} className="bg-[#84141A] hover:bg-[#570c10] text-white py-2 px-4 rounded mr-2 mb-2">Feedback</button>
                  </div>
                </div>

                {conversation.length > 0 && (
                  <div className="flex flex-col p-3 flex-1 ">
                    {conversation.map((message, index) => (
                      <div key={index} className={`flex items-start mb-2 ${message.type === 'user' ? 'justify-end ' : 'justify-start'}`}>
                        {message.type === 'bot' && (
                          <>
                            <Image key={`avatar-${index}`} width={60} src={smallbakr} alt="Chatbot Avatar" className=" w-10 h-12 rounded-full " />
                            <div key={`message-${index}`} className={`py-2 px-1 rounded-lg ${message.type === 'user' ? 'bg-[#F0F0F0] text-black self-end' : 'text-[#84141A] self-start'}`}>
                            </div>
                          </>

                        )}
                        <div key={`message-${index}`} className={`py-2 px-3 rounded-lg ${message.type === 'user' ? 'bg-[#F0F0F0] text-black self-end' : 'text-[#84141A] flex flex-col self-start'}`}>
                          {message.type === 'bot' ? <TypingEffect text={message.text} /> : message.text}
                          {message.withDateInput && (
                            <input
                             required
                              type="date"
                              value={userInput}
                              onChange={(e) => handleUserInput(e.target.value)}
                              className=" text-red-900 focus:outline-none outline bg-white  outline-red-900 border-red-800 p-1 flex-1 rounded mt-2 w-[200px] "
                              placeholder="Enter date..."
                            />
                          )}
                          {message.withTimeInput && (
                            <input
                             required
                              type="time"
                              value={userInput}
                              onChange={(e) => handleUserInput(e.target.value)}
                              className=" text-red-900 focus:outline-none outline bg-white  outline-red-900 border-red-800 p-1 flex-1 rounded mt-2 w-[200px]  "
                              placeholder="Enter date..."
                            />
                          )}

                          {message.withPeopleInput && (
                            <input
                             required
                              type="number"
                              value={userInput}
                              onChange={(e) => handleUserInput(e.target.value)}
                              className=" text-red-900 focus:outline-none outline bg-white  outline-red-900 border-red-800 p-1 flex-1 rounded mt-2 w-[200px] "
                              placeholder="Number of people"
                            />
                          )}

                          {message.withConfirmBtn && (
                            <>
                              <ul>
                                <li>Name: {formData.name}</li>
                                <li>Date: {formData.date}</li>
                                <li>Time: {formData.time}</li>
                                <li>Number of People: {formData.people}</li>
                              </ul>

                              <div className='flex items-center '>
                                <div className="flex items-center mr-4">
                                  <input
                                   required
                                    id="confirm"
                                    type="radio"
                                    value="Confirm"
                                    name="Confirm"
                                    onChange={(e) => {
                                      handleUserInput(e.target.value);
                                      setFormData((prev) => ({ ...prev, confirm: true }));
                                    }}
                                    className="hidden"
                                  />

                                  <label
                                    htmlFor="confirm"
                                    className="bg-red-900 text-white  my-3  px-4 py-1 rounded cursor-pointer"
                                  >
                                    Confirm
                                  </label>
                                </div>

                                <button className=' text-center rounded px-1  bg-white border-2 border-red-900  text-red-900 w-[80px]' onClick={handleCloseClick}>
                                  No
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <form className="mt-4 flex sticky bottom-0" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                  <input
                   required
                    type="text"
                    value={userInput}
                    onChange={(e) => handleUserInput(e.target.value)}
                    className="text-black focus:outline-none border-gray-400 p-1 flex-1 rounded-l-md"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="bg-white p-3 rounded">
                    <Image alt='avatar' width={30} src={send}></Image>
                  </button>
                </form>
              </>

            )}
          </section>

          {!isChatVisible && (
            <div className='flex items-start px-1'>
              <p onClick={handleAvatarClick} className='cursor-pointer animate-bounce max-w-sm bg-red-900  text-white p-3 rounded-br-[2px] rounded-l-[20px] rounded-tr-[20px] '>
                Hello! 🌟 Bakr here, ready with my virtual tablet! How may I assist you today?
              </p>
              <Image alt='avatar' width={200} src={bakr2}></Image>
            </div>
          )}
        </>

      }
    </main>
  </>
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
    }, 20); // Adjust the delay as needed

    return () => clearInterval(typingInterval);
  }, [text]);

  return <>{displayText}</>;
};

export default Home;