import React, { useState } from 'react'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import { ButtonType1 } from '../buttonType1/ButtonType1'
import { fetchData } from '../../helpers/axiosHelper'
import { valoracionSchema } from '../../schemas/valoracionSchema'
import { ZodError } from 'zod'

const initialValue = {
  tipo: '',
  ciudad: '',
  provincia: '',
  calle: '',
  codigoPostal: '',
  planta: '',
  dormitorios: '',
  superficie: '',
  baños: '',
  nombreContacto: '',
  telefonoContacto: '',
  emailContacto: '',
  mensajeContacto: '',
  aceptoPrivacidad: false,
  aceptoNovedades: false,
}

export const Valoracion = () => {
  const [formData, setFormData] = useState(initialValue)
  const [formErrors, setFormErrors] = useState({})
  const [msgSuccess, setMsgSuccess] = useState('')
  const [msgError, setMsgError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormErrors({})
    setMsgSuccess('')
    setMsgError('')

    try {
      valoracionSchema.parse(formData)

      const res = await fetchData('/valoracion/solicitar', 'post', formData)

      if (res.status === 200) {
        setMsgSuccess(
          '¡Solicitud de valoración enviada con éxito! Pronto nos pondremos en contacto con usted.'
        )
        setFormData(initialValue)
      } else {
        setMsgError(
          res.data.message ||
            'Ha ocurrido un error inesperado al enviar la solicitud.'
        )
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setFormErrors(newErrors)
        setMsgError('Por favor, corrige los errores en el formulario.')
      } else if (error.response) {
        setMsgError(
          error.response.data.message ||
            'Error del servidor al procesar la solicitud.'
        )

        if (error.response.data.errors) {
          const backendErrors = {}
          error.response.data.errors.forEach((err) => {
            backendErrors[err.field] = err.message
          })
          setFormErrors(backendErrors)
        }
      } else {
        setMsgError(
          'No se pudo conectar con el servidor o hubo un error inesperado.'
        )
      }
      console.error('Error al enviar la solicitud:', error)
    }
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold">Valoramos tu Inmueble</h2>
      <p className="text-center mb-5">
        Completa este formulario y recibe una valoración profesional de tu
        propiedad.
      </p>

      <Form onSubmit={onSubmit} className="p-4 border rounded shadow-sm">
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h4>Datos del Inmueble</h4>
            <Form.Group className="mb-3" controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Piso, chalet, local..."
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                isInvalid={!!formErrors.tipo}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.tipo}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Málaga"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                isInvalid={!!formErrors.ciudad}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.ciudad}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProvincia">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Málaga"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                isInvalid={!!formErrors.provincia}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.provincia}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCalle">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Calle del Sol, 1"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                isInvalid={!!formErrors.calle}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.calle}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCodigoPostal">
              <Form.Label>Código postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="29001"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                isInvalid={!!formErrors.codigoPostal}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.codigoPostal}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formPlanta">
                  <Form.Label>Planta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="2ª"
                    name="planta"
                    value={formData.planta}
                    onChange={handleChange}
                    isInvalid={!!formErrors.planta}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.planta}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDormitorios">
                  <Form.Label>Dormitorios</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="3"
                    name="dormitorios"
                    value={formData.dormitorios}
                    onChange={handleChange}
                    isInvalid={!!formErrors.dormitorios}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.dormitorios}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formSuperficie">
                  <Form.Label>Superficie</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="120 m²"
                    name="superficie"
                    value={formData.superficie}
                    onChange={handleChange}
                    isInvalid={!!formErrors.superficie}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.superficie}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formBanios">
                  <Form.Label>Baños</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="2"
                    name="baños"
                    value={formData.baños}
                    onChange={handleChange}
                    isInvalid={!!formErrors.baños}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.baños}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <h4>Datos de contacto</h4>
            <Form.Group className="mb-3" controlId="formNombreContacto">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                name="nombreContacto"
                value={formData.nombreContacto}
                onChange={handleChange}
                isInvalid={!!formErrors.nombreContacto}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.nombreContacto}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTelefonoContacto">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="612345678"
                name="telefonoContacto"
                value={formData.telefonoContacto}
                onChange={handleChange}
                isInvalid={!!formErrors.telefonoContacto}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.telefonoContacto}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmailContacto">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@dominio.com"
                name="emailContacto"
                value={formData.emailContacto}
                onChange={handleChange}
                isInvalid={!!formErrors.emailContacto}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.emailContacto}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMensajeContacto">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Algún detalle adicional sobre el inmueble..."
                name="mensajeContacto"
                value={formData.mensajeContacto}
                onChange={handleChange}
                isInvalid={!!formErrors.mensajeContacto}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.mensajeContacto}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAceptoPrivacidad">
              <Form.Check
                type="checkbox"
                name="aceptoPrivacidad"
                checked={formData.aceptoPrivacidad}
                onChange={handleChange}
                isInvalid={!!formErrors.aceptoPrivacidad}
                label={
                  <>
                    Acepto que mis datos sean gestionados de acuerdo con mi{' '}
                    <a
                      href="/politica-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidad
                    </a>
                    .
                  </>
                }
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.aceptoPrivacidad}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAceptoNovedades">
              <Form.Check
                type="checkbox"
                name="aceptoNovedades"
                checked={formData.aceptoNovedades}
                onChange={handleChange}
                isInvalid={!!formErrors.aceptoNovedades}
                label="Acepto de modo inequívoco recibir boletines, novedades o comunicaciones de esta entidad."
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.aceptoNovedades}
              </Form.Control.Feedback>
            </Form.Group>

            {msgError && <p className="text-danger mt-3">{msgError}</p>}
            {msgSuccess && <p className="text-success mt-3">{msgSuccess}</p>}

            <ButtonType1 type="submit" className="w-100 mt-3 d-block mx-auto">
              Solicitar Valoración
            </ButtonType1>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
