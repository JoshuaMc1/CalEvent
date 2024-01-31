import { HiX } from "react-icons/hi";

const ViewEvent = ({ event, setOpenModal, openModal }) => {
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const getPriority = () => {
    switch (event.priority) {
      case 1:
        return "Alta";
      case 2:
        return "Media";
      case 3:
        return "Baja";
      default:
        return "Default";
    }
  };

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-black">
          <div className="relative bg-primary rounded-lg p-8 max-w-3xl mx-auto w-200 shadow-lg">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
              onClick={handleOpenModal}
            >
              <HiX size={24} />
            </button>
            <div className="grid grid-cols-2 mb-4 gap-3">
              <div className="col-span-2 md:col-span-1 flex">
                {event?.photo !== null ? (
                  <img
                    className="w-full h-auto object-cover rounded-lg"
                    src={event?.photo}
                    alt={event?.title}
                  />
                ) : (
                  <div className="w-full h-auto rounded-lg flex items-center justify-center border border-white bg-secondary hover:bg-emerald-500">
                    <span className="text-gray-200 font-semibold">
                      Este evento no tiene imagen
                    </span>
                  </div>
                )}
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="col-span-2">
                    <span
                      className="text-gray-200 font-semibold"
                      title="Título del evento"
                    >
                      Título
                    </span>
                    <p className="text-gray-300 text-sm">{event?.title}</p>
                  </div>
                  <div className="col-span-2">
                    <span
                      className="text-gray-200 font-semibold"
                      title="Descripción del evento"
                    >
                      Descripción
                    </span>
                    <p className="text-gray-300 text-sm">
                      {event?.description !== null
                        ? event?.description
                        : "El evento no tiene descripción."}
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-gray-200 font-semibold"
                      title="Fecha de inicio del evento"
                    >
                      Fecha de inicio
                    </span>
                    <p className="text-gray-300 text-sm">{event?.start}</p>
                  </div>
                  <div>
                    <span
                      className="text-gray-200 font-semibold"
                      title="Fecha de fin del evento"
                    >
                      Fecha de fin
                    </span>
                    <p className="text-gray-300 text-sm">{event?.end}</p>
                  </div>
                  <div className="col-span-2">
                    <span
                      className="text-gray-200 font-semibold"
                      title="Ubicación del evento"
                    >
                      Ubicación
                    </span>
                    <p className="text-gray-300 text-sm">
                      {event?.location !== null
                        ? event?.location
                        : "El evento no tiene ubicación."}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span
                      className="text-gray-200 font-semibold"
                      title="Prioridad del evento"
                    >
                      Prioridad
                    </span>
                    <p className="text-gray-300 text-sm">{getPriority()}</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenModal}
                  className="w-full text-white bg-secondary hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
                  type="button"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewEvent;
