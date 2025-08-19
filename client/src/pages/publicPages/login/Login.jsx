import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './login.css';
import { ButtonType1 } from '../../../components/buttons/buttonType1/ButtonType1';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { validateForms } from '../../../helpers/validateForms';
import { loginSchema } from '../../../zodSchemas/loginSchema';

const initialValue = {
  email: "",
  password: ""
}

const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [msgError, setMsgError] = useState();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setLoginData({...loginData, [name]:value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const { valid, errors } = validateForms(loginSchema, loginData);
      setValErrors(errors);

      if (valid){
        await login(loginData);
      }
    } catch (error) {
      console.log(error);
      setValErrors({});
      setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  return (
    <>
    
    <section className='pt-4 pb-5'>
      <div className="container">
        <div className='mx-auto px-5 bg-img-login'>
          <div className='mx-auto w-50 p-3 bg-white rounded-4'>
            <Form>
              <h3 className='py-3'>INICIA SESIÓN</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={loginData.email}
                  name='email'
                />
                {valErrors.email && <Form.Text className="text-muted">{valErrors.email}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={loginData.password}
                  name='password'
                />
                {valErrors.password && <Form.Text className="text-muted">{valErrors.password}</Form.Text>}
              </Form.Group>
              <p className='mb-0 text-center'>¿Has olvidado la contraseña? Recupérala aquí.</p>
              {msgError && <p className="small text-danger">{msgError}</p>}
              <div className='py-3 text-center'>
                <ButtonType1 onClick={onSubmit}>Aceptar</ButtonType1>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
    </>

  )
}

export default Login;