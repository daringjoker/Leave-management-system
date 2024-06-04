import { DisplayPicture } from './displayPic';

export interface EmployeeProps {
  name: string;
  dpUrl?: string;
  designation?: string;
  role?: string;
  department?: string;
}

export function Employee(props: EmployeeProps) {
  const { name, dpUrl, department, designation, role } = props;
  return (<div className='flex flex-row items-center cursor-pointer hover:text-blue-400 '>
    <DisplayPicture url={dpUrl ?? ''} size="xs" name={name} />
    <div className='flex flex-col items-start justify-center w-full h-full '>
      <p className="text-sm pl-1 text-black font-inter-500 hover:text-blue-400">{name}</p>
      <p className="text-xs pl-1 text-gray-500 font-inter-400">{[designation, role].filter(Boolean).join(", ")}</p>
    </div>
  </div>);
}
