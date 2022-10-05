import React from 'react';

const BadgeError = (props) => {
  return (
    <div>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-300 text-red-800`}
      >
        {props.label}
      </span>
    </div>
  );
};

export default BadgeError;
