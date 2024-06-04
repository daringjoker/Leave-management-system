import { useEffect, useState } from 'react';
import { CircleCard } from '../components/circleCard';
import { Emptiness } from '../components/emptiness';
import { TimeCard } from '../components/timeCard';
import { GreetingCard } from '../components/greeting';
import { User } from '../types/user';
import { http } from '../utils/http';
import { TrendCard } from '../components/trendCard';
import { LeaveHistory } from '../sections/leaveHistory';
import { Holidays } from '../sections/holidays';

export function DashBoard() {
  const [user, setUser] = useState<User | null>(null);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [balance, setBalance] = useState<any[]>([]);
  const [holidays, setHolidays] = useState<any[]>([]);
  useEffect(() => {
    const userPromise = http.get<User>('/users/self');
    const balancePromise = http.get('/users/self/leave-balance');
    const holidayPromise = http.get('/users/self/holidays');

    Promise.all([userPromise, balancePromise, holidayPromise])
      .then(([{ data: user }, { data: balance }, { data: holidays }]) => {
        setUser(user);
        setBalance(balance);
        setHolidays(holidays);
      })
      .catch(console.error);
  }, []);

  if (!user) {
    return (<Emptiness data={user} message="Loading..." subMessage="Please wait while we load your data" />);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="py-5 flex flex-row items-center justify-between w-full h-fit self-start px-5">
        <GreetingCard name={user.name} />
        <TimeCard />
      </div>
      <div className="flex flex-col w-full h-full text-2xl text-gray-700">
        <div className="flex flex-row items-center justify-between self-start w-full h-fit px-5">
          {balance.filter(item => item.isCommonLeaveType).map((item, index) => {
            return (
              <CircleCard key={index} title={`${item.leaveType} Leave`} value={item.balance} outOf={item.credit} />
            );
          })}
          <TrendCard type="bar" title="Your Leave Trend" className="w-4/12 h-44" data={[{ label: "2023", data: { jan: 1, feb: 2, mar: 0, apr: 0, may: 3, jun: 1, jul: 3, aug: 0, sep: 1, oct: 2, nov: 2, dec: 2 } }, { label: "2024", data: { jan: 3, feb: 1, mar: 1, apr: 3, may: 1, jun: 0, jul: 1 } }, { label: "avg", data: { jan: 2, feb: 3, mar: 2, apr: 0, may: 4, jun: 1, jul: 0 } }]} />
        </div>
        <div className="flex flex-row w-full p-5 flex-1">
          <LeaveHistory className="w-7/12 h-full" />
          <Holidays className="w-5/12 h-full" holidays={holidays} />
        </div>
      </div>
    </div >
  );
}

