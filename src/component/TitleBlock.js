import React from "react";

function TitleBlock(props) {
  const { title, subtitle } = props;

  return (
    <div>
      <p className="md:text-3xl text-2xl font-title font-header font-jost text-[black] mt-6 mb-6 text-center ml-5 md:max-w-[1300px] md:mx-auto">
        {title}
      </p>

      <p className="md:text-2xl text-xl font-lexend mb-5 text-center ml-5 mr-5 md:max-w-[1300px] md:mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

export default TitleBlock;
