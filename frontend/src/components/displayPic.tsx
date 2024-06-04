import React, { useEffect, useState } from 'react';
import { Concrete } from '../types/common';
import { className } from '../utils/className';

export const DisplayPictureSize = {
  xs: "32",
  sm: "64",
  md: "128",
  lg: "256",
} as const;

export type DPsize = keyof typeof DisplayPictureSize;

export const FontSize = {
  xs: "xs",
  sm: "3xl",
  md: "6xl",
  lg: "8xl",
} as const;



export interface DisplayPictureProps {
  name: string;
  size: DPsize | string;
  squareBorder?: boolean;
  url?: string;
}

const defaultPropValues: Concrete<DisplayPictureProps> = {
  name: "",
  size: "md",
  url: "",
  squareBorder: false,
}

export function DisplayPicture(props: DisplayPictureProps) {
  const [needsFallback, setNeedsFallback] = useState(false);
  const [fallback, setFallback] = useState<React.ReactNode | null>(null);

  const { name, size, url, squareBorder } = { ...defaultPropValues, ...props };
  const displaySize = DisplayPictureSize[size as DPsize] || size;

  function setFallBackName() {
    const initials = name.split(" ").map(x => x[0]?.toUpperCase());
    const first = initials[0];
    const last = initials[initials.length - 1];
    const fallbackText = first + last;
    const falllBackElement = <div className={`text-${FontSize[size as DPsize] || "2xl"}`}>{fallbackText}</div>;
    setFallback(falllBackElement);
  }

  useEffect(() => {
    if (!needsFallback) {
      return;
    }
    setFallBackName();
  }, [name, needsFallback]);


  return (
    <div className={className(`wpx-${displaySize} hpx-${displaySize} bg-gray-300 aspect-square`, { "rounded-full": !squareBorder, "rounded-md": squareBorder })}>
      {!needsFallback && <img src={url} alt="profile-picture" onError={() => setNeedsFallback(true)} className={className('object-cover stretch hp-100 wp-100', { "rounded-full": !squareBorder, "rounded-md": squareBorder })} />}
      {needsFallback && <div className={`flex items-center justify-center text-gray-500 text-2xl font-bold wpx-${displaySize} hpx-${displaySize} max-wpx-${displaySize} max-hpx-${displaySize}`}>{fallback}</div>}
    </div>
  )

}
