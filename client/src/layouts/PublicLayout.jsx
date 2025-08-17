import { Outlet } from "react-router"
import { PublicNavbar } from "../components/navbar/PublicNavbar"

export const PublicLayout = () => {
  return (
    <>
      <header>
        <PublicNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        
      </footer>
    </>
  )
}
