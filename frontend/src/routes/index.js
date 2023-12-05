import { lazy } from 'react'

const ReadingPage = lazy(() => import('../pages/protected/ReadingPage'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Documents = lazy(() => import('../pages/protected/Documents'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))

const routes = [
  {
    path: '/reading',
    component: ReadingPage,
  },
  {
    path: '/documents',
    component: Documents,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
