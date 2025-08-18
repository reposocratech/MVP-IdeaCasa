import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchData } from '../../../helpers/axiosHelper';

const initialValue = {
  name: "",
  email: "",
  password: "",
  repPassword: ""
}

const AdminRegister = () => {
  const [register, setRegister] = useState(initialValue);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
  }

  const onSubmit = async() => {
    try {
      //validacion a consultar con santi
      /* const { valid, errors } = validateForm(registerSchema, register);
      setValErrors(errors);

      if (valid) {
        const res = await fetchData('/users/register', 'post', register);
      } */

      const res = await fetchData('/users/adminRegister', 'post', register);
      console.log(res);
    } catch (error) {
      console.log(error);
      //setValErrors({});
      //setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  return (
    <section>
      <div className='container'>
         <Form className='w-50'>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange}
              value={register.name}
              name='name'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange}
              value={register.email}
              name='email'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="text" 
              onChange={handleChange}
              value={register.password}
              name='password'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRepPassword">
            <Form.Label>Repite contraseña</Form.Label>
            <Form.Control 
              type="text"
              onChange={handleChange}
              value={register.repPassword}
              name='repPassword'
             />
          </Form.Group>
          <Button 
            variant="primary"
            type="submit"
            onClick={onSubmit}
          >
            Aceptar
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default AdminRegister;