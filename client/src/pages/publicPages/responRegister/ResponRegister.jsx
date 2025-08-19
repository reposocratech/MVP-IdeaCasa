import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonType1 } from '../../../components/buttonType1/ButtonType1';
import { fetchData } from '../../../helpers/axiosHelper';
import { validateForms } from '../../../helpers/validateForms';
import { registerSchema } from '../../../zodSchemas/registerSchema';
import './responRegister.css';

const initialValue = {
  name: "",
  lastname: "",
  email: "",
  phone_number: "",
  dni: "",
  address: "",
  agency: "",
  password: "",
  repPassword: ""
}

const ResponRegister = () => {
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
      const { valid, errors } = validateForms(registerSchema, register);
      setValErrors(errors);

      if (valid) {
        const res = await fetchData('/users/register', 'post', register);
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
    <>
    <section className='py-5 '>
      <div className="container">
        <div className='mx-auto w-75 p-3 bg-light-grey rounded-4'>
          <Form>
            <h3 className='py-3'>FORMULARIO DE REGISTRO</h3>
            <Row>
              <Col>
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
                <Form.Group className="mb-3" controlId="formBasiclastname">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.lastname}
                    name='lastname'
                  />
                  {valErrors.lastname && <Form.Text className="text-muted">{valErrors.lastname}</Form.Text>}
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
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.phone_number}
                    name='phone_number'
                  />
                  {valErrors.phone_number && <Form.Text className="text-muted">{valErrors.phone_number}</Form.Text>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicDNI">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.dni}
                    name='dni'
                  />
                  {valErrors.dni && <Form.Text className="text-muted">{valErrors.dni}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.address}
                    name='address'
                  />
                  {valErrors.address && <Form.Text className="text-muted">{valErrors.address}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAgency">
                  <Form.Label>Agencia (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.agency}
                    name='agency'
                  />
                  {valErrors.agency && <Form.Text className="text-muted">{valErrors.agency}</Form.Text>}
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
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
    </>
  )
}

export default ResponRegister;
