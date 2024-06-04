import { useState, useEffect } from 'react';
import { Card } from '../components/card';
import { Emptiness } from '../components/emptiness';
import { Pill } from '../components/pill';
import { useModal } from '../hooks/modal';
import { getFormattedDate } from '../utils/dateTime';
import { http } from '../utils/http';
import { capitalize } from '../utils/string';
import { ApplyLeave } from './applyLeave';

export interface LeaveHistoryProps {
  className?: string;
}

const LEAVE_STATUS_COLOR_MAP = {
  approved: 'bg-green-500 text-black',
  pending: 'bg-yellow-500 text-black',
  rejected: 'bg-red-500 text-black',
};

export function LeaveHistory(props: LeaveHistoryProps) {
  const { className } = props;
  const { modal, triggerModal, closeModal } = useModal();
  const [leaves, setLeaves] = useState<any[]>([]);
  useEffect(() => {
    const leavesPromise = http.get('/users/self/leaves');

    Promise.all([leavesPromise,])
      .then(([{ data: leaves }]) => {
        setLeaves(leaves);
      })
      .catch(console.error);
  }, [modal]);

  function openLeaveViewfor(leave: any) {
    return () => triggerModal("Leave Details", <ApplyLeave mode='VIEW' close={closeModal} leave={leave} />);
  }

  return (
    <Card className={className} title="Your Leaves">
      {modal}
      <Emptiness data={leaves} message="No leaves taken yet" subMessage="Taking a Break is important too." />
      <table className="w-full h-fit border-spacing-2 border-separate font-inter-300 text-gd">
        <thead>
          <tr>
            <th className="text-left">Type</th>
            <th className="text-right">Duration</th>
            <th className="text-right">Start</th>
            <th className="text-right">End</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody className='font-roboto-regular text-gd'>
          {Object.entries(leaves).map(([key, value]) => (
            <tr key={key} onClick={openLeaveViewfor(value)} className='cursor-pointer hover:text-blue-400'>
              <td className="text-left">{capitalize(value.leaveType)} Leave</td>
              <td className="text-right">{value.duration} days</td>
              <td className="text-right">{getFormattedDate(value.startDate)}</td>
              <td className="text-right">{getFormattedDate(value.endDate)}</td>
              <td className="text-center"><Pill text={value.status} colorMap={LEAVE_STATUS_COLOR_MAP} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card >
  );
}
