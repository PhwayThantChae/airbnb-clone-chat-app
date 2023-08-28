import AccountNav from "../AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import Header from "../../Header";
import AdminNav from "../../admin-pages/AdminNav";
import Conversation from './Conversation';

export default function ChatListPage() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header />
      {user && (
        <>
          {user.userType === "admin" && <AdminNav />}
          {(user.userType === "user" || user.userType === "business") && (
            <AccountNav />
          )}
        </>
      )}
      {/* <div><div class="container mx-auto py-8">
    <div class="bg-white rounded-lg shadow-md">
        <div class="py-4 px-6 border-b border-gray-200">
            <h1 class="text-xl font-semibold">Messenger</h1>
        </div>

    </div>
</div></div> */}
      <div className="p-5 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/3 chatMenu">
            <input type="text" placeholder="Search for users" className="" />
            <div className="chatMenuWrapper">
              <Conversation/>
              <Conversation/>
            </div>
          </div>
          <div className="w-2/3 chatBox">
            <div className="chatBoxWrapper">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
