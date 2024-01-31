import { HiUserCircle } from "react-icons/hi";
import ImageUploader from "../../components/ImageUploader";
import PasswordInput from "../../components/PasswordInput";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { formatDate, isTrue } from "../../utils/utils";
import {
  updateProfile,
  updatePassword,
  disableUser,
  deleteUser,
} from "../../services/user";
import Confirmation from "../../components/Confirmation";
import { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";

const Profile = () => {
  const { token, userData, addToken, setLoad } = useOutletContext();
  const [showConfirmationDisabled, setShowConfirmationDisabled] =
    useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const [disableUserAction, setDisableUserAction] = useState(false);
  const [deleteUserAction, setDeleteUserAction] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmitUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!isTrue(data.name)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El nombre es obligatorio!",
      });

      scrollToTop();
      setShow(true);
      return;
    }

    if (!isTrue(data.surname)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El apellido es obligatorio!",
      });

      scrollToTop();
      setShow(true);
      return;
    }

    const response = await updateProfile(data, token);

    console.log(response);

    if (response.success) {
      setLoad(true);

      setMessage({
        status: true,
        type: "success",
        message: response.message,
      });

      scrollToTop();
      setShow(true);
    } else {
      setMessage({
        status: false,
        type: "failure",
        message: response.message,
      });

      scrollToTop();
      setShow(true);
    }
  };

  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!isTrue(data.current_password)) {
      setMessage({
        status: false,
        type: "failure",
        message: "La contraseña actual es obligatoria!",
      });

      scrollToTop();
      setShow(true);

      return;
    }

    if (!isTrue(data.password)) {
      setMessage({
        status: false,
        type: "failure",
        message: "La nueva contraseña es obligatoria!",
      });

      scrollToTop();
      setShow(true);

      return;
    }

    if (!isTrue(data.password_confirmation)) {
      setMessage({
        status: false,
        type: "failure",
        message: "La confirmación de la nueva contraseña es obligatoria!",
      });

      scrollToTop();
      setShow(true);

      return;
    }

    if (data.password !== data.password_confirmation) {
      setMessage({
        status: false,
        type: "failure",
        message: "Las contraseñas no coinciden!",
      });

      scrollToTop();
      setShow(true);

      return;
    }

    const response = await updatePassword(data, token);

    if (response.success) {
      setMessage({
        status: true,
        type: "success",
        message: response.message,
      });

      scrollToTop();
      setShow(true);
    } else {
      setMessage({
        status: false,
        type: "failure",
        message: response.message,
      });

      scrollToTop();
      setShow(true);
    }
  };

  const handleDisabledAccount = (e) => {
    e.preventDefault();
    setShowConfirmationDisabled(true);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setShowConfirmationDelete(true);
  };

  useEffect(() => {
    const handleSubmitDisable = async () => {
      const response = await disableUser(token);

      if (response.success) {
        setMessage({
          status: true,
          type: "success",
          message: response.message,
        });
        scrollToTop();
        setShow(true);

        setTimeout(() => {
          setRedirectToLogin(true);
        }, 2000);
      }
    };

    if (disableUserAction) {
      handleSubmitDisable();
    }
  }, [disableUserAction, token]);

  useEffect(() => {
    const handleSubmitDelete = async () => {
      const response = await deleteUser(token);

      if (response.success) {
        setMessage({
          status: true,
          type: "success",
          message: response.message,
        });
        scrollToTop();
        setShow(true);

        setTimeout(() => {
          setRedirectToLogin(true);
        }, 2000);
      }
    };

    if (deleteUserAction) {
      handleSubmitDelete();
    }
  }, [deleteUserAction, token]);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setMessage(null);
    }, 1500);
  }, [show]);

  useEffect(() => {
    if (redirectToLogin) {
      addToken(null);
      redirect("/");
    }
  }, [redirectToLogin, addToken]);

  return (
    <>
      {show && (
        <div className="mb-3 w-full">
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
      <div className="bg-primary rounded-lg shadow-lg p-6 mb-3">
        <h1 className="flex flex-row items-center text-3xl font-bold text-white">
          <HiUserCircle className="mr-2" /> Perfil del usuario
        </h1>
      </div>
      <div className="bg-primary rounded-lg shadow-lg p-6 mb-3">
        <div className="flex flex-col gap-8">
          <Form
            className="flex flex-col lg:flex-row gap-3"
            onSubmit={handleSubmitUpdateProfile}
            encType="multipart/form-data"
            noValidate
          >
            <div className="flex flex-col w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-3 hidden lg:block">
                Foto de perfil
              </h2>
              <ImageUploader imageDefault={userData?.profile?.photo} />
            </div>
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-3">
                Datos del usuario
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={userData?.email}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={userData?.profile?.name}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium text-white"
                  >
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    defaultValue={userData?.profile?.surname}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-white"
                    htmlFor="created_at"
                  >
                    Fecha de creación
                  </label>
                  <input
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    type="date"
                    id="created_at"
                    defaultValue={formatDate(userData?.created_at)}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-white"
                    htmlFor="updated_at"
                  >
                    Fecha de actualización
                  </label>
                  <input
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    type="date"
                    id="updated_at"
                    defaultValue={formatDate(userData?.updated_at)}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="w-full text-white bg-secondary hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
                >
                  Actualizar datos del usuario
                </button>
              </div>
            </div>
          </Form>
          <Form
            className="flex flex-col lg:flex-row gap-3"
            onSubmit={handleSubmitUpdatePassword}
            noValidate
          >
            <div className="flex flex-col w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-3 hidden lg:block">
                Cambiar contraseña
              </h2>
              <p className="text-sm text-gray-200 mt-3">
                Aquí podrás cambiar tu contraseña. Para cambiar la contraseña,
                es necesario ingresar la contraseña actual, luego ingresar la
                nueva contraseña y confirmas ingresando la nueva contraseña.
              </p>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="col-span-2">
                  <PasswordInput
                    label="Ingrese la contraseña actual"
                    id="current_password"
                    name="current_password"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <PasswordInput
                    label="Ingrese la nueva contraseña"
                    id="password"
                    name="password"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <PasswordInput
                    label="Confirme la nueva contraseña"
                    id="password_confirmation"
                    name="password_confirmation"
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="w-full text-white bg-secondary hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
                >
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </Form>
          <Form
            className="flex flex-col lg:flex-row gap-3"
            onSubmit={handleDisabledAccount}
            noValidate
          >
            <div className="flex flex-col w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-3 hidden lg:block">
                Inhabilitar cuenta
              </h2>
              <p className="text-sm text-gray-200">
                Aquí podrás inhabilitar tu cuenta. Para inhabilitar la cuenta es
                necesario estar autenticado. Una vez inhabilitada la cuenta,
                debes contactar al soporte técnico para habilitar la cuenta.
              </p>
            </div>
            <div className="w-full lg:w-2/3 flex items-center">
              <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
              >
                Inhabilitar cuenta
              </button>
            </div>
          </Form>
          <Form
            className="flex flex-col lg:flex-row gap-3 mb-6"
            onSubmit={handleDeleteAccount}
            noValidate
          >
            <div className="flex flex-col w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-3 hidden lg:block">
                Eliminar cuenta permanentemente
              </h2>
              <p className="text-sm text-gray-200">
                Aquí podrás eliminar tu cuenta permanentemente, pero no podrás
                recuperarla. Se borraran todos los datos de tu cuenta y no
                puedes recuperarla.
              </p>
            </div>
            <div className="w-full lg:w-2/3 flex items-center">
              <button
                type="submit"
                className="w-full text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
              >
                Borrar cuenta permanentemente
              </button>
            </div>
          </Form>
        </div>
      </div>
      <Confirmation
        setShowConfirm={setShowConfirmationDisabled}
        showConfirm={showConfirmationDisabled}
        setDeletePost={setDisableUserAction}
        message="¿Estás seguro de que deseas desactivar tu cuenta?"
        optionYes="Si, deseo desactivar mi cuenta"
        optionNo="No, no quiero desactivar mi cuenta"
      />
      <Confirmation
        setShowConfirm={setShowConfirmationDelete}
        showConfirm={showConfirmationDelete}
        setDeletePost={setDeleteUserAction}
        message="¿Estás seguro de que deseas eliminar tu cuenta?"
        optionYes="Si, deseo eliminar mi cuenta permanentemente!"
        optionNo="No, no quiero eliminar mi cuenta."
      />
    </>
  );
};

export default Profile;
