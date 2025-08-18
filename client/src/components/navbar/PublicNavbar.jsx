import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { Link } from 'react-router'
import './publicNavbar.css';
import { BsTelephone } from "react-icons/bs";

export const PublicNavbar = () => {
  return (
    <nav className='py-3 nav-public'>
      <div className='container'>
        <Row className='align-items-center justify-content-between'>
          <Col xs="auto">
            <div>
              <Link><img src="/images/logo-ideacasa.jpg" alt="Logo ideacasa" /></Link>
            </div>
          </Col>
          <Col xs="auto">
            <div className='d-flex justify-content-center gap-4'>
              <Link>Venta</Link>
              <Link>Alquiler</Link>
              <Link>Valora tu inmueble</Link>
              <Link>Servicios</Link>
              <Link>Contacto</Link>
            </div>
          </Col>
          <Col xs="auto">
            <div className='d-flex gap-2'>
              <BsTelephone size={22} />
              <Link>+34 951995959</Link>
            </div>
          </Col>
        </Row>
      </div>
    </nav>
  )
}
