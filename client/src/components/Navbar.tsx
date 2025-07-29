// src/components/Navbar.tsx

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">
        🧠 AI Component Generator
      </h1>
      <span className="text-gray-600 text-sm">Built with React + Tailwind</span>
    </nav>
  );
};

export default Navbar;
