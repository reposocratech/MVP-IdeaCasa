import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';

//componentes públicos
const Home = lazy(() => import('../pages/publicPages/home/Home'));
const Services = lazy(() => import('../pages/publicPages/services/Services'));

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1>Cargando...</h1>}>

          {/* rutas publicas*/}
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route element={<PublicLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/services' element={<Services />} />
              </Route>
            </Route>
          </Routes>

        </Suspense>
      </BrowserRouter>
    </>
  )
}
