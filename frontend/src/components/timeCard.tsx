import { getFormattedTime } from '../utils/dateTime';
import timer from '../assets/img/timer.svg';
import { format } from 'date-fns';
import { className } from '../utils/className';
import { useState } from 'react';
import { ACCURACY, useTime } from '../hooks/time';
import { Concrete } from '../types/common';

export interface TimeCardProps {
  title?: string;
  className?: string;
  format?: string;
  icon?: string;
}
const defaultValues: TimeCardProps = {
  title: 'Current Time',
  className: undefined,
  format: "dd LLL yyyy, hh:mm b",
  icon: timer,
}


export function TimeCard(props: TimeCardProps) {
  const { title, className: classNameList, format, icon } = { ...defaultValues, ...props } as Concrete<TimeCardProps>;
  const time = useTime(format);
  return (
    <div className={className("flex flex-row items-center justify-between w-fit h-fit border-gray-200 rounded-2xl border bg-white py-4 px-4", classNameList)} >
      <div className="flex flex-col items-center justify-between w-fit h-fit">
        <p className='text-sm self-start'>{title}</p>
        <p className='text-lg font-bold'>
          {time}
        </p>
      </div>
      <img src={icon} alt="timer" width={30} height={30} className="ml-3" />
    </div >
  );
}

