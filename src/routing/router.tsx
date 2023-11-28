import {
  Outlet, Router, Route, RootRoute, redirect,
} from '@tanstack/react-router';
import React from 'react';
import { Layout } from '../components/global/Layout/Layout';
import { Login } from '../components/pages/Login/Login';
import { Form } from '../components/global/Form/Form';
import { Registration } from '../components/pages/Registration/Registration';
import { Profile } from '../components/pages/Profile/Profile';
import { RecoverPass } from '../components/pages/RecoverPass/RecoverPass';
import { NewPass } from '../components/pages/newPass/NewPass';
import { CheckEmail } from '../components/pages/CheckEmail/CheckEmail';
import { PackPage } from '../components/pages/PackPage/PackPage';

const rootRoute = new RootRoute({
  component: () => (
    <Outlet />
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Layout,
  // beforeLoad: async () => {
  //   console.log("f");
  //   if (localStorage.getItem('isAuth') !== 'true') {
  //     // eslint-disable-next-line @typescript-eslint/no-throw-literal
  //     throw redirect({
  //       to: '/auth/login',
  //     });
  //   }
  // },
});

const authRoute = new Route({
  getParentRoute: () => indexRoute,
  path: 'auth',
  component: () => <Form />,
});

const loginRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'login',
  component: () => <Login />,
});

const recoverRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'forgot-password',
  component: () => <RecoverPass />,
});

const newPasswordsRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'set-new-password',
  component: () => <NewPass />,
  beforeLoad: async () => {
    if (localStorage.getItem('isAuth') !== 'true') {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw redirect({
        to: '/auth/login',
      });
    }
  },
});

const newPassRoute = new Route({
  getParentRoute: () => newPasswordsRoute,
  path: '$token',
});

const registrationRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'registration',
  component: () => <Registration />,
});

const checkEmailRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'check-mail',
  component: () => <CheckEmail />,
});

const packRoute = new Route({
  getParentRoute: () => indexRoute,
  path: 'pack',
  component: () => <PackPage />,
});

const currentPackRoute = new Route({
  getParentRoute: () => packRoute,
  path: '$pack-id',
});

const profileRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/profile',
  component: () => <Profile />,
  beforeLoad: async () => {
    if (localStorage.getItem('isAuth') !== 'true') {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw redirect({
        to: '/auth/login',
      });
    }
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([
    authRoute.addChildren([
      loginRoute,
      registrationRoute,
      recoverRoute,
      newPasswordsRoute.addChildren([newPassRoute]),
      checkEmailRoute,
    ]),
    profileRoute,
    packRoute.addChildren([currentPackRoute]),
  ]),
]);

export const router = new Router({
  routeTree,
  defaultPreload: 'intent',
});

// declare module '@tanstack/react-router' {
//     interface Register {
//         router: typeof router
//     }
// }
