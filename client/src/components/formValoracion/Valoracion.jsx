import React, { useState } from 'react'
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
import { ButtonType1 } from '../buttons/buttonType1/ButtonType1'
import { fetchData } from '../../helpers/axiosHelper'
import { valoracionSchema } from '../../schemas/valoracionSchema'
import { validateForms } from '../../helpers/validateForms'

const initialValues = {
  propertyType: '',
  city: '',
  province: '',
  street: '',
  postalCode: '',
  floor: '',
  bedrooms: '',
  area: '',
  bathrooms: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  contactMessage: '',
  acceptPrivacy: false,
  acceptNews: false,
}

export const Valoracion = () => {
  const [formData, setFormData] = useState(initialValues)
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
    const { valid, errors } = validateForms(valoracionSchema, formData)

    if (!valid) {
      setFormErrors(errors)
      setMsgError('Por favor, corrige los errores en el formulario.')
      return
    }

    try {
      const res = await fetchData('/valoracion/solicitar', 'post', formData)

      if (res.status === 200) {
        setMsgSuccess(
          '¡Solicitud de valoración enviada con éxito! Pronto nos pondremos en contacto con usted.'
        )
        setFormData(initialValues)
      } else {
        setMsgError(
          res.data.message ||
            'Ha ocurrido un error inesperado al enviar la solicitud.'
        )
      }
    } catch (error) {
      if (error.response) {
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
            <Form.Group className="mb-3" controlId="formPropertyType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Piso, chalet, local..."
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                isInvalid={!!formErrors.propertyType}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.propertyType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Málaga"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!formErrors.city}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProvince">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Málaga"
                name="province"
                value={formData.province}
                onChange={handleChange}
                isInvalid={!!formErrors.province}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.province}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStreet">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Calle del Sol, 1"
                name="street"
                value={formData.street}
                onChange={handleChange}
                isInvalid={!!formErrors.street}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.street}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPostalCode">
              <Form.Label>Código postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="29001"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                isInvalid={!!formErrors.postalCode}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.postalCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formFloor">
                  <Form.Label>Planta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="2ª"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    isInvalid={!!formErrors.floor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.floor}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formBedrooms">
                  <Form.Label>Dormitorios</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="3"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    isInvalid={!!formErrors.bedrooms}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.bedrooms}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formArea">
                  <Form.Label>Superficie</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="120 m²"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    isInvalid={!!formErrors.area}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.area}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formBathrooms">
                  <Form.Label>Baños</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="2"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    isInvalid={!!formErrors.bathrooms}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.bathrooms}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <h4>Datos de contacto</h4>
            <Form.Group className="mb-3" controlId="formContactName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                isInvalid={!!formErrors.contactName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contactName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="612345678"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                isInvalid={!!formErrors.contactPhone}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contactPhone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@dominio.com"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                isInvalid={!!formErrors.contactEmail}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contactEmail}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Algún detalle adicional sobre el inmueble..."
                name="contactMessage"
                value={formData.contactMessage}
                onChange={handleChange}
                isInvalid={!!formErrors.contactMessage}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contactMessage}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAcceptPrivacy">
              <Form.Check
                type="checkbox"
                name="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={handleChange}
                isInvalid={!!formErrors.acceptPrivacy}
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
                {formErrors.acceptPrivacy}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAcceptNews">
              <Form.Check
                type="checkbox"
                name="acceptNews"
                checked={formData.acceptNews}
                onChange={handleChange}
                isInvalid={!!formErrors.acceptNews}
                label="Acepto de modo inequívoco recibir boletines, novedades o comunicaciones de esta entidad."
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.acceptNews}
              </Form.Control.Feedback>
            </Form.Group>

            {msgError && <p className="text-danger mt-3">{msgError}</p>}
            {msgSuccess && <p className="text-success mt-3">{msgSuccess}</p>}

            <div className="d-flex justify-content-center">
              <ButtonType1 type="submit" className="w-100 mt-3">
                Solicitar Valoración
              </ButtonType1>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
