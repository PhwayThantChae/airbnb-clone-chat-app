import React from 'react';

const Review = ({ content, date, user }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={`${user.profileImg}`}
          />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Star icon SVG */}
              </svg>
              <span className="ml-1 text-gray-700">5</span>
            </div>
            <span className="mx-2 text-gray-400">&#8226;</span>
            <span className="text-gray-500">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default Review;
