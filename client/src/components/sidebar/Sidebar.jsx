import { useContext } from "react"
import { ButtonType1 } from "../buttonType1/ButtonType1"
import { AuthContext } from "../../context/AuthContextProvider"
import { useNavigate } from "react-router";

export const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <aside>
      <div>
        <ButtonType1 onClick={onLogout}>Cerrar sesión</ButtonType1>
      </div>
    </aside>
  )
}
