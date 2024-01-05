import React, { PropsWithChildren } from "react";

const DangerAlert = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div>
      <div className={`text-red-800 text-sm p-2 flex justify-between $ `}>
        <div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p>
              <span className="font-bold mr-3">Error:</span>
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerAlert;
