import React from 'react';

const BadgeGood = (props) => {
  return (
    <div>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-300 text-green-800`}
      >
        {props.label}
      </span>
    </div>
  );
};

export default BadgeGood;
