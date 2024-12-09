import React from 'react';

const Button = ({ variant, label, extraStyles, handler, isloading }) => {
  const filled = `text-center align-middle pt-1 pb-1 pl-6 pr-6 text-lg text-white cursor-pointer bg-primary rounded-lg ${extraStyles} flex items-center`; // Added `items-center` for vertical alignment
  const outlined = `text-center align-middle pt-[2.5px] pb-[2.5px] pl-6 pr-6 text-lg text-primary cursor-pointer bg-white rounded-lg border-2 border-primary ${extraStyles} flex items-center`; // Added `items-center` for vertical alignment
  return (
    <div className={`${variant === 1 ? filled : outlined} ${isloading === 1 ? ' cursor-not-allowed disabled: opacity-50' : ''}`} onClick={handler}>
      { isloading === 1 ? <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin mr-2"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity="0.25"
        />
        <path
          fill="currentColor"
          d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          transform="rotate(360 12 12)"
        />
      </svg> : '' }
      {label}
    </div>
  );
};

export default Button;
