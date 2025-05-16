import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4">
          <div className="grid gap-1 py-4">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-blue-50 p-2 border rounded outline-none focus:boder-primary-200"
              type="email"
              id="email"
              name="email"
              value=""
              onChange=""
              placeholder="Digite seu email"
            />
          </div>
          <div className="grid gap-1 py-4">
            <label htmlFor="password">Senha:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                className="w-full outline-none"
                type=""
                id="password"
                name="password"
                value=""
                onChange=""
                placeholder="Digite sua senha"
              />
              <div className="cursor-pointer">
                Mostrar Senha
                <FaRegEye />
                <FaRegEyeSlash />
              </div>
              <Link to={"/"} className="block ml-auto hover:text-primary-200">
                Esqueci minha senha
              </Link>
            </div>
            <button className="bg-green-800 hover:bg-green-700 c">
              Entrar
            </button>
          </div>
        </form>

        <p className="text-center">
          Ainda não possui uma conta?{" "}
          <Link
            to="/register"
            className="text-primary-200 hover:text-primary-100"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
