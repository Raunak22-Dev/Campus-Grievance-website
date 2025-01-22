import React, { useState } from 'react';
import { useComplaintContext } from '../../contextreact/ComplaintContext';
import { dislikedark, dislikelight, likedark, likelight } from '../../assets/icons';

const Card = () => {
  const { complaints, setComplaints } = useComplaintContext();
  const [liked, setLiked] = useState(null);   // Track user vote state: null, true (like), false (dislike)
  const [lastClicked, setLastClicked] = useState(null);  // Track last click time
  
  // Handle voting on a complaint
  const handleVote = (id, voteType) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, votes: voteType === 'like' ? complaint.votes + 1 : complaint.votes - 1 } : complaint
    );
    setComplaints(updatedComplaints);
  };

  const handleClick = (id, voteType) => {
    const currentTime = Date.now();

    // Single click: Set a timeout to handle this vote as a single-click action
    if (lastClicked && currentTime - lastClicked < 500) { // Time threshold for double click (500ms)
      // This is a double-click
      setLiked(null); // Revert to neutral state
      handleVote(id, voteType === 'like' ? 'dislike' : 'like');
    } else {
      // Single click: Change state to dark (active)
      setLiked(voteType);
      handleVote(id, voteType);
    }

    // Update last clicked time
    setLastClicked(currentTime);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">Browse Complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <div
            key={complaint.createdAt}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="p-6">
              <h5 className="text-2xl font-semibold text-gray-800 mb-4 truncate">{complaint.message}</h5>
              
              <div className="text-gray-600 mb-4">
                <p><strong>To: </strong><span className="font-medium">{complaint.recipient}</span></p>
                <p><strong>Regarding: </strong><span className="font-medium">{complaint.type}</span></p>
                <p><span className="font-medium">{complaint.createdAt}</span></p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleVote(complaint.id, 'like')}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Read More
                  <svg
                    className="ml-2 w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>

                {/* Like Button */}
                <button
                  onClick={() => handleClick(complaint.id, 'like')}
                  className={`flex items-center px-2 py-1 transition-all duration-300 ${liked === 'like' ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  <img
                    src={liked === 'like' ? likedark : likelight}
                    alt="like"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Dislike Button */}
                <button
                  onClick={() => handleClick(complaint.id, 'dislike')}
                  className={`flex items-center px-2 py-1 transition-all duration-300 ${liked === 'dislike' ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <img
                    src={liked === 'dislike' ? dislikelight : dislikedark}
                    alt="dislike"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
