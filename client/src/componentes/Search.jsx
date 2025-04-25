import React from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-w-[300px] lg:min-w-[400px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-400 bg-slate-50 group focus-within:border-primary-200">
      <div>
        <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
          <IoSearch size={22} />
        </button>
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full flex items-center">
          <TypeAnimation
            sequence={[
              'Pesquisar "LEITE"',
              1000,
              'Pesquisar "PAO"',
              1000,
              'Pesquisar "CAFE"',
              1000,
              'Pesquisar "ARROZ"',
              1000,
              'Pesquisar "ACUCAR"',
              1000,
              'Pesquisar "ABACAXI"',
              1000,
              'Pesquisar "BANANA"',
              1000,
              'Pesquisar "MELANCIA"',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default Search;
