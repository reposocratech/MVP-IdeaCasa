import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './login.css';
import { ButtonType1 } from '../../../components/buttonType1/ButtonType1';

const initialValue = {
  email: "",
  password: ""
}

const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setLoginData({...loginData, [name]:value});
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
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={loginData.password}
                  name='password'
                />
              </Form.Group>
              <p className='mb-0 text-center'>¿Has olvidado la contraseña? Recupérala aquí.</p>
              <div className='py-3 text-center'>
                <ButtonType1>Aceptar</ButtonType1>
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