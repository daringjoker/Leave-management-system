import { Outlet } from 'react-router-dom';
import { Logo } from '../components/logo';
import { DisplayPicture } from '../components/displayPic.tsx';
import { NavBar, NavItem } from '../components/navbar';
import { Badged } from '../components/badged.tsx';
import notification from '../assets/img/notification.svg';
import { useModal } from '../hooks/modal.tsx';
import { ApplyLeave } from './applyLeave.tsx';
import { User } from '../types/user.ts';
import { useEffect, useState } from 'react';
import { http } from '../utils/http.ts';
import { logout } from '../services/authentication.ts';

export function Layout(props: { routes: NavItem[] }) {
  const { modal, triggerModal, closeModal } = useModal();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    http.get<User>('/users/self')
      .then(({ data }) => {
        setUser(data);
      })
      .catch(console.error);
  }, [modal]);

  function openModal() {
    triggerModal("Apply Leave", <ApplyLeave close={closeModal} mode='APPLY' />);
  }
  return (
    <div className="flex flex-col min-h-screen w-full">
      {modal}
      <div className="flex flex-row items-cente justify-between w-full hpx-80 px-5">
        <div className="flex flex-row items-center justify-between  w-fit">
          <Logo className='text-3xl' />
        </div>
        <div className="flex flex-row items-center justify-between  w-fit">
          <button className='bg-black text-white px-4 py-2 rounded-full' onClick={openModal}>
            Apply Leave
          </button>
          <div className='mx-4'>
            <Badged badge={<div className="flex items-center justify-center text-xs text-white bg-blue-500 rounded-full px-1 w-fit aspect-square">4</div>} badgePlacement="top-right" enableBadge={true}>
              <div className="w-fit">
                <img src={notification} width={36} height={36} alt="bell-icon" className="" />
              </div>
            </Badged>
          </div>
          <DisplayPicture name={user?.name ?? ""} size="50" />
          <button className='bg-black text-white px-4 py-2 ml-3 rounded-full' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full h-full flex-1">
        <div className="flex flex-col items-center wpx-90 h-full text-sm text-gray-700">
          <NavBar vertical navItems={props.routes} />
        </div>
        <div className="border-t border-l border-l-gray-300 border-t-gray-300 flex bg-gray-200 text-2xl text-gray-700 flex-1">
          <Outlet />
        </div>
      </div>
    </div >
  );
}
