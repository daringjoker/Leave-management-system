import motif from '../assets/img/motif.svg'
import { useState } from 'react';
import { SplitFrontPage } from '../sections/splitFrontPage';
import { SignIn } from '../sections/signIn';

export function Login() {
  return (<SplitFrontPage><SignIn /></SplitFrontPage>);
}
