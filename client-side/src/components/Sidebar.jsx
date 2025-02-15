import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, LogOut, reset } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const sidebarItems = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFFFF"
          class="w-8 h-8">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
      Title: "Dashboard",
      href: "/dashboard", // Add the href attribute for the first item
    },
  ];

  const adminSidebar = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFFFF"
          class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "Admin",
    },
  ];

  const adminContent = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
      Title: "Admin Dashboard",
      href: "/admin/dashboard", // Add the href attribute for the first item
    },
  ];

  const logoutButton = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF2B2B"
          class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "Logout",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(""); // Initialize the state with an empty string
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Replace 'userRoles' with the actual roles of the logged-in user from your application
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    // When the component mounts or the URL changes, update the selectedItem state
    setSelectedItem(window.location.pathname);
  }, []);

  const handleItemClick = (href) => {
    setSelectedItem(href);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="">
        <aside
          id="default-sidebar"
          class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0"
          aria-label="Sidebar">
          <div class="h-full px-3 py-4 overflow-y-auto bg-[#fefefe]">
            <a class="flex items-center pl-4 py-4 mb-5 text-black font-bold">
              EDII Applicant Management
            </a>
            <ul className="space-y-3 pl-2 font-bold">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg group ${
                      selectedItem === item.href ||
                      (selectedItem === "/admin/dashboard" &&
                        item.href === "/admin/dashboard")
                        ? "border-2 bg-[#dfeeff] border-[#84D8FF] text-[#268efe]"
                        : "text-[#777777] hover:bg-[#e5f7ff]"
                    }`}
                    onClick={() => handleItemClick(item.href)}>
                    {item.Icon}
                    <span className="ml-3">{item.Title}</span>
                  </a>
                </li>
              ))}

              {user && user.role_id === 2 && (
                <ul className="space-y-3 font-bold">
                  {adminSidebar.map((item, index) => (
                    <li key={index}>
                      <button
                        href={item.href}
                        className={`flex px-4 py-2 items-center w-full text-base text-[#777777] transition duration-75 rounded-lg group hover:bg-gray-100 ${
                          isDropdownOpen
                            ? "dark:hover:text-white dark:hover:bg-[#268efe]"
                            : "dark:text-[#777777] dark:group-hover:text-white"
                        }`}
                        onClick={toggleDropdown}>
                        {item.Icon}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {item.Title}
                        </span>
                        <svg
                          className={`w-4 h-4 ml-2 ${
                            isDropdownOpen ? "rotate-180" : ""
                          } transition-transform`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 8 4">
                          <path
                            d="M1 1l2 2 2-2"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}

                  <ul
                    className={`${
                      isDropdownOpen
                        ? "block bg-[#f7f7fb]  rounded-lg"
                        : "hidden"
                    } py-2 space-y-2`}>
                    {adminContent.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className={`flex items-center px-4 py-2 rounded-lg group ${
                            selectedItem === item.href ||
                            (selectedItem === "/admin/dashboard" &&
                              item.href === "/admin/dashboard")
                              ? "border-2 bg-[#dfeeff] border-[#84D8FF] text-[#268efe]"
                              : "text-[#777777] hover:bg-[#e5f7ff]"
                          }`}
                          onClick={() => handleItemClick(item.href)}>
                          {item.Icon}
                          <span className="ml-3">{item.Title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </ul>
              )}

              {logoutButton.map((item, index) => (
                <li key={index}>
                  <button
                    className="flex items-center w-full px-4 py-2 rounded-lg group text-[#777777] hover:bg-[#e5f7ff]"
                    onClick={logout}>
                    {item.Icon}
                    <span className="ml-3">{item.Title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
