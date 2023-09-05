import React from 'react';

const Review = ({ review }) => {

  function formatDateToMonthYear(dateString) {
    const options = { year: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  
  return (
    <div className="p-4 mt-2 bg-white border-2 rounded-lg shadow-md">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={`${review.user?.profileImg}`}
          />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">{review.user.name}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{formatDateToMonthYear(review.createdAt)}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.content}</p>
    </div>
  );
};

export default Review;
