import React from 'react';
import { IconType } from 'types/utility.types';

interface PropAirPlane {
  wi?: boolean;
}


export const Airplane = ({ wi }: PropAirPlane) => {
  return (
    <svg width={wi ? 50 : 24} height={wi ? 50 : 24} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.82398 11.5596L1.47099 9.29958L3.55595 8.09583L6.24897 9.32528L9.98695 7.16716L3.66004 2.32862L5.78072 1.10424L14.1146 4.78403L20.704 0.979653C20.9848 0.81754 21.3185 0.773608 21.6317 0.857525C21.9449 0.941441 22.2119 1.14633 22.374 1.42712V1.42712C22.5349 1.70784 22.578 2.04091 22.4938 2.35334C22.4095 2.66576 22.2049 2.93205 21.9246 3.09384L15.3353 6.89821L14.357 15.9587L12.2363 17.1831L11.2076 9.28134L7.46959 11.4395L7.19432 14.3827L5.10287 15.5902L4.81886 11.5582" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}
