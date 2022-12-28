import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { loadState } from 'utils/storage';
const withAuth = (WrappedComponent: NextPage) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const user = loadState('user');

      // If there is no access token we redirect to "/" page.
      if (!user?.isAuthenticated) {
        Router.replace('/');
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
