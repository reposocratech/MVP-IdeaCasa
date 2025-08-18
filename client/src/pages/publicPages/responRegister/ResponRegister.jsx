import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonType1 } from '../../../components/buttonType1/ButtonType1';
import { ButtonType2 } from '../../../components/buttonType2/ButtonType2';

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
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
  }

  return (
    <section className='py-5 bg-light-grey'>
      <div className="container">
        <div className='mx-auto w-75 p-3 bg-white rounded-4'>
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasiclastname">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.lastname}
                    name='lastname'
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
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.phone_number}
                    name='phone_number'
                  />
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.address}
                    name='address'
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAgency">
                  <Form.Label>Agencia (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={register.agency}
                    name='agency'
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
                <div className='text-end py-4'>
                  <ButtonType1 variant="primary">Aceptar</ButtonType1>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default ResponRegister;
