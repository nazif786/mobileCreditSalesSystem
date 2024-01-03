"use client";

import { useState } from "react";

interface Props {
  alertName: "info" | "warning" | "danger" | "success";
  alertMessage: string | any;
}
const Aterts = ({ alertName, alertMessage }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {/* <!-- Info --> */}
      {alertName === "info" && (
        <div
          className={`bg-blue-50 border-b border-blue-400 text-blue-800 text-sm p-4 flex justify-between
        ${show && "hidden"}
        `}
        >
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
                <span className="font-bold mr-3">Info:</span> {alertMessage}
              </p>
            </div>
          </div>
          <div onClick={() => setShow(true)} className="hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------------------------------------------- */}
      {/* <!-- Error --> */}

      {alertName === "danger" && (
        <div
          className={`bg-red-50 border-b border-red-400 text-red-800 text-sm p-4 flex justify-between ${
            show && "hidden"
          }`}
        >
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
                <span className="font-bold mr-3">Error:</span> {alertMessage}
              </p>
            </div>
          </div>
          <div onClick={() => setShow(true)} className="hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />{" "}
            </svg>{" "}
          </div>
        </div>
      )}

      {/* ***************************************************************************** */}

      {/* <!-- Success --> */}
      {alertName === "success" && (
        <div
          className={`bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between ${
            show && "hidden"
          }`}
        >
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
                <span className="font-bold mr-3">Success:</span> {alertMessage}
              </p>
            </div>
          </div>
          <div onClick={() => setShow(true)} className="hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />{" "}
            </svg>{" "}
          </div>
        </div>
      )}

      {/* -------------------------***************************************************************************8 */}
      {/* <!-- Warning --> */}
      {alertName === "warning" && (
        <div
          className={`bg-yellow-50 border-b border-yellow-400 text-yellow-800 text-sm p-4 flex justify-between ${
            show && "hidden"
          }`}
        >
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
                <span className="font-bold  mr-3">Warning:</span> {alertMessage}
              </p>
            </div>
          </div>
          <div onClick={() => setShow(true)} className="hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Aterts;
