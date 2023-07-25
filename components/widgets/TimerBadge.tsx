import React, { CSSProperties } from "react";

export const TimerBadge = ({ counter }: { counter?: number }) => {
  if (!counter) {
    return <></>;
  }
  return (
    <>
      <div className="absolute -top-3 -right-3">
        <div
          className="w-12 h-12 radial-progress text-primary-content bg-primary border-4 border-primary animate-spin"
          style={{ "--value": 70, "--thickness": "5px" } as CSSProperties}
        ></div>
      </div>
      <div className="absolute -top-3 -right-3 p-1">
        <div className="w-12 h-12 flex text-primary-content items-center justify-center text-sm font-bold">
          {counter}s
        </div>
      </div>
    </>
  );
};
