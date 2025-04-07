import React from "react";

const LoadingBar = () => {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden">
      <div className="h-full bg-teal animate-loading"></div>
    </div>
  );
};

export default LoadingBar;
