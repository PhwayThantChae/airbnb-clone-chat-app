import React, {useContext, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {UserContext} from "./UserContext";
import Image from "./Image.jsx";
import logo from '../public/pocket.svg';
import { toast } from 'react-toastify';

export default function Header() {
  const {user} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [kindOfStay, setKindOfStay] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [redirect, setRedirect] = useState('');

  const togglePopup = () => {
    setKindOfStay('');
    setMaxPrice(200);
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleCheckInChange = (ev) => {
    const selectedCheckIn = ev.target.value;
    const today = new Date().toISOString().split("T")[0];
    if (selectedCheckIn >= today) {
      setCheckIn(selectedCheckIn);
    } else {
      toast.error('Check-in date cannot be from the past', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleCheckOutChange = (ev) => {
    const selectedCheckOut = ev.target.value;
    if (checkIn < selectedCheckOut) {
      setCheckOut(selectedCheckOut);
    } else {
      toast.error('Check-out date cannot be before the check-in date', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  async function handleAPISearch() {
    if (kindOfStay && checkIn && checkOut && numberOfGuests) {
      const redirectPath = `/search/api?location=${kindOfStay}&checkIn=${checkIn}&checkOut=${checkOut}&minPrice=0&maxPrice=${maxPrice}&numberOfGuests=${numberOfGuests}`;
      setRedirect(redirectPath);
    }
  }

  async function handleInternalSearch() {
    if (kindOfStay && maxPrice) {
      const redirectPath = `/search?keyword=${kindOfStay}&maxPrice=${maxPrice}`;
      setRedirect(redirectPath);
    }
  }

  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
      <header className="flex justify-between">
        <Link to={'/'}
              className="flex items-center gap-1 p-2 border rounded-full shadow shadow-gray-300">
          <img src={logo} alt="WanderWise Logo" className="w-8 h-8 sm:w-6 sm:h-6"/>
          <span className="hidden text-xl font-bold md:block">WanderWise</span>
        </Link>
        <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-full shadow shadow-gray-300">
          <div className="hidden pt-1 text-center md:block">Search</div>
          <button onClick={togglePopup}
                  className="p-2 text-white rounded-full bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                 className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </button>
          {isOpen && (
              <div
                  className="fixed inset-0 z-50 flex items-center justify-center ">
                <div
                    className="p-8 bg-white rounded-lg shadow-2xl shadow-gray-500">
                  <div className="flex mb-4 border-gray-300">
                    <button
                        className={`flex-1 mr-2 py-2 px-4 font-bold ${
                            activeTab === 1 ? 'bg-primary text-white'
                                : 'bg-white text-gray-700'
                        } rounded-2xl`}
                        onClick={() => handleTabClick(1)}>
                      Search our own
                      listings
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 font-bold ${
                            activeTab === 2 ? 'bg-primary text-white'
                                : 'bg-white text-gray-700'
                        } rounded-2xl`}
                        onClick={() => handleTabClick(2)}>
                      Search with API
                    </button>
                  </div>
                  {activeTab === 1 && (
                      <div>
                        {/* Form 1 content */}
                        <div className="px-4 py-3 ">
                          <label className="font-bold ms-2">What kind of stay
                            are you looking for</label>
                          <input type="text" placeholder="beach, forest etc."
                                 value={kindOfStay}
                                 onChange={ev => setKindOfStay(
                                     ev.target.value)}/>
                        </div>
                        <div className="px-4 py-3 ">
                          <label className="font-bold">Max Price: <span
                              className="text-gray-500">{maxPrice}</span></label>
                          <input
                              className="w-full"
                              type="range"
                              min={0}
                              max={2000}
                              value={maxPrice}
                              onChange={ev => setMaxPrice(ev.target.value)}
                          />
                        </div>
                        <div className="flex">
                          <button
                              className="px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-2xl"
                              onClick={handleInternalSearch}>
                            Search
                          </button>
                          <button
                              className="float-right px-4 py-2 ml-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-2xl"
                              onClick={togglePopup}
                          >
                            Close
                          </button>
                        </div>
                      </div>

                  )}
                  {activeTab === 2 && (
                      <div>
                        {/* Form 2 content */}
                        <div className="px-4 py-3 ">
                          <label className="font-bold ms-2">Where</label>
                          <input type="text"
                                 placeholder="Name of city, state, area etc."
                                 value={kindOfStay}
                                 onChange={ev => setKindOfStay(
                                     ev.target.value)}/>
                        </div>
                        <div className="flex border-t border-b">
                          <div className="px-4 py-3 ">
                            <label className="font-bold">Check-in: </label>
                            <input className="text-gray-500 " type="date"
                                   value={checkIn}
                                   onChange={handleCheckInChange}/>
                          </div>
                          <div className="px-4 py-3 border-l">
                            <label className="font-bold">Check-out: </label>
                            <input className="text-gray-500 " type="date"
                                   value={checkOut}
                                   onChange={handleCheckOutChange}/>
                          </div>
                        </div>
                        <div className="px-4 py-3 ">
                          <label className="font-bold">Max Price: <span
                              className="text-gray-500 ">{maxPrice}</span></label>
                          <input
                              className="w-full"
                              type="range"
                              min={0}
                              max={2000}
                              value={maxPrice}
                              onChange={ev => setMaxPrice(ev.target.value)}
                          />
                        </div>
                        <div className="px-4 py-3 border-t">
                          <label className="font-bold">Number of guests:</label>
                          <input type="number" value={numberOfGuests}
                                 onChange={ev => setNumberOfGuests(
                                     ev.target.value)}/>
                        </div>
                        <div className="flex">
                          <button
                              className="px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-2xl"
                              onClick={handleAPISearch}>
                            Search
                          </button>
                          <button
                              className="float-right px-4 py-2 ml-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-2xl"
                              onClick={togglePopup}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
        <Link
            to={user ? "/account" : "/login"}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full shadow shadow-gray-300"
        >

          {!user && (
              <div className="flex">
                <div
                    className="overflow-hidden text-white bg-gray-500 border rounded-full border-l-gray-500">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="relative w-6 h-6 top-1"
                  >
                    <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="font-bold text-gray-700 ms-2">Login</div>
              </div>
          )}
          {(!!user && user.profileImg) && (
              <div
                  className="overflow-hidden text-white bg-gray-500 border rounded-full border-l-gray-500">
                <Image className="relative w-6 h-6 top-1" src={user.profileImg}
                       alt=""/>
              </div>
          )}
          {(!!user && !user.profileImg) && (
              <div
                  className="overflow-hidden text-white bg-gray-500 border rounded-full border-l-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative w-6 h-6 top-1"
                >
                  <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                  />
                </svg>
              </div>
          )}
          {!!user && (
              <div>
                {user.name}
              </div>
          )}
        </Link>
      </header>
  );
}