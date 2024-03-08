import React from 'react';

const TestimonialBlock = ({ testimonial, testimonialImage, tname, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center relative w-326 mb-10 ml-5 mr-5" >
      <p className="text-lg font-regular font-jost">{testimonial}</p>
      <p className="text-lg font-bold pt-3 font-lexend">{tname}</p>
      <p className="text-sm font-medium pb-10 text-[#2E7CF6] font-lexend">{title}</p>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-20 h-20 bg-blue-500 rounded-full overflow-hidden">
          <img src={testimonialImage} alt="Testimonial" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialBlock;
