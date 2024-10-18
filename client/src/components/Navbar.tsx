import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul className="flex w-full items-center justify-evenly bg-slate-300 px-3 py-5">
        <NavLink
          to="/"
          className={(nav) =>
            nav.isActive ? "underline italic text-red-600" : "text-gray-600"
          }
        >
          <li>Offres</li>
        </NavLink>
        <NavLink
          to="/archive"
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
