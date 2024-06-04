import React from 'react';
import { greetingTime } from '../utils/dateTime';

export function GreetingCard(props: { name: string }) {
  const { name } = props;
  return (<div className='text-gray-900'>
    <h1 className="text-3xl font-bold">{greetingTime()}, {name}</h1>
    <p className="text-lg text-gray-500">Welcome to your dashboard</p>
  </div>);
}
