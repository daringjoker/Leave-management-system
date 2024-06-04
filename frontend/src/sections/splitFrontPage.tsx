import { Outlet } from 'react-router';
import motif from '../assets/img/motif.svg'

export function SplitFrontPage(props: { children?: React.ReactNode }) {
  return (<div className="flex h-screen p-20">
    <div className="flex flex-col items-center justify-center h-full w-full pointer-events-none">
      <h1 className="text-8xl font-bold text-center font-jersey">DareTrack 365</h1>
      <h2 className="text-1xl font-bold text-center font-mono">Leave Management System to the dev by the dev</h2>
      <img src={motif} alt="motif" />
    </div>
    <div className="h-full w-full">
      {props.children || <Outlet />}
    </div>
  </div>);
}
