import React, { useState, useEffect } from 'react';

const InfiniteScroll = ({ dataLength, next, hasMore, loader, endMessage, children }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const onScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore) {
      setIsScrolling(true);
      next(); // Trigger the loading of new data
    }
  };

  // Handling when new data is fetched and loader hides
  useEffect(() => {
    if (isScrolling && !hasMore) {
      setIsScrolling(false);
    }
  }, [hasMore, isScrolling]);

  return (
    <div
      className="infinite-scroll-container"
      style={{ overflowY: 'auto', maxHeight: '400px' }}
      onScroll={onScroll}
    >
      {children} {/* Render the children passed to InfiniteScroll (the list of tasks, etc.) */}

      {/* Show loader if data is still loading */}
      {isScrolling && loader && <div className="loader">{loader}</div>}

      {/* Show message if no more data is available */}
      {!hasMore && endMessage && <div className="end-message">{endMessage}</div>}
    </div>
  );
};

export default InfiniteScroll;
