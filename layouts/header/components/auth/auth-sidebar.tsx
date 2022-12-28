import React, { useState, useCallback } from 'react';
import ConfirmAccount from './confirm-account';
import { ConfirmCode, ForgetPassword, SetPassword } from './forget-password';
import Login from './login';
import SignUp from './sign-up';

export const enum AuthRoutes {
  LOGIN = 'login',
  SIGNUP = 'signup',
  CONFIRMACCOUNT = 'confirmAccount',
  FORGETPASSWORD = 'forgetPassword',
  CONFIRMCODE = 'confirmCode',
  SETPASSWORD = 'setPassword'
}

export interface PageProps {
  changeRoute: (route: AuthRoutes) => void
}

export interface PagePropsWithPhoneNumber extends PageProps {
  onPhoneChange?: (phone: string) => void;
  phone?: string
}

const AuthSiBar = () => {
  const [currentRoute, setCurrentRoute] = useState(AuthRoutes.LOGIN);
  const [phone, setPhone] = useState("")

  const changeRoute = useCallback(
    (route: AuthRoutes) => setCurrentRoute(route),
    [currentRoute]
  );

  switch (currentRoute) {
    case AuthRoutes.LOGIN:
      return <Login changeRoute={changeRoute} />;
    case AuthRoutes.SIGNUP:
      return <SignUp changeRoute={changeRoute} onPhoneChange={(phone) => setPhone(phone)} />;
    case AuthRoutes.CONFIRMACCOUNT:
      return <ConfirmAccount changeRoute={changeRoute} phone={phone} />;
    case AuthRoutes.FORGETPASSWORD:
      return <ForgetPassword changeRoute={changeRoute} />;
    case AuthRoutes.CONFIRMCODE:
      return <ConfirmCode changeRoute={changeRoute} />;
    case AuthRoutes.SETPASSWORD:
      return <SetPassword changeRoute={changeRoute} />;
    default:
      return <Login changeRoute={changeRoute} />;
  }
};

export default AuthSiBar;
