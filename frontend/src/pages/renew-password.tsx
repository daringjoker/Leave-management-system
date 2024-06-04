import motif from '../assets/img/motif.svg'
import { useState } from 'react';
import { SplitFrontPage } from '../sections/splitFrontPage';
import { SignIn } from '../sections/signIn';
import { Renew } from '../sections/renew';

export function RenewPassword() {
  const [error, setError] = useState<string | null>("Invalid email or password");
  return (<SplitFrontPage><Renew /></SplitFrontPage>);
}
