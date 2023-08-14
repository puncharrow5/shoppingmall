import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Sections/NavItem";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [menu, setMenu] = useState(true);

  const handleMenu = () => {
    // !menu는 토글 방식(true 일 경우엔 false, false일 경우엔 true)
    setMenu(!menu);
  };

  return (
    <section className="relative z-10 text-white bg-gray-900 py-1">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          {/* Logo */}
          <div className="flex items-center text-2xl h-14">
            <Link to="/">Logo</Link>
          </div>

          {/* Menu Buttons */}
          <div className="text-2xl sm:hidden">
            <button onClick={handleMenu}>
              <GiHamburgerMenu />
            </button>
          </div>

          {/* big screen */}
          <div className="hidden sm:block">
            <NavItem />
          </div>
        </div>

        {/* mobile screen */}
        <div className="block sm:hidden ">{menu && <NavItem mobile />}</div>
      </div>
    </section>
  );
};

export default Navbar;
