import { useEffect, useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import ImageUploader from "../../components/ImageUploader";
import Event from "../../components/Event";
import { Form, useLoaderData, useOutletContext } from "react-router-dom";
import { isTrue } from "../../utils/utils";
import { Alert } from "flowbite-react";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";
import { getEvent, createEvent, updateEvent } from "../../services/event";

export function loader({ params }) {
  const { slug } = params;
  return slug !== undefined ? slug : null;
}

const Create = () => {
  const loaderData = useLoaderData();
  const [isEmpty, setIsEmpty] = useState(true);
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    priority: "",
    color: "bg-blue-200",
    photo: null,
  });
  const [slug, setSlug] = useState(null);
  const { token } = useOutletContext();

  const handleEventChange = (e) => {
    const { name, value } = e.target;

    const isFormEmpty = Object.keys(eventData).some(
      (key) =>
        key !== "isEmpty" &&
        typeof eventData[key] === "string" &&
        eventData[key].trim() !== ""
    );

    setIsEmpty(!isFormEmpty);
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getButtonTextAndTitle = () => {
    if (slug) {
      return {
        buttonText: "Actualizar evento",
        title: "Editar evento",
      };
    } else {
      return {
        buttonText: "Crear evento",
        title: "Crear un nuevo evento",
      };
    }
  };

  useEffect(() => {
    if (loaderData !== null) {
      setSlug(loaderData);

      (async () => {
        const response = await getEvent(token, loaderData);
        if (response.success) {
          const eventData = response.data;
          setEventData(eventData);
          setIsEmpty(false);
        }
      })();
    }
  }, [loaderData, token]);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setMessage(null);
    }, 3500);
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!isTrue(data.title)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El título es obligatorio!",
      });

      setShow(true);

      return;
    }

    if (!isTrue(data.start)) {
      setMessage({
        status: false,
        type: "failure",
        message: "La fecha de inicio es obligatoria!",
      });

      setShow(true);

      return;
    }

    if (!isTrue(data.end)) {
      setMessage({
        status: false,
        type: "failure",
        message: "La fecha de fin es obligatoria!",
      });

      setShow(true);

      return;
    }

    if (!isTrue(data.priority)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El prioridad es obligatoria!",
      });

      setShow(true);

      return;
    }

    if (!isTrue(data.color)) {
      setMessage({
        status: false,
        type: "failure",
        message: "El color es obligatorio!",
      });

      setShow(true);

      return;
    }

    if (slug) {
      const response = await updateEvent(token, slug, data);

      if (response.success) {
        setMessage({
          status: true,
          type: "success",
          message: response.message,
        });

        setShow(true);
      } else {
        setMessage({
          status: false,
          type: "failure",
          message: response.message,
        });

        setShow(true);
      }
    } else {
      const response = await createEvent(token, data);

      if (response.success) {
        setMessage({
          status: true,
          type: "success",
          message: response.message,
        });

        setShow(true);
      } else {
        setMessage({
          status: false,
          type: "failure",
          message: response.message,
        });

        setShow(true);
      }
    }
  };

  return (
    <>
      <div className="bg-primary rounded-lg shadow-lg p-6 mb-3">
        <h1 className="flex flex-row items-center text-3xl font-bold text-white">
          <AiFillFolderAdd className="mr-2" /> {getButtonTextAndTitle().title}
        </h1>
      </div>
      <div className="bg-primary rounded-lg shadow-lg p-6 mb-3">
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
        <Form
          className="flex flex-col lg:flex-row gap-3"
          noValidate
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-white mb-3 hidden lg:block">
              Imagen del evento
            </h2>
            <ImageUploader imageDefault={eventData?.photo} />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-white mb-3">
              Datos del evento
            </h2>
            {!isEmpty && (
              <div className="flex mb-3">
                <Event event={eventData} />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white"
                >
                  Titulo del evento
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={eventData?.title}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                >
                  Descripción del evento
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  defaultValue={eventData.description}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="start"
                  className="block text-sm font-medium text-white"
                >
                  Fecha de inicio del evento
                </label>
                <input
                  type="date"
                  name="start"
                  id="start"
                  defaultValue={eventData.start}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="end"
                  className="block text-sm font-medium text-white"
                >
                  Fecha de fin del evento
                </label>
                <input
                  type="date"
                  name="end"
                  id="end"
                  defaultValue={eventData.end}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-white"
                >
                  Ubicación del evento
                </label>
                <textarea
                  name="location"
                  id="location"
                  rows="3"
                  defaultValue={eventData.location}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-white"
                >
                  Prioridad del evento
                </label>
                <select
                  name="priority"
                  id="priority"
                  defaultValue={eventData.priority}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="1">Alta</option>
                  <option value="2">Media</option>
                  <option value="3">Baja</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-white"
                >
                  Color del evento
                </label>
                <select
                  name="color"
                  id="color"
                  defaultValue={eventData.color}
                  onChange={handleEventChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="bg-blue-200">Azul</option>
                  <option value="bg-red-200">Rojo</option>
                  <option value="bg-green-200">Verde</option>
                  <option value="bg-yellow-200">Amarillo</option>
                  <option value="bg-purple-200">Morado</option>
                  <option value="bg-indigo-200">Indigo</option>
                  <option value="bg-pink-200">Rosado</option>
                  <option value="bg-orange-200">Naranja</option>
                  <option value="bg-amber-200">Amber</option>
                  <option value="bg-lime-200">Lima</option>
                  <option value="bg-teal-200">Verde azulado</option>
                  <option value="bg-cyan-200">Cían</option>
                  <option value="bg-sky-200">Cielo</option>
                  <option value="bg-slate-200">Negro pizarra</option>
                  <option value="bg-gray-200">Gris</option>
                  <option value="bg-zinc-200">Zinc</option>
                  <option value="bg-neutral-200">Neutral</option>
                  <option value="bg-stone-200">Piedra</option>
                  <option value="bg-fuchsia-200">Fucsia</option>
                  <option value="bg-violet-200">Violeta</option>
                  <option value="bg-rose-200">Rosa</option>
                  <option value="bg-emerald-200">Esmeralda</option>
                </select>
              </div>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full text-white bg-secondary hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
              >
                {getButtonTextAndTitle().buttonText}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Create;
