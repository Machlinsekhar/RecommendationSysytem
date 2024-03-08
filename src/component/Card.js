import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden font-lexend mb-5 md:w-1/3 mx-5">
      <div className="flex">
      <div className="md:w-1/3 w-1/4 flex items-center justify-center">
          <img src={data.image} alt={data.title} className="w-70 h-70 " />
        </div>
        <div className="w-2/3 p-4 font-lexend-deco">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p className="text-gray-600">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
