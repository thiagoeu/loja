import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container flex mx-auto  items-center h-full px-2 justify-between">
        <div className="h-full">
          <div className="h-full flex justify-center items-center">
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
          </div>
        </div>
        <div>Pesquisar</div>
        <div>Carrinho</div>
      </div>
    </header>
  );
};

export default Header;
