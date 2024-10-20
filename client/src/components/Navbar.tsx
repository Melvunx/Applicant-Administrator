import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Récupère l'emplacement actuel

  return (
    <div>
      <ul className="flex w-full items-center justify-evenly bg-slate-300 px-3 py-5">
        <NavLink
          to="/Applicant-Administrator/"
          className={(nav) =>
            nav.isActive &&
            location.pathname !== "/Applicant-Administrator/archive"
              ? "underline italic text-red-600"
              : "text-gray-600"
          }
        >
          <li>Offres</li>
        </NavLink>
        <NavLink
          to="/Applicant-Administrator/archive"
          className={(nav) =>
            nav.isActive ? "underline italic text-red-600" : "text-gray-600"
          }
        >
          <li>Archives</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
