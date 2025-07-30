import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HiMenu, HiChevronLeft, HiChevronRight } from "react-icons/hi"; // Heroicons

export default function Layout() {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on window resize (optional)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { to: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay sidebar */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-6 overflow-auto">
            <SidebarContent
              links={links}
              location={location}
              sidebarExpanded={true}
              onLinkClick={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white shadow-lg p-6 transition-all duration-300
          ${sidebarExpanded ? "w-64" : "w-[72px]"}`}
      >
        <SidebarContent
          links={links}
          location={location}
          sidebarExpanded={sidebarExpanded}
        />
        {/* Collapse/expand button */}
        <button
          className="mt-auto self-center p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
          onClick={() => setSidebarExpanded((v) => !v)}
          aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarExpanded ? <HiChevronLeft size={24} /> : <HiChevronRight size={24} />}
        </button>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Top navbar */}
        <header className="flex items-center bg-white shadow p-4 md:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
            aria-label="Open sidebar"
          >
            <HiMenu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">My App</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ links, location, sidebarExpanded, onLinkClick }) {
  return (
    <>
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onLinkClick}
              className={`
                flex items-center rounded-md transition
                ${sidebarExpanded ? "gap-3 p-2" : "w-10 h-10 justify-center"}
                ${isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}
              `}
            >
              <span className="text-xl flex-shrink-0">
                {icon}
              </span>
              {sidebarExpanded && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </>
  );
}


function DashboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4v11H3v-11zm7-4h4v15h-4V6zm7-6h4v21h-4V0z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
