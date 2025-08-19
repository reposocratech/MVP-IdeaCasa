import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContextProvider"
import { useNavigate } from "react-router";
import { FaHome, FaClipboardCheck, FaUsers, FaKey, FaSignOutAlt } from 'react-icons/fa';
import './sidebarAdmin.css';
import { ButtonType3 } from "../../buttons/buttonType3/ButtonType3";

export const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <aside className="sidebar-admin">
      <div className="p-3 rounded-4 bg-primary-blue d-flex flex-column h-100">
        <header className="text-center mb-5">
          <img src="/images/logo-ideacasa.jpg" alt="Logo Ideacasa"/>
        </header>
        <nav className="d-flex flex-column flex-grow-1 justify-align-content-stretch gap-4">
          <ButtonType3
          ><FaHome className="me-3"/>Inmuebles</ButtonType3>
          <ButtonType3
          ><FaClipboardCheck className="me-3"/>Valoraciones</ButtonType3>
          <ButtonType3
          ><FaUsers className="me-3"/>Usuarios</ButtonType3>
          <div className="mt-5 mx-auto">
            <ButtonType3
            ><FaKey className="me-3" />Nuevo inmueble</ButtonType3>
          </div>
        </nav>
        <div className="pt-4 mx-auto">
          <ButtonType3
            onClick={onLogout}
          ><FaSignOutAlt className="me-3" />Cerrar sesión</ButtonType3>
        </div>
      </div>
    </aside>
  )
}
