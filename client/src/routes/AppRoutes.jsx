import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { SemipublicLayout } from '../layouts/SemipublicLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminLayout } from '../layouts/AdminLayout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { RegisterRequest } from '../pages/publicPages/registerRequest/RegisterRequest';

//componentes públicos
const Home = lazy(() => import('../pages/publicPages/home/Home'));
const Services = lazy(() => import('../pages/publicPages/services/Services'));
const Contact = lazy(() => import('../pages/publicPages/contact/Contact'));
const Login = lazy(() => import('../pages/publicPages/login/Login'));
const ValoracionPage = lazy(() => import('../pages/publicPages/valoracion/ValoracionPage'));

const ResponRegister = lazy(() => import('../pages/userPages/responRegister/ResponRegister'));

//componentes de admin
const AdminRegister = lazy(() => import('../pages/adminPages/adminRegister/AdminRegister'));
const AdminDashboard = lazy(() => import('../pages/adminPages/adminDashboard/AdminDashboard'));

export const AppRoutes = () => {
  const {user, loading, isRegistering } = useContext(AuthContext);

  return (
    <>
      {loading? <h1>Cargando...</h1> :
      <BrowserRouter>
        <Suspense fallback={<h1>Cargando...</h1>}>
          <Routes>
            {/* rutas publicas*/}
            <Route element={<PublicRoutes />}>
              <Route element={<PublicLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/valoracion' element={<ValoracionPage />}/>
                <Route path='/servicios' element={<Services />} />
                <Route path='/contacto' element={<Contact />} />
                <Route path='/login' element={<Login />}/>
                <Route path='/registerRequest/:token' element={<RegisterRequest />}/>
              </Route>
            </Route>

            <Route element={<PrivateRoutes userType={isRegistering} requiredUser={true} />}>
              <Route element={<SemipublicLayout />}>
                <Route path='/userRegister' element={<ResponRegister />} />
              </Route>
            </Route>


            {/* rutas privadas de admin */}
            <Route element={<PrivateRoutes userType={user?.type} requiredUser={1} />}>
              <Route element={<AdminLayout />}>
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/adminRegister' element={<AdminRegister />} />
              </Route>
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
      }
    </>
  )
}
