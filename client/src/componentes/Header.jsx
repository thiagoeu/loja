import useMobile from "../hooks/useMobile";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container flex mx-auto  items-center h-full px-2 justify-between">
        <div className="h-full">
          <Link to="/" className="h-full flex justify-center items-center">
            <img
              src={logo}
              width={90}
              height={90}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={80}
              height={80}
              alt="logo"
              className="lg:hidden"
            />
          </Link>
        </div>

        <div className="hidden lg:block">
          <Search />
        </div>

        <div className="">
          <button className="text-neutral-600 lg:hidden">
            <FaRegCircleUser size={30} />
          </button>

          <div className="hidden lg:flex items-center gap-10">
            <button onClick={redirectToLoginPage} className="text-lg px-2">
              Entrar
            </button>

            <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 via-orange-600 to-yellow-500 px-3 py-2 rounded text-white">
              <div className="animate-bounce">
                <BsCart4 size={30} />
              </div>
              <div className="font-semibold text-sm">Meu Carrinho</div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
