import { Link, useLocation } from 'react-router-dom';
import { className } from '../utils/className';
import { ReactNode, useEffect, useState } from 'react';

export interface NavItem {
  name: string;
  to: string;
  icon: string;
  element: ReactNode;
  active?: boolean;
}

export interface NavBarProps {
  vertical?: boolean;
  navItems: NavItem[];
}

export function NavBar(props: NavBarProps) {
  const [navLinks, setNavLinks] = useState<NavItem[]>(props.navItems);
  const location = useLocation();
  useEffect(() => {
    const activeIndex = props.navItems.findIndex((item) => (item.to === location.pathname));
    const newNavLinks = [...navLinks];
    newNavLinks[activeIndex].active = true;
    setNavLinks(newNavLinks);
  }, [location, props.navItems]);
  return (
    <div className={className("flex justify-evenly pt-5 w-full", {
      "flex-col": props.vertical || false,
      "flex-row": !props.vertical || false,
    })}>
      {
        props.navItems.map((item, index) => {
          return (
            <NavBarLink key={index} to={item.to} name={item.name} icon={item.icon} active={location.pathname === item.to} />
          )
        })
      }
    </div>
  )
}

export function NavBarLink(props: { to: string, name: string, icon: string, active?: boolean }) {
  const { name, to, icon } = props;
  return (
    <Link to={to} className={className("flex flex-col p-2 mt-1 content-center items-center border-l-4  ", {
      "pointer-events-none border-l-blue-500 bg-blue-100 font-semibold": props.active || false,
      "hover:bg-gray-100 border-l-transparent": !props.active || false,
    })}>
      <img src={icon} alt={`icon-${name}`} width={20} height={20} className={className('m-2', { "scale-110": props.active || false })} />
      <p className="text-xs">{name}</p>
    </Link>
  );
}
