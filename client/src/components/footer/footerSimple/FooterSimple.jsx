import { SiInstagram, SiFacebook, SiX, SiYoutube } from 'react-icons/si';
import './footerSimple.css';

export const FooterSimple = () => {
  return (
    <footer className='footer-secondary'>
      <div className="container">
        <div className="divider"></div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <p className='mb-0'>&copy; Copyright 2025 All rights reserved.</p>
          <div className='d-flex gap-2'>
            <SiInstagram size={24} color="#19163A" className="icon-circle"/>
            <SiFacebook size={24} color="#19163A" className="icon-circle"/>
            <SiX size={24} color="#19163A" className="icon-circle" />
            <SiYoutube size={24} color="#19163A" className="icon-circle" />
          </div>
        </div>
      </div>
    </footer>
  )
}
