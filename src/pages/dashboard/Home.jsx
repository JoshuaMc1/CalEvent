import { HiCalendarDays } from "react-icons/hi2";
import Event from "../../components/Event";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getEvents } from "../../services/event";
import { useQuery } from "react-query";

const Home = () => {
  const { token } = useOutletContext();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { data, isLoading } = useQuery(
    ["events"],
    async () => await getEvents(token)
  );

  const handlePriorityLow = () => {
    const lowPriorityEvents = events.filter((event) => event?.priority === 3);
    setFilteredEvents(lowPriorityEvents);
  };

  const handlePriorityMedium = () => {
    const mediumPriorityEvents = events.filter(
      (event) => event?.priority === 2
    );
    setFilteredEvents(mediumPriorityEvents);
  };

  const handlePriorityHigh = () => {
    const highPriorityEvents = events.filter((event) => event?.priority === 1);
    setFilteredEvents(highPriorityEvents);
  };

  const handleResetFilter = () => {
    setFilteredEvents([]);
  };

  useEffect(() => {
    if (!isLoading) {
      setEvents(data.data);
      setFilteredEvents([]);
    }
  }, [data, isLoading]);

  const displayedEvents = filteredEvents.length > 0 ? filteredEvents : events;

  return (
    <>
      <div className="bg-primary rounded-lg shadow-lg p-6">
        <h1 className="flex flex-row items-center text-3xl font-bold text-white">
          <HiCalendarDays className="mr-2" /> Eventos
        </h1>
      </div>
      <div className="bg-primary rounded-lg shadow-lg p-6 mt-3">
        <h2 className="text-2xl font-bold text-white mb-4">
          Filtrar por prioridad
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="px-4 py-2 text-white font-semibold bg-secondary rounded-lg shadow-lg hover:bg-emerald-400 transition-colors"
            onClick={handlePriorityLow}
          >
            Prioridad Baja
          </button>
          <button
            className="px-4 py-2 text-white font-semibold bg-secondary rounded-lg shadow-lg hover:bg-emerald-400 transition-colors"
            onClick={handlePriorityMedium}
          >
            Prioridad Media
          </button>
          <button
            className="px-4 py-2 text-white font-semibold bg-secondary rounded-lg shadow-lg hover:bg-emerald-400 transition-colors"
            onClick={handlePriorityHigh}
          >
            Prioridad Alta
          </button>
          <button
            className="px-4 py-2 text-white font-semibold bg-secondary rounded-lg shadow-lg hover:bg-emerald-400 transition-colors"
            onClick={handleResetFilter}
          >
            Reiniciar filtro
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-3">
        {displayedEvents.length > 0
          ? displayedEvents.map((event, index) => (
              <Event key={index} event={event} optionsDisabled={false} />
            ))
          : !isLoading && (
              <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 h-96 bg-primary rounded-lg shadow-lg p-6 flex flex-col gap-4 justify-center items-center">
                <span className="text-2xl font-bold text-white text-center">
                  Aún no hay eventos.
                </span>
                <Link
                  className="px-4 py-2 text-white font-semibold bg-secondary rounded-lg shadow-lg hover:bg-emerald-400 transition-colors"
                  to="/dashboard/create"
                >
                  Crear un nuevo evento
                </Link>
              </div>
            )}
      </div>
    </>
  );
};

export default Home;
