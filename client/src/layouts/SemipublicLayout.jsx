import { Outlet } from "react-router";
import { PublicNavbar } from "../components/navbar/PublicNavbar";
import { FooterSimple } from "../components/footer/footerSimple/FooterSimple";
import './layout.css';

export const SemipublicLayout = () => {
  return (
    <>
      <div className="app-layout">
        <header>
          <PublicNavbar />
        </header>
        <main className="main-content">
          <Outlet />
        </main>
        <footer>
          <FooterSimple />
        </footer>
      </div>
    </>
  )
}
