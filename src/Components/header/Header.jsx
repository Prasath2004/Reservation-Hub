import React from "react";
import "./header.css";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns"
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const Header = (type) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

const {dispatch}=useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate("/hotel", { state: { destination, dates, options } });
  };
  return (
    <>
      <div className="bg-sky-950	h-[220px]">
        <div className={type === "list" ? "headerContainer listMode" : "headerContaine"}>
          <div className="flex-1 justify-center content-center text-white font-bold ml-10 mb-200 -mt-20 ">
            {/* <div className="bord">
              <FontAwesomeIcon icon={faBed} />
              <span>Hotel Rooms</span>
            </div> */}
            <h1 className="text-4xl mt-10">
              A Easy step to stay away from Home!
            </h1>
            <br />
            <p>
              To unlock your Discounts click below{" "}
              <FontAwesomeIcon icon={faHandPointDown} />
            </p>
            <br />
            <Link to={'/login'}>
           {!user && <button className="px-4 py-1 m-1 p-[5px] -mr-100 text-sm text-white-600 font-semibold rounded-full border border-purple-200 text-blue-950	 bg-white  focus:ring-2 focus:ring-offset-2">
              Sign in/Register
            </button>}
            </Link>
          </div>
        </div>


        <div className="headerSearch">
          <div className="SearchItems">
            <FontAwesomeIcon icon={faBed} />
            <input
              type="text"
              placeholder="Where are you going"
              className="headerSearchInput"
              onChange={e => setDestination(e.target.value)}
            />
          </div>
          <div className="SearchItems">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span onClick={() => setOpenDate(!openDate)}>{`${format(
              dates[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="SearchItems">
            <FontAwesomeIcon icon={faPerson} />
            <span
              onClick={() => setOpenOptions(!openOptions)}
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>

            {openOptions && <div className="options">
              <div className="w-[200px] flex justify-between m-10 ">
                <span>Adult</span>
                <div className="flex items-center	gap-[10px]">
                  <button className="ton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                  <span>{options.adult}</span>
                  <button className="ton" onClick={() => handleOption("adult", "i")}>+</button>
                </div>
              </div>
              <div className="w-[200px] flex justify-between	m-10	">
                <span>Children</span>
                <div className="flex items-center	gap-[10px]">
                  <button className="ton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                  <span>{options.children}</span>
                  <button className="ton" onClick={() => handleOption("children", "i")}>+</button>
                </div>
              </div>
              <div className="w-[200px] flex justify-between	m-10	">
                <span>Room</span>
                <div className="flex items-center	gap-[10px]">
                  <button className="ton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                  <span>{options.room}</span>
                  <button className="ton" onClick={() => handleOption("room", "i")}>+</button>
                </div>
              </div>
            </div>}
          </div>
          <div className="SearchItems">
            <button className="buton" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
