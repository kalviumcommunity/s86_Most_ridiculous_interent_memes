import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 text-gray-800">
      {/* Heading Section */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 text-center">
        Welcome to Memes
      </h1>
      
      {/* Description */}
      <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
        Discover, laugh, and share the most ridiculous internet memes all in one place!
      </p>
      
      {/* Button */}
      <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 hover:bg-gradient-to-l focus:ring-4 focus:ring-blue-300">
        Get Started
      </button>

      {/* Decorative Element */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-full w-full bg-gradient-to-br from-white via-blue-50 to-pink-50 opacity-70"></div>
        <div className="absolute top-16 left-16 w-40 h-40 rounded-full bg-blue-200 blur-2xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-60 h-60 rounded-full bg-purple-300 blur-3xl opacity-60 animate-bounce"></div>
      </div>
    </div>
  );
};

export default LandingPage;
