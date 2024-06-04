import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { http } from '../utils/http';
import { getDurationInclusive, getFormattedDate } from '../utils/dateTime';
import { Pill } from '../components/pill';
import { Employee } from '../components/employeeName';

export interface ApplyLeaveProps {
  mode: 'APPLY' | 'VIEW';
  close: () => void;
  leave?: any;
}

export function ApplyLeave(props: ApplyLeaveProps) {
  const { close, mode, leave } = props;
  const disabled = mode !== 'APPLY';

  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<any[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [fromDate, setFromDate] = useState(getFormattedDate(leave?.startDate ?? new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = useState(getFormattedDate(leave?.endDate ?? new Date(), "yyyy-MM-dd"));
  useEffect(() => {
    const userPromise = http.get<User>('/users/self');
    const balancePromise = http.get('/users/self/leave-balance');

    Promise.all([userPromise, balancePromise])
      .then(([{ data: user }, { data: balance }]) => {
        setUser(user);
        setBalance(balance);
        console.dir({ user, leave }, { depth: null })
        setCanManage(user.id === leave?.managerId && leave.status.toLowerCase() === "pending");
      })
      .catch(console.error);
  }, []);

  function applyLeave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mode !== 'APPLY') {
      close?.();
    }
    const formData = new FormData(e.currentTarget);
    const leaveType = formData.get('leaveTypeId') as string;
    const reason = formData.get('reason') as string;
    const data = {
      leaveTypeId: +leaveType,
      startDate: fromDate,
      endDate: toDate,
      reason,
    };

    http.post('/users/self/leaves', data)
      .then(() => {
        close?.();
      })
      .catch(console.error);
  }

  function approve() {
    http.put(`/leaves/${leave.id}/approve`)
      .then(() => {
        close?.();
      })
      .catch(console.error);
  }

  function reject() {
    http.put(`/leaves/${leave.id}/reject`)
      .then(() => {
        close?.();
      })
      .catch(console.error);
  }

  return (
    <div>
      <form className="flex flex-col w-full wvw-40" onSubmit={applyLeave}>
        <div className="flex flex-row items-center justify-between pt-5">
          <div className="flex flex-row wp-47">
            <label className="text-lg py-2 pr-5">Applied By:</label>
            <Employee name={user?.name ?? "self"} designation={user?.designation} />
          </div>
          {disabled &&
            <div className="flex flex-row wp-47">
              <label className="text-lg py-2 pr-5">Managed By:</label>
              <Employee name={leave?.approverName ?? "self"} designation={leave?.approverDesignation} />
            </div>
          }
        </div>
        <label className="text-lg py-2">Leave Type</label>
        <select disabled={disabled} className="border border-gray-300 rounded-md p-2" name="leaveTypeId">
          {balance.filter(item => item.balance > 0).map((item, index) => {
            return (
              <option key={index} value={item.leaveTypeId} selected={leave?.leaveTypeId == item.leaveTypeId}>{item.leaveType} Leave {!disabled && <>({item.balance} days remaining)</>}</option>
            );
          })}
        </select>
        <div className="flex flex-row items-center justify-between pt-5">
          <div className="flex flex-col wp-47">
            <label className="text-lg py-2">From (inclusive)</label>
            <input disabled={disabled} type="date" className="border border-gray-300 rounded-md p-2" value={fromDate} onChange={(e) => setFromDate(getFormattedDate(e.target.value, "yyyy-MM-dd"))} />
          </div>
          <div className="flex flex-col wp-47">
            <label className="text-lg py-2">To (inclusive)</label>
            <input type="date" disabled={disabled} className="border border-gray-300 rounded-md p-2" value={toDate} onChange={(e) => setToDate(getFormattedDate(e.target.value, "yyyy-MM-dd"))} />
          </div>
        </div>
        <div className="flex flex-row items-center pt-5">
          <label className="text-lg py-3">Duration:</label>
          <div className='pl-3 text-lg'>
            <Pill className='bg-gray-600 text-gray-100' text={getDurationInclusive(fromDate, toDate)} />
          </div>
        </div>

        <label className="text-lg py-2">Reason</label>
        <textarea disabled={disabled} className="border border-gray-300 rounded-md p-2 min-hpx-200" name="reason" value={leave?.reason} />
        {(mode === "APPLY") && <div className="flex flex-row items-center justify-between pt-3">
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2 wp-40">Submit</button>
          <button onClick={(e) => close?.()} className="bg-red-500 text-white rounded-md p-2 mt-2 wp-40">Cancel</button>
        </div>}
      </form >
      {(canManage) && <div className="flex flex-row items-center justify-between pt-3">
        <button onClick={(e) => approve()} className="bg-green-500 text-white rounded-md p-2 mt-2 wp-40">Approve</button>
        <button onClick={(e) => reject()} className="bg-red-500 text-white rounded-md p-2 mt-2 wp-40">Reject</button>
      </div>}
    </div >
  );
}

