import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export interface MustBeLoggedInProps {
  isAuthenticated: boolean;
}
export function MustBeLoggedIn(props: MustBeLoggedInProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.isAuthenticated) {
      navigate('/login');
    }
  }, [props.isAuthenticated]);

  return (
    <Outlet />
  );
}

export function MustNotBeLoggedIn(props: MustBeLoggedInProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.isAuthenticated) {
      navigate('/');
    }
  }, [props.isAuthenticated]);
  return (
    <Outlet />
  );
}
