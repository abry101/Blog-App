import React, { CSSProperties } from "react";
export interface CSSPropertiesWithVars extends CSSProperties {
  "--value": number;
  // any other vars you may use
}
export default function Loader(props: {
  progress?: number;
  opacity?: number;
  message?: string;
}) {
  const { progress, message = "Loading . . .", opacity = 0.85 } = props;
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center fixed inset-0 z-50 bg-black"
      style={{ opacity } as CSSProperties}
    >
      {!progress && (
        <div
          className="radial-progress text-primary animate-spin"
          style={{ "--value": 70 } as CSSProperties}
        >
          &nbsp;
        </div>
      )}
      {progress && (
        <div
          className="radial-progress text-primary animate-spin"
          style={{ "--value": progress } as CSSProperties}
        >
          {progress}
        </div>
      )}
      {message && <h3 className="mt-4">{message}</h3>}
    </div>
  );
}
