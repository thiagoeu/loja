import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useLocation();
  const searchText = params.search.slice(3);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
      <div>
        {isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Pesquisar "Medicamentos"',
                1000,
                'Pesquisar "Antibióticos"',
                1000,
                'Pesquisar "Analgésicos"',
                1000,
                'Pesquisar "Vitaminas"',
                1000,
                'Pesquisar "Protetor solar"',
                1000,
                'Pesquisar "Suplementos"',
                1000,
                'Pesquisar "Preservativos"',
                1000,
                'Pesquisar "Produtos infantis"',
                1000,
                'Pesquisar "Higiene pessoal"',
                1000,
                'Pesquisar "Cuidados com a pele"',
                1000,
                'Pesquisar "Aparelho de pressão"',
                1000,
                'Pesquisar "Termômetro digital"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Pesquisar por produtos e mais."
              autoFocus
              //defaultValue={searchText}
              className="bg-transparent w-full h-full outline-none"
              //onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
