import { useContext } from 'react';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContextProvider';

export const RegisterRequest = () => {
  const {token} = useParams();
  console.log(token);
  const {setIsRegistering} = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    /* pedir al back que verifique que el token esta bien */
    let prueba;
    if (token !== "2"){
      prueba = false;
    } else{
      prueba = true;
    }

    /* la respuesta devuelve isRegistering(true) */
    setIsRegistering(prueba);
    navigate('/responRegister')
  }, []);

  return (
    <div>RegisterRequest</div>
  )
}
