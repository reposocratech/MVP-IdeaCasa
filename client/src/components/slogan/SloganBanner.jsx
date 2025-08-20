import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const SloganBanner = () => {
  return (
    <div
      className="bg-light text-center py-5"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../../public/images/banner.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-3">
              La diferencia entre buscar y encontrar
            </h1>
            <p className="lead px-4">
              Buscar es el viaje, encontrar es la llegada... aunque muchas
              veces, al llegar, descubrimos que el viaje sigue.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
