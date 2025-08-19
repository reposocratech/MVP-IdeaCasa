import { Outlet } from "react-router"
import { Sidebar } from "../components/sidebar/Sidebar"

export const AdminLayout = () => {
  return (
    <>
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </>
  )
}
