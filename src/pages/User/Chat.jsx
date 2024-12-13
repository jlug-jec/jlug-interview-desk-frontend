import React, { useState } from 'react';
import Dog from '../../assets/Dog.png';
import A1 from '../../assets/21.png';
import A2 from '../../assets/3d_avatar_13.png';
import send from '../../assets/send.png';


const Chat = () => {
  const [chats, setChats] = useState([
    { name: 'Dog', msg: 'Hello', dp: Dog },
    { name: 'A2', msg: 'Hi', dp: A2 },
    { name: 'You', msg: 'ඞ', dp: A1 },
  ]);

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = () => {
    if (msg.trim() !== '') {
      setChats([...chats, { name: 'You', msg, dp: A1 }]);
      setMsg(''); 
    }
  };

  return (
    <div className="flex-1 w-100">
      <div className="w-full md:px-6 lg:px-10 pb-10 ">
        <header className="w-full h-16">
          <div className="mt-auto max-w-full p-4 ">
            <h1 className="text-4xl tracking-tight font-semibold text-left sm:p-4 p-4">Discussion</h1>
          </div>
        </header>
        <div className="bg-white m-auto w-[95%] h-[70vh] flex flex-col p-4 rounded-xl drop-shadow-lg md:mb-0 mb-20 relative z-[-1]">
          <div className="bg-[#EEEEEE] w-full h-full flex flex-col rounded-lg drop-shadow-lg justify-between">
            <div className="flex flex-col items-center p-4 pl-5 pr-5 w-full h-[60vh] overflow-auto gap-3">
              {chats.map((chat, index) => (
                <div key={index} className="flex justify-between items-center gap-x-6 py-2 w-full ">
                  <div className={`flex w-full gap-8 ${chat.name === 'You' ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                    <img
                      src={chat.dp}
                      alt={`Avatar of ${chat.name}`}
                      className="h-14 w-14 flex-none rounded-full bg-gray-50"
                    />
                    <div className={`flex flex-col w-full rounded-md p-2 gap-1 bg-[#D9D9D9] ${chat.name === 'You' ? 'items-end' : 'items-start'}`}>
                      <div className="flex flex-auto">
                        <p className="text-xs pl-1 pr-3 text-left text-primary">{chat.name}</p>
                      </div>
                      <div className="flex flex-auto">
                        <p className="text-base font-bold pl-3 pr-1 text-black">{chat.msg}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row p-3 w-full bg-white gap-3">
              <input
                className="bg-[#ECECEC] w-[95%] rounded-lg p-3 font-semibold border-1 border-gray"
                value={msg}
                onChange={handleChange}
                placeholder="Type your message..."
              />
              <div
                className="w-12 h-12 bg-[#ECECEC] hover:border-2 hover:border-black cursor-pointer rounded-full p-2 m-auto"
                onClick={handleSubmit}
              >
                <img src={send} alt="send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
