import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
