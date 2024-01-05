import React, { PropsWithChildren } from "react";

const DangerAlert = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p className={`text-red-800 text-tiny`}>
      <span className="font-bold mr-2">Error:</span>

      {children}
    </p>
  );
};

export default DangerAlert;
