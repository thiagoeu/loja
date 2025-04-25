import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
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
          <div className="hidden lg:block">Carrinho</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
