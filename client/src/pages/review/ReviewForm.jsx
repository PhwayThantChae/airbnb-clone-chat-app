import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({placeId, submitReview}) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(content) {
      try {
        submitReview(content);
        setContent('');
      } catch(err) {
        console.log(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Add a Review</h2>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-medium text-gray-700">
          Review
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
