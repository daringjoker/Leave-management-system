import { Route, Routes, createBrowserRouter } from "react-router-dom"
import { SignIn } from './sections/signIn'
import { SplitFrontPage } from './sections/splitFrontPage'
import { Reset } from './sections/reset'
import { Renew } from './sections/renew'
import { MustBeLoggedIn, MustNotBeLoggedIn } from './HOC/requireLogin'
import { Layout } from './sections/layout'
import { DashBoard } from './pages/dashboard'
import { Employees } from './pages/employees'
import { NavItem } from './components/navbar'
import dash from './assets/img/dashb.svg'
import emp from './assets/img/emp.svg'
import profile from './assets/img/profile.svg'
import metrics from './assets/img/metrics.svg'
import { Profile } from './pages/profile'
import { Metrics } from './pages/metrics'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

export const router = createBrowserRouter([
  { path: '*', element: <RootRouter /> }
])

export const innerPageRoutes: NavItem[] = [
  { name: "Dashboard", to: "/", icon: dash, element: <DashBoard /> },
  { name: "Profile", to: "/profile", icon: profile, element: <Profile /> },
  { name: "Employees", to: "/employees", icon: emp, element: <Employees /> },
  { name: "Metrics", to: "/metrics", icon: metrics, element: <Metrics /> }
]


export function RootRouter() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route element=<MustNotBeLoggedIn isAuthenticated={isAuthenticated} /> >
        <Route element=<SplitFrontPage />>
          <Route path="/login" element=<SignIn /> />
          <Route path="/forgot-password" element=<Reset /> />
        </Route>
      </Route>
      <Route element=<MustBeLoggedIn isAuthenticated={isAuthenticated} /> >
        <Route path="/renew-password" element=<Renew /> />
        <Route element=<Layout routes={innerPageRoutes} />>
          {innerPageRoutes.map((item, index) => {
            return (
              <Route key={item.to} path={item.to} element={item.element} />
            )
          })}
        </Route>
      </Route>
    </Routes>
  )
}

