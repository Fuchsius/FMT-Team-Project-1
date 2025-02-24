import React from "react";
import Logo from "../../assets/logo.png";
import { FaCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Courses",
    link: "/#services",
  },
  {
    id: 3,
    name: "Pages",
    link: "/#",
  },
  {
    id: 3,
    name: "Shop",
    link: "/#",
  },
  {
    id: 3,
    name: "Blog",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

const Navbar = () => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-white py-2">
        <div className="container flex justify-center items-center gap-10">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex">
              <img src={Logo} alt="Logo" className="w-20" />
            </a>
          </div>
          <div data-aos="zoom-in" className="flex justify-center">
            <ul className="sm:flex hidden items-center gap-4">
              {Menu.map((data) => (
                <li key={data.id} className="group relative cursor-pointer">
                  <a
                    href={data.link}
                   className="flex items-center gap-[2px] py-2"
                  >
                    {data.name}
                    <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                  </a>
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul>
                    {DropdownLinks.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                </li>
              ))}
              {/* Simple Dropdown and Links */}
            
            </ul>
          </div>
          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
              />
              <FaCircle className="text-blue-600 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-1 text-3xl" />
            </div>
            <FaCartShopping className="text-xl text-black drop-shadow-sm cursor-pointer" />
            <p style={{ fontSize: "10px" } }>$0.00</p>

            {/* order button */}
            <button
              onClick={() => alert("")}
              className="bg-gradient-to-r from-primary to-secondary transition-all 
              duration-200 text-white  py-1 px-4 rounded-full
              flex items-center gap-3
              group shadow-md shadow-black"
            >
              
              Get Started
            
              
            </button>

            {/* Darkmode Switch */}
            <div></div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
    </div>
  );
};

export default Navbar;
