import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoaderSpinner;
