import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { SemipublicLayout } from '../layouts/SemipublicLayout';

//componentes públicos
const Home = lazy(() => import('../pages/publicPages/home/Home'));
const Services = lazy(() => import('../pages/publicPages/services/Services'));
const AdminRegister = lazy(() => import('../pages/publicPages/adminRegister/AdminRegister'));
const ResponRegister = lazy(() => import('../pages/publicPages/responRegister/ResponRegister'));
const Login = lazy(() => import('../pages/publicPages/login/Login'));

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1>Cargando...</h1>}>

          <Routes>
            {/* rutas publicas*/}
            <Route element={<PublicRoutes />}>
              <Route element={<PublicLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/services' element={<Services />} />
                <Route path='/adminRegister' element={<AdminRegister />} />
              </Route>
            </Route>

            <Route element={<PublicRoutes />}>
              <Route element={<SemipublicLayout />}>
                <Route path='/responRegister' element={<ResponRegister />} />
                <Route path='/login' element={<Login />}/>
              </Route>
            </Route>
          </Routes>

        </Suspense>
      </BrowserRouter>
    </>
  )
}
