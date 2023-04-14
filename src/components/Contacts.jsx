import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth_context";

function Contacts({ contacts, changeChat }) {
  const { user, setUser } = useAuth();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    
    setCurrentUserName(user?.username);
    setCurrentUserImage(user?.avatarImage);
  }, []);

  const changeCurrentChat = (index, item) => {
    setCurrentSelected(index);
    changeChat(item);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="bg-[#080420] overflow-hidden px-4 ">
          <div>
            <h1 className="text-[#4e0eff] text-2xl font-bold text-center py-2">
              snappy
            </h1>
          </div>
          <div className="mt-5 snap-y overflow-y-auto  flex flex-col gap-y-5 h-[65vh]">
            {contacts.map((item, index) => (
              <div
                key={item._id}
                onClick={() => changeCurrentChat(index, item)}
                className={` snap-normal snap-center flex gap-x-3 bg-[#ffffff34] items-center p-2 rounded-lg ${
                  currentSelected === index ? "bg-violet-500" : ""
                }`}
              >
                <img
                  className="w-10 h-10 object-cover rounded-lg"
                  src={item.avatarImage}
                  alt=""
                />
                <h2 className="text-white truncate font-semibold">
                  {item.username}
                </h2>
              </div>
            ))}
          </div>

          <div className="flex px-10 items-center gap-x-2">
            <img
              className="w-10 h-10 rounded-lg object-cover"
              src={currentUserImage}
              alt="avatar"
            />
            <div className="text-white">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}

export default Contacts;
