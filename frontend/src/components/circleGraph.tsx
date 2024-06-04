import * as React from 'react';
import { Component, CSSProperties } from 'react';

export interface CircleProps {
  value: number;
  total: number;
  animate?: boolean;
  animationDuration?: string;
  progressColor?: string;
  bgColor?: string;
  textColor?: string;
  size?: string;
  lineWidth?: string;
  percentSpacing?: number;
  textStyle?: CSSProperties;
  straightEdge?: boolean;
  responsive?: boolean;
  onAnimationEnd?(): void;
}

export interface CircleState {

}

const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0) => Math.round((100 - Math.min(val, 100)) / 100 * diameter);

export function Circle(props: CircleProps) {
  const defaultProps: CircleProps = {
    value: 0,
    total: 100,
    animate: true,
    animationDuration: '5s',
    progressColor: 'rgb(76, 154, 255)',
    bgColor: '#ecedf0',
    textColor: '#6b778c',
    size: '100',
    lineWidth: '30',
    percentSpacing: 10,
    textStyle: { font: 'bold 4rem Helvetica, Arial, sans-serif' }
  }


  const { textColor, textStyle, percentSpacing, value, total, size, bgColor, progressColor, lineWidth, animate, animationDuration, straightEdge, responsive, onAnimationEnd } = { ...defaultProps, ...props };
  const progress = props.value / props.total * 100;
  const strokeDashoffset = getOffset(progress);
  const transition = animate ? `stroke-dashoffset ${animationDuration} ease-out` : undefined;
  const strokeLinecap = straightEdge ? 'butt' : 'round';
  const svgSize = responsive ? '100%' : size;

  return (
    <svg width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
      <circle stroke={bgColor} strokeLinecap="round" cx="175" cy="175" r="175" strokeWidth={lineWidth} fill="none" />
      <circle stroke={progressColor} transform="rotate(-90 175 175)" cx="175" cy="175" r="175" strokeDasharray="1100" strokeWidth={lineWidth} strokeDashoffset="1100" strokeLinecap={strokeLinecap} fill="none" style={{ strokeDashoffset, transition }} onTransitionEnd={onAnimationEnd} />
      <text style={textStyle} fill={textColor} x={radius} y={radius} textAnchor="middle" dominantBaseline="central">
        {value}/{total}
      </text>
    </svg>
  );
  }
