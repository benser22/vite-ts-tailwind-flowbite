import { useStylesStore } from "@/lib/stores";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun,
  FaTimes,
} from "react-icons/fa";

export const Nav = () => {
  const { theme, setTheme } = useStylesStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopServicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        servicesOpen &&
        desktopServicesRef.current &&
        !desktopServicesRef.current.contains(target) &&
        !menuOpen
      ) {
        setServicesOpen(false);
      }

      if (
        menuOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !menuButtonRef.current.contains(target)
      ) {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, servicesOpen]);

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const handleMobileServicesToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Features
          </a>

          {/* Desktop Services Dropdown */}
          <div className="relative" ref={desktopServicesRef}>
            <button
              onClick={() => setServicesOpen((prev) => !prev)}
              className="flex items-center text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Services
              {servicesOpen ? (
                <FaChevronUp className="ml-1 mt-1 w-3 h-3" />
              ) : (
                <FaChevronDown className="ml-1 mt-1 w-3 h-3" />
              )}
            </button>
            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                {["Consulting", "Development", "Design"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors first:rounded-t-md last:rounded-b-md"
                    onClick={() => setServicesOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </a>

          {/* Desktop Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "light" ? (
              <FaMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <FaSun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center md:hidden space-x-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "light" ? (
              <FaMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <FaSun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => {
              setMenuOpen((prev) => !prev);
              if (!menuOpen) {
                setServicesOpen(false);
              }
            }}
            aria-label="Toggle Menu"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {menuOpen ? (
              <FaTimes className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col p-4 space-y-1 flex-1">
            <a
              href="#"
              className="px-3 py-3 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={handleMobileLinkClick}
            >
              Home
            </a>

            <a
              href="#"
              className="px-3 py-3 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={handleMobileLinkClick}
            >
              Features
            </a>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={handleMobileServicesToggle}
                className="w-full flex justify-between items-center px-3 py-3 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <span>Services</span>
                {servicesOpen ? (
                  <FaChevronUp className="w-4 h-4" />
                ) : (
                  <FaChevronDown className="w-4 h-4" />
                )}
              </button>

              {servicesOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {["Consulting", "Development", "Design"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors"
                      onClick={handleMobileLinkClick}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#"
              className="px-3 py-3 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={handleMobileLinkClick}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
};
