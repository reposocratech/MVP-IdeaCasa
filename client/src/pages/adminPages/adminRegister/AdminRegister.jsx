import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import { ButtonType1 } from '../../../components/buttons/buttonType1/ButtonType1';
import { fetchData } from '../../../helpers/axiosHelper';
import { validateForms } from '../../../helpers/validateForms';
import { adminRegisterSchema } from '../../../zodSchemas/adminRegisterSchema';

const initialValue = {
  name: "",
  email: "",
  password: "",
  repPassword: ""
}

const AdminRegister = () => {
  const [register, setRegister] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [msgError, setMsgError] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      //validacion
      const { valid, errors } = validateForms(adminRegisterSchema, register);
      setValErrors(errors);

      if (valid) {
        const res = await fetchData('/users/adminRegister', 'post', register);
        console.log(res);
        setRegister(initialValue);
        navigate('/login');
      }

    } catch (error) {
      console.log(error);
      setValErrors({});
      setMsgError(error?.response?.data || "Error inesperado en el servidor");
    }
  }

  return (
    <section className='py-5 bg-light-grey'>
      <div className='container'>
         <div className='mx-auto w-50 p-3 bg-white rounded-4'>
           <Form>
            <h3 className='py-3 fs-4'>FORMULARIO DE REGISTRO DE ADMINISTRADOR</h3>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={register.name}
                name='name'
              />
              {valErrors.name && <Form.Text className="text-muted">{valErrors.name}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={register.email}
                name='email'
              />
              {valErrors.email && <Form.Text className="text-muted">{valErrors.email}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={register.password}
                name='password'
              />
              {valErrors.password && <Form.Text className="text-muted">{valErrors.password}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRepPassword">
              <Form.Label>Repite contraseña</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={register.repPassword}
                name='repPassword'
               />
               {valErrors.repPassword && <Form.Text className="text-muted">{valErrors.repPassword}</Form.Text>}
            </Form.Group>
            {msgError && <p className="small text-danger">{msgError}</p>}
            <div className='text-end py-4'>
              <ButtonType1
                variant="primary"
                onClick={onSubmit}
              >Aceptar</ButtonType1>
            </div>
                   </Form>
         </div>
      </div>
    </section>
  )
}

export default AdminRegister;