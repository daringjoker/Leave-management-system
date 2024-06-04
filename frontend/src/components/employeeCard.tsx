import { className } from '../utils/className';
import { DisplayPicture } from './displayPic';
import { Employee } from './employeeName';
import { Info } from './profileInfo';

export interface EmployeeCardProps {
  employee: {
    name: string;
    address: string;
    phone: string;
    email: string;
    designation: string;
    github_username: string;
    country: string;
    department: string;
    managerName: string;
    managerDesignation: string;
    managerRole: string;
  };
  className?: string;
}

export function EmployeeCard(props: EmployeeCardProps) {
  const { className: classNameList, employee } = props;

  return (<div className={className("wvw-20 pb-3 shadow-gray-800 shadow-md rounded-xl bg-white max-h-fit", classNameList)} >
    <div className="flex flex-row items-center justify-between w-full h-fit p-3 border-b border-gray-200 bg-gray-900 rounded-t-xl text-white">
      <div className="flex flex-row items-center justify-between w-full h-fit">
        <DisplayPicture name={employee.name} size="sm" />
        <div className="flex flex-col justify-between w-full h-fit pl-3">
          <p className="text-xl font-inter-400 text-gray-200">{employee.name}</p>
          <p className="text-xs font-inter-400 text-gray-200">{employee.designation}</p>
          <p className="text-xs font-inter-400 text-gray-200">{employee.department}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly wp-40 h-fit text-2xl">
      </div>
    </div>
    <div className="flex-col flex w-full px-3">
      <Info size="sm" label="Address" value={employee.address} />
      <Info size="sm" label="Country" value={employee.country} />
      <Info size="sm" label="Phone" value={employee.phone} uriType="phone" />
      <Info size="sm" label="Email" value={employee.email} uriType="email" />
      <Info size="sm" className='py-1' label="Manager" value=<Employee name={employee.managerName} role={employee.managerRole} designation={employee.managerDesignation} /> />
    </div>
  </div>);
}
