import {useState, useEffect} from "react";
import axios from "axios";

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(`/api/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  
  return (
    <div>
        <a
          href="#"
          className="flex items-center px-6 py-4 border-2 border-gray-100 border-solid rounded-lg hover:bg-gray-100"
        >
          <img
            src={user?.profileImg}
            alt="User 2"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden w-32 ml-4 lg:w-80 sm:block">
            <h2 className="text-sm font-semibold">{user?.name}</h2>
            <p className="text-gray-500 truncate text-ellipsis">
              How are you doing?
            </p>
          </div>
        </a>
      </div>
  );
}
