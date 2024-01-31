"use client";
import { useEffect, useState } from "react";
import { Form, Link, Navigate, useOutletContext } from "react-router-dom";
import { isTrue, isEmail } from "../utils/utils";
import Spinner from "../components/Spinner";
import PasswordInput from "../components/PasswordInput";
import { Alert } from "flowbite-react";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";
import { login } from "../services/auth";

const Index = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const { token, addToken, setLoad } = useOutletContext();

  useEffect(() => {
    if (isTrue(token)) {
      setLoad(true);

      setTimeout(() => {
        setLoading(false);
        setIsLogin(true);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [token, setLoad]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!isTrue(data.email)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El correo electrónico es obligatorio!",
      });
      setShow(true);

      return;
    }

    if (!isEmail(data.email)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El correo electrónico no es válido!",
      });
      setShow(true);

      return;
    }

    if (!isTrue(data.password)) {
      setMessage({
        status: false,
        type: "failure",
        message: "La contraseña es obligatoria!",
      });
      setShow(true);

      return;
    }

    const response = await login(data);

    if (response.success) {
      addToken(response.token);
      setLoad(true);

      setMessage({
        status: true,
        type: "success",
        message: response.message,
      });

      setShow(true);

      setTimeout(() => {
        setIsLogin(true);
      }, 2000);
    } else {
      setMessage({
        status: false,
        type: "failure",
        message: response.message,
      });

      setShow(true);

      return;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setMessage(null);
    }, 3500);
  }, [show]);

  return (
    <>
      {isLogin && <Navigate to="/dashboard" />}
      <div className="flex flex-col items-center justify-center mx-auto w-full h-full p-2">
        {show && (
          <div className="my-2 w-96">
            <Alert
              color={message?.type}
              icon={message?.status ? HiCheckCircle : HiInformationCircle}
            >
              <span title="Mensaje de alerta">
                <p>{message?.message}</p>
              </span>
            </Alert>
          </div>
        )}
        {loading ? (
          <div className="bg-primary rounded-lg shadow-lg p-8">
            <Spinner text="Cargando sesión actual..." />
          </div>
        ) : (
          <div className="bg-primary rounded-lg shadow-lg w-96">
            <Form action="/dashboard" noValidate onSubmit={handleSubmit}>
              <div className="p-6 text-center">
                <h1 className="text-3xl font-bold text-white">
                  Iniciar sesión
                </h1>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <PasswordInput />
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <button
                    type="submit"
                    className="w-full text-white bg-secondary hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
                  >
                    Iniciar sesión
                  </button>
                </div>
                <div className="mb-2">
                  <Link
                    to="/register"
                    className="text-sm font-medium text-white"
                  >
                    ¿No tienes una cuenta? Regístrate aquí
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
