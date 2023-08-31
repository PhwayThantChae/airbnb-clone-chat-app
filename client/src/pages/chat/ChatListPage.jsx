import AccountNav from "../AccountNav";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import Header from "../../Header";
import AdminNav from "../../admin-pages/AdminNav";
import Conversation from "./Conversation";
import Message from "./Message";
import {io} from "socket.io-client";

export default function ChatListPage() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useContext(UserContext);
  const scrollRef = useRef();



  useEffect(() => {
    // if (user && user._id) {
      socket.current = io("ws://localhost:8900");
      console.log(`Connecting socket...`);
  
      // return () => {
      //   // Unsubscribe or remove socket event listeners
      //   console.log('unmount');
      //   socket.current.off("getMessage");
      //   socket.current.off("getUsers");
      // };
    // }
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("getMessage", (data) => {
        console.log(data);
        console.log("get message socket");
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });

      return () => {
        console.log("socket disconnecting");
        socket.current.disconnect();
      }
    }
  }, [])

  useEffect(() => {  
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user && user._id) {
      socket.current.emit("addUser", user._id);
      // socket.current.on("getUsers", users => {
      //     console.log(users);
      // });

      // return () => {
      //   socket.current.off("getUsers");
      // };
    }
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages =  async () => {
        try {
            const res = await axios.get("/api/messages/" + currentChat?._id);
            setMessages(res.data);
        } catch(err) {
            console.log(err);
        }
    }
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
        sender: user._id, 
        text: newMessage,
        conversationId: currentChat._id
    }

    try {
        const res = await axios.post("/api/messages", message);
        setMessages([...messages, res.data]);
        const receiverId = currentChat.members.find(member => member !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });
        setNewMessage("");
    } catch(e) {
        console.log(e);
    }
  }



  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <div className="flex flex-col px-8 py-4">
      <Header />
      {user && (
        <>
          {user.userType === "admin" && <AdminNav />}
          {(user.userType === "user" || user.userType === "business") && (
            <AccountNav />
          )}
        </>
      )}
      <div className="p-2 bg-white rounded-lg shadow-md custom-chatbox-height">
        <div className="flex">
          <div className="w-1/3 chatMenu">
            <input type="text" placeholder="Search for users" className="" />
            <div className="overflow-y-auto chatMenuWrapper">
              {conversations.map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 chatBox">
            <div className="relative flex flex-col justify-between p-4 chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="space-y-4 overflow-y-auto chatBoxTop h-100">
                    {messages.map((m) => (
                        <div key={m._id} ref={scrollRef}>
                            <Message message={m} own={m.sender === user._id} />
                        </div>
                    ))}
                    
                  </div>
                  <div className="flex justify-between mt-4 chatBoxBottom">
                    <input
                      type="text"
                      className="flex-grow p-2 border rounded-l-lg"
                      placeholder="Type your message..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value = {newMessage}
                    />
                    <button className="px-4 ml-4 text-white rounded-lg bg-primary" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="absolute inset-x-0 flex items-center justify-center p-10 mx-10 font-medium text-center text-gray-400 border-2 rounded-lg shadow-sm">No conversations yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
