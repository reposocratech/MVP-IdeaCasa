import { Outlet } from "react-router"
import { Sidebar } from "../components/sidebar/sidebarAdmin/Sidebar"

export const AdminLayout = () => {
  return (
    <>
      <main className="d-flex gap-5">
        <Sidebar />
        <Outlet />
      </main>
    </>
  )
}
