import React, { useContext } from "react";
import { useNavigate } from "react-router";

import logo from "@/assets/logo.png";
import AuthContext from "@/context/AuthContext";
import GlobalContext from "@/context/GlobalContext";
import { dayjs } from "@/lib/dayjs";

const CalenderHeader: React.FC = () => {
  const history = useNavigate();
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { signout } = useContext(AuthContext);

  return (
    <header className="flex items-center py-2 px-4">
      <img src={logo} alt="calender logo" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl font-bold text-gray-500">Calender</h1>
      <button onClick={handleReset} className="py-2 px-4 mr-5 rounded border">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="mx-2 text-gray-600 cursor-pointer material-icons-outlined">chevron_left</span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="mx-2 text-gray-600 cursor-pointer material-icons-outlined">chevron_right</span>
      </button>
      <h2 className="ml-4 text-xl font-bold text-gray-500">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <ul className="flex px-4 ml-auto space-x-12 font-semibold font-heading">
        <li>
          <p className="font-bold text-gray-500 cursor-pointer" onClick={() => history.push("/")}>
            Home
          </p>
        </li>
        <li>
          <p
            className="font-bold text-gray-500 cursor-pointer"
            target="_blank"
            onClick={() => signout(() => history.push("/"))}
          >
            Sign out
          </p>
        </li>
      </ul>
    </header>
  );
};

export default CalenderHeader;
