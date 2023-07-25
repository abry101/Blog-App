import Image from "next/image";
import React from "react";

export default function Avatar({
  photoUrl,
  size = 64,
  alt,
  placeHolder = "OK",
}: {
  photoUrl?: string;
  size?: number;
  alt?: string;
  placeHolder?: string;
}) {
  const _alt = alt || `avatar-${Date.now()}`;
  const _placeHolder = generatePlaceHolder(placeHolder);

  return (
    <div className={`avatar ${photoUrl ? "" : "placeholder"}`}>
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={
          photoUrl ? "" : "bg-neutral-focus text-neutral-content rounded-full"
        }
      >
        {photoUrl ? (
          <Image
            fill
            alt={_alt}
            className="rounded-full"
            style={{ objectFit: "cover" }}
            src={photoUrl}
          />
        ) : (
          <span className="text-xl">{_placeHolder}</span>
        )}
      </div>
    </div>
  );
}

function generatePlaceHolder(ph: string) {
  if (ph.length > 2) {
    if (ph.split(" ")?.length > 2) {
      const res = ph
        ?.split(" ")
        ?.slice(0, 2)
        ?.map((str) => {
          return str.at(0)?.toUpperCase();
        })
        ?.reduce((pv, cv) => {
          if (!pv) return "OK";
          else {
            if (cv) return pv + cv;
            else return pv;
          }
        });
      return res || "OK";
    } else {
      return `${ph.at(0)?.toUpperCase()}${ph.at(1)?.toUpperCase()}`;
    }
  } else return "OK";
}
