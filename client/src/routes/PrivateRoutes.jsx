import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"

export const PrivateRoutes = ({userType, requiredUser}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== requiredUser){
      navigate('/');
    }
  }, []);
  
  return (
    <>
      <Outlet />
    </>
  )
}
