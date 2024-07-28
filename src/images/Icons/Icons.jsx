import sprite from './icons.svg';
import React from 'react';


const Iconsvg = ({ width, height, iconName, styles }) => {
  return (
    <svg width={width} height={height} className={styles}>
      <use href={`${sprite}#${iconName}`}></use>
    </svg>
  );
};

export default Iconsvg;