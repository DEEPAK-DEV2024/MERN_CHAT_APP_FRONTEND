import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import ProfileContainer from "./ProfileContainer";
import Drawer from "./Drawer";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setChatLoading] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center bg-white absolute top-0 left-0 py-2 px-4">
        <div className="relative flex items-center ">
          <button
            onClick={() => setIsDrawerOpen(true)}
            data-tooltip-id="search-tooltip"
            data-tooltip-content="Search"
            data-tooltip-place="bottom-end"
            className="flex items-center p-2 bg-slate-200 text-black rounded-md hover:bg-slate-300 transition duration-300 focus:outline-none shadow-md"
          >
            <FaSearch className="text-md font-medium mr-2" />
            <span className="text-lg font-medium">Search User</span>
          </button>
          <Tooltip
            id="search-tooltip"
            className="bg-gray-800 text-white p-2 rounded-md text-sm shadow-lg"
            place="bottom-end"
            effect="solid"
            aria-live="assertive"
          />
        </div>
        <div className="text-xl font-normal text-center p-2 text-black hidden md:block">
          Talk To Everyone
        </div>
        <div className="relative flex items-center">
          <ProfileContainer />
        </div>
      </div>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        search={search}
        setSearch={setSearch}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
    </>
  );
};

export default Navbar;
