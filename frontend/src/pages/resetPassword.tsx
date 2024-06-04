import { useState } from 'react';
import { SplitFrontPage } from '../sections/splitFrontPage';
import { SignIn } from '../sections/signIn';
import { Reset } from '../sections/reset';

export function ResetPassword() {
  return (<SplitFrontPage><Reset /></SplitFrontPage>);
}
