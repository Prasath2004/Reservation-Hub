import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import Profile from "../profile/Profile";
import Dropdown from "../DropdownProfile/Dropdown";

const Navbar = () => {

  const { user } = useContext(AuthContext)
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div className="text-white font-bold bg-sky-950 h-[200px] ">
      <div className="flex justify-between mr-[40px] -mb-[10px]">
        <Link to="/">
          <h1 className="text-4xl ml-10 ">Reservation Hub</h1>

        </Link>
        {user ?
          (<div onClick={() => setOpenProfile
            ((prev) => !prev)}> <img src={user.img} alt='' className="w-[30px] h-[30px] rounded-[50%]" /></div>)
          : (<div >
            <Link to={"/register"}>
              <button className="px-4 py-2 m-4  text-sm text-white-600 font-semibold rounded-full border border-purple-200 text-blue-950	 bg-white  focus:ring-2 focus:ring-offset-2">
                Register
              </button>
            </Link>
            <Link to={"/login"}>
              <button className="px-4 py-2  m-4  text-sm text-white-600 font-semibold rounded-full border border-purple-200 text-blue-950 bg-white  focus:ring-2 focus:ring-offset-2">
                Login
              </button>
            </Link>
          </div>)}

      </div>

      <div className="mt-[15px] ml-[40px]">
        <FontAwesomeIcon icon={faBed} />
        <span>Hotel Rooms</span>
      </div>
      {
        openProfile && <Dropdown setOpenProfile={setOpenProfile} />
      }

    </div>

  );
};

export default Navbar;
