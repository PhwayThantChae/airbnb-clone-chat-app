import AccountNav from "../AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import Header from "../../Header";
import AdminNav from "../../admin-pages/AdminNav";
import Conversation from './Conversation';
import Message from "./Message";

export default function ChatListPage() {
  const { user } = useContext(UserContext);
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
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
            </div>
          </div>
          <div className="w-2/3 chatBox">
            <div className="relative flex flex-col justify-between p-4 chatBoxWrapper">
                <div className="space-y-4 overflow-y-auto chatBoxTop h-100">
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                </div>


                <div className="flex justify-between mt-4 chatBoxBottom">
                    <input type="text" className="flex-grow p-2 border rounded-l-lg" placeholder="Type your message..."/>
                    <button className="px-4 ml-4 text-white rounded-lg bg-primary">Send</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}