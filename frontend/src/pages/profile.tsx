import { Card } from '../components/card';
import { DisplayPicture } from '../components/displayPic';
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { http } from '../utils/http';
import { Info } from '../components/profileInfo';
import { SimpleProgress } from '../components/simpleProgress';
import { TrendCard } from '../components/trendCard';
import { LeaveHistory } from '../sections/leaveHistory';
import { Emptiness } from '../components/emptiness';
import { Employee } from '../components/employeeName';

export function Profile() {
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
    <div className="flex flex-row w-full l p-2">
      <div className="flex flex-col items-center justify-around w-full h-full self-start">
        <Card className='wvw-50 mb-2'>
          <div className="flex flex-row items-center justify-between w-full h-fit border-b border-b-gray-200 py-2">
            <DisplayPicture name={user.name ?? ''} size="md" squareBorder />
            <div className='flex flex-col items-start justify-center w-full h-full pl-4'>
              <p className="text-5xl font-roboto-400 text-black pb-1">{user!.name}</p>
              <p className="text-xl font-inter-400 text-gray-700">{user!.designation}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full h-fit">
            <div className="flex flex-col flex-wrap items-start justify-center w-full h-fit font-inter-300 text-gd">
              <Info className='py-1' label="Address" value={user!.address} />
              <Info className='py-1' label="Email" value={user!.email} uriType="email" />
              <Info className='py-1' label="Phone" value={user!.phone} uriType="phone" />
              <Info className='py-1' label="Department" value={user!.department} />
              <Info className='py-1' label="Country" value={user!.country} />
              <Info className='py-1' label="Manager" value={<Employee name={user.managerName} designation={user.managerDesignation} />} />
            </div>
          </div>
        </Card>
        <Card title="Leave Balance" className='wvw-50 flex-1 text-lg'>
          <table className="w-full h-fit border-spacing-3 border-separate">
            <thead>
              <tr>
                <th className="text-left">Type</th>
                <th className="text-center"></th>
                <th className="text-right">Taken</th>
                <th className="text-right">Remaining</th>
                <th className="text-right">Credit</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(balance).map(([key, value]) => (
                <tr key={key}>
                  <td className="text-left">{value.leaveType} Leave</td>
                  <td className="text-center">
                    <SimpleProgress remaining={value.balance} total={value.credit} unit='days' />
                  </td>
                  <td className="text-right">{value.credit - value.balance} days</td>
                  <td className="text-right">{value.balance} days</td>
                  <td className="text-right">{value.credit} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div >
      <div className="flex flex-col w-full h-full text-2xl text-gray-700 pl-2">
        <TrendCard type="line" title="Your Leave Trend" className="hvh-30 w-full" data={[{ label: "2023", data: { jan: 1, feb: 2, mar: 0, apr: 0, may: 3, jun: 1, jul: 3, aug: 0, sep: 1, oct: 2, nov: 2, dec: 2 } }, { label: "2024", data: { jan: 3, feb: 1, mar: 1, apr: 3, may: 1, jun: 0, jul: 1 } }, { label: "avg", data: { jan: 2, feb: 3, mar: 2, apr: 0, may: 4, jun: 1, jul: 0 } }]} />
        <LeaveHistory className='flex-1 w-full mt-2' />
      </div>
    </div >
  );
}

