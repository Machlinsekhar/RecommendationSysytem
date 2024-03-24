import React from 'react';

const Box = ({ advice, imageSrc, aname, title, logoSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center w-[400px] mx-auto mr-10" >
      <p className="text-lg font-regular font-jost">{advice}</p>
      <p className="text-lg font-bold pt-3 font-lexend">{aname}</p>
      <p className="text-sm font-medium pb-10 text-[#2E7CF6] font-lexend">{title}</p>
      <div className="absolute bottom-0 left-1">
        <div className="w-30 h-40 pt-5 overflow-hidden">
          {/* <img src={imageSrc} alt="Testimonial" className="w-full h-full object-cover" /> */}
        </div>
      </div>
      <div className="absolute bottom-0 right-5 ">
        <div className="w-30 h-8 overflow-hidden m-8 ">
          {/* <img src={logoSrc} alt="Testimonial" className="w-full h-full object-cover" /> */}
        </div>
      </div>
    </div>
  );
};

export default Box;
