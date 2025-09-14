// src/App.tsx
import { NavLink, Outlet } from 'react-router-dom';

export default function App() {
  const activeLinkStyle = {
    backgroundColor: '#9333ea', // Cor roxa-600 do Tailwind
    color: 'white',
  };

  return (
    <main className="bg-gray-200 min-h-screen flex flex-col items-center justify-start font-sans p-4 pt-10">
      <nav className="bg-white p-2 rounded-xl shadow-md mb-8 flex gap-2">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="px-4 py-2 rounded-lg font-bold transition-colors"
        >
          Calculadora de Idade
        </NavLink>
        <NavLink
          to="/evento-futuro"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="px-4 py-2 rounded-lg font-bold transition-colors"
        >
          Contagem para Evento
        </NavLink>
      </nav>
      {/* As páginas serão renderizadas aqui */}
      <Outlet />
    </main>
  );
}