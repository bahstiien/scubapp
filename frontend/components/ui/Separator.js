import React from 'react';

const Separator = (props) => {
  return (
    <div className="relative pt-4 pb-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 bg-white text-lg font-medium text-gray-900 uppercase">
          {props.name}
        </span>
      </div>
    </div>
  );
};

export default Separator;
