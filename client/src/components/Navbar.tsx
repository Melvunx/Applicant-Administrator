import { Typography } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      <ul className="flex w-full items-center bg-amber-400/20 justify-evenly px-3 py-5 font-title">
        <NavLink
          to="/Applicant-Administrator/"
          className={(nav) =>
            nav.isActive &&
            location.pathname !== "/Applicant-Administrator/archive"
              ? "italic bg-indigo-600/20 rounded-full hover:bg-indigo-600/30"
              : ""
          }
        >
          <Typography
            as="li"
            variant="lead"
            color="blue-gray"
            className="flex items-center p-2 font-medium transition-colors hover:text-indigo-900"
          >
            Offres
          </Typography>
        </NavLink>
        <NavLink
          to="/Applicant-Administrator/archive"
          className={(nav) =>
            nav.isActive
              ? "italic bg-green-600/20 rounded-full hover:bg-green-600/30"
              : ""
          }
        >
          <Typography
            as="li"
            variant="lead"
            color="green"
            className="flex items-center p-2 font-medium transition-colors hover:text-green-900"
          >
            Archives
          </Typography>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
