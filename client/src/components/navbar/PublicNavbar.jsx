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
              <Link to='/'><img src="/images/logo-ideacasa.jpg" alt="Logo ideacasa" /></Link>
            </div>
          </Col>
          <Col xs="auto">
            <div className='d-flex justify-content-center gap-4'>
              <Link to='/venta'>Venta</Link>
              <Link to='/alquiler'>Alquiler</Link>
              <Link to='/valora'>Valora tu inmueble</Link>
              <Link to='servicios'>Servicios</Link>
              <Link to='/contacto'>Contacto</Link>
            </div>
          </Col>
          <Col xs="auto">
            <div className='d-flex gap-2'>
              <BsTelephone size={22} />
              <Link to="tel:+34951995959">+34 951995959</Link>
            </div>
          </Col>
        </Row>
      </div>
    </nav>
  )
}
