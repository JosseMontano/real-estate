import { useState } from "react";

type ParamsType = {};
export const Side = ({}: ParamsType) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-full lg:w-1/4 xl:w-1/5 p-4 fixed lg:static transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Overview
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Analytics
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Botón para mostrar/ocultar el sidebar en pantallas pequeñas */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden bg-blue-500 text-white p-2 rounded-full m-4 fixed top-4 left-4 z-50"
      >
        {isSidebarOpen ? "Cerrar" : "Abrir"} Menú
      </button>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 ml-0 lg:ml-auto">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign Out
          </button>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards */}
          <div className="bg-white shadow p-6 rounded-lg">Card 1</div>
          <div className="bg-white shadow p-6 rounded-lg">Card 2</div>
          <div className="bg-white shadow p-6 rounded-lg">Card 3</div>
        </section>
      </main>
    </div>
  );
};
