import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
import { SemipublicLayout } from '../layouts/SemipublicLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminLayout } from '../layouts/AdminLayout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';


//componentes públicos
const Home = lazy(() => import('../pages/publicPages/home/Home'));
const Services = lazy(() => import('../pages/publicPages/services/Services'));
const AdminRegister = lazy(() => import('../pages/publicPages/adminRegister/AdminRegister'));
const ResponRegister = lazy(() => import('../pages/publicPages/responRegister/ResponRegister'));
const Login = lazy(() => import('../pages/publicPages/login/Login'));
const ValoracionPage = lazy(() =>
  import('../pages/publicPages/valoracion/ValoracionPage')
)

//componentes de admin
const AdminDashboard = lazy(() => import('../pages/adminPages/adminDashboard/AdminDashboard'));

export const AppRoutes = () => {
  const {user, loading} = useContext(AuthContext);

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
                <Route path='/services' element={<Services />} />
                <Route path='/adminRegister' element={<AdminRegister />} />
              </Route>
            </Route>

            <Route element={<PublicRoutes />}>
              <Route element={<SemipublicLayout />}>
                <Route path='/responRegister' element={<ResponRegister />} />
                <Route path='/login' element={<Login />}/>  <Route
                  path="/solicitar-valoracion"
                  element={<ValoracionPage />}
                />
              </Route>
            </Route>


            {/* rutas privadas de admin */}
            <Route element={<PrivateRoutes userType={user?.type} requiredUser={1} />}>
              <Route element={<AdminLayout />}>
                <Route path='/admin' element={<AdminDashboard />} />
              </Route>
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
      }
    </>
  )
}
