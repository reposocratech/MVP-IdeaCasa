import { useContext } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContextProvider";

export const PrivateRoutes = ({userType, requiredUser}) => {
  const navigate = useNavigate();
  const {isRegistering, user} = useContext(AuthContext);

  useEffect(() => {
    if (userType !== requiredUser){
      navigate('/');
    }
  }, []);
  
  return (
    <>
      {(user || isRegistering) && <Outlet />}
    </>
  )
}
