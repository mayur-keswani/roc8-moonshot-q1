import React from "react";

const Avatar:React.FC<{name:string}> = ({name}) => {
  return (
    <span className="flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-full bg-[var(--primary)] text-white font-semibold">
      {name?.split("")[0]?.toUpperCase()}
    </span>
  );
};

export default Avatar;
