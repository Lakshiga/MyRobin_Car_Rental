"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  Dashboard,
  DirectionsCar,
  BookOnline,
  People,
  Assessment,
  Logout,
  Menu,
  Notifications,
  ExpandMore,
  ExpandLess,
  Add,
  Article,
  Description,
  Slideshow,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  submenu?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: Dashboard },
  {
    label: "Create",
    icon: Add,
    submenu: [
      { href: "/admin/cars/new", label: "Article" },
      { href: "/admin/cars/new", label: "Document" },
      { href: "/admin/cars/new", label: "Slides" },
    ],
  },
  { href: "/admin/cars", label: "Cars", icon: DirectionsCar },
  { href: "/admin/bookings", label: "Bookings", icon: BookOnline },
  { href: "/admin/customers", label: "Customers", icon: People },
  { href: "/admin/reports", label: "Reports", icon: Assessment },
];

const drawerWidth = 280;
const collapsedWidth = 80;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    // Save to localStorage
    localStorage.setItem("sidebarCollapsed", String(newCollapsed));
    // Dispatch custom event
    window.dispatchEvent(new Event("sidebarToggle"));
    // Close all submenus when collapsing
    if (!newCollapsed) {
      setOpenSubmenus({});
    }
  };

  useEffect(() => {
    // Load collapsed state from localStorage
    const savedCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    setCollapsed(savedCollapsed);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleSubmenu = (label: string) => {
    if (collapsed) return;
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const resetSubmenus = () => {
    Object.keys(openSubmenus).forEach((key) => {
      if (openSubmenus[key]) {
        const submenuEl = submenuRefs.current[key];
        if (submenuEl) {
          submenuEl.style.height = "0";
        }
      }
    });
  };

  useEffect(() => {
    Object.keys(openSubmenus).forEach((key) => {
      const submenuEl = submenuRefs.current[key];
      if (submenuEl) {
        if (openSubmenus[key]) {
          const ul = submenuEl.querySelector("ul");
          if (ul) {
            submenuEl.style.height = `${ul.scrollHeight}px`;
          }
        } else {
          submenuEl.style.height = "0";
        }
      }
    });
  }, [openSubmenus]);

  const handleNavClick = (item: NavItem) => {
    if (item.submenu) {
      if (!collapsed) {
        toggleSubmenu(item.label);
      }
    } else if (item.href) {
      resetSubmenus();
      router.push(item.href);
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box className={`h-full flex flex-col sidebar-container ${collapsed ? "collapsed" : ""}`}>
      {/* Logo Header */}
      <Box className="sidebar-header">
        {!collapsed && (
          <Box className="flex items-center gap-3">
            <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg">
              <Typography className="!text-xl !font-bold">M</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="!font-bold !text-white">
                MyRobin
              </Typography>
              <Typography variant="caption" className="!text-white/70">
                Car Rental
              </Typography>
            </Box>
          </Box>
        )}
        {collapsed && (
          <Box className="flex items-center justify-center">
            <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg">
              <Typography className="!text-xl !font-bold">M</Typography>
            </Box>
          </Box>
        )}
        {user && !collapsed && (
          <Box className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm">
            <Avatar className="!h-10 !w-10 !bg-gradient-to-br !from-blue-500 !to-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box className="flex-1 min-w-0">
              <Typography variant="body2" className="!font-semibold !text-white !truncate">
                {user.name}
              </Typography>
              <Typography variant="caption" className="!text-white/70 !truncate">
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}
        {user && collapsed && (
          <Box className="flex items-center justify-center mt-4">
            <Avatar className="!h-10 !w-10 !bg-gradient-to-br !from-blue-500 !to-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        )}
        {/* Collapse Toggle Button */}
        <Box className="mt-4 flex justify-end">
          <IconButton
            onClick={handleCollapseToggle}
            className="!text-white/70 hover:!bg-white/10 !p-2"
            size="small"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
      </Box>

      {/* Navigation */}
      <Box className="flex-1 overflow-y-auto p-4">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasSubmenu = !!item.submenu;
            const isSubmenuOpen = openSubmenus[item.label];
            const isItemActive = item.href ? isActive(item.href) : false;

            const buttonContent = (
              <>
                <Icon className="sidebar-icon" />
                {!collapsed && (
                  <>
                    <Typography className="sidebar-text">{item.label}</Typography>
                    {hasSubmenu && (
                      <Box className="sidebar-chevron">
                        {isSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    )}
                  </>
                )}
              </>
            );

            return (
              <li key={item.label} className="sidebar-nav-item">
                {collapsed ? (
                  <Tooltip title={item.label} placement="right" arrow>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item)}
                      className={`sidebar-button ${isItemActive ? "active" : ""}`}
                    >
                      {buttonContent}
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`sidebar-button ${isItemActive ? "active" : ""}`}
                  >
                    {buttonContent}
                  </button>
                )}
                {hasSubmenu && !collapsed && (
                  <div
                    ref={(el) => {
                      submenuRefs.current[item.label] = el;
                    }}
                    className="sub-menu"
                  >
                    <ul>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.label}>
                          <button
                            type="button"
                            onClick={() => {
                              router.push(subItem.href);
                              setMobileOpen(false);
                            }}
                            className="sub-menu-button"
                          >
                            {subItem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Box>

      {/* Logout */}
      <Box className="p-4 border-t border-white/10">
        {collapsed ? (
          <Tooltip title="Logout" placement="right" arrow>
            <button
              type="button"
              onClick={handleLogout}
              className="sidebar-button logout-button"
            >
              <Logout className="sidebar-icon" />
            </button>
          </Tooltip>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-button logout-button"
          >
            <Logout className="sidebar-icon" />
            <Typography className="sidebar-text">Logout</Typography>
          </button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <style jsx global>{`
        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: ${drawerWidth}px;
          border-radius: 0;
          padding: 0;
          background: rgb(0 0 0 / 19%);
          backdrop-filter: blur(30px);
          transition: width 0.4s ease;
          z-index: 1200;
        }

        .sidebar-container.collapsed {
          width: ${collapsedWidth}px;
        }

        .sidebar-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: auto;
          padding: 24px;
          padding-top: 24px;
          border-bottom: 1px solid rgb(255 255 255 / 8%);
        }

        .sidebar-container.collapsed .sidebar-header {
          align-items: center;
        }

        .sidebar-nav-list {
          display: grid;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .sidebar-nav-item {
          margin-bottom: 4px;
        }

        .sidebar-button {
          position: relative;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: ${collapsed ? "center" : "flex-start"};
          height: 48px;
          width: 100%;
          border-radius: 12px;
          font-family: inherit;
          font-size: 14px;
          padding: 0 ${collapsed ? "0" : "16px"};
          background: transparent;
          border: 0;
          cursor: pointer;
          color: rgb(255 255 255 / 95%);
          transition: all 0.3s;
        }

        .sidebar-container.collapsed .sidebar-button {
          padding: 0;
          justify-content: center;
        }

        .sidebar-button:hover:not(.active) {
          background: rgb(0 0 0 / 5%);
        }

        .sidebar-button.active {
          background: rgb(0 0 0 / 15%);
        }

        .sidebar-icon {
          font-size: 20px;
          width: 20px;
          max-width: 20px;
          min-width: 20px;
          transition: 0.3s;
        }

        .sidebar-text {
          flex: 1 1 auto;
          font-weight: 500;
          text-align: left;
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s;
        }

        .sidebar-container.collapsed .sidebar-text {
          opacity: 0;
          width: 0;
          overflow: hidden;
        }

        .sidebar-chevron {
          font-size: 18px;
          transition: transform 0.3s;
        }

        .sidebar-container.collapsed .sidebar-chevron {
          display: none;
        }

        .sub-menu {
          position: relative;
          overflow: hidden;
          height: 0;
          transition: height 0.5s ease;
        }

        .sub-menu ul {
          position: absolute;
          top: 0;
          left: 0;
          display: grid;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .sub-menu-button {
          padding: 12px 16px 12px 48px;
          background: transparent;
          border: 0;
          color: rgb(255 255 255 / 80%);
          cursor: pointer;
          text-align: left;
          font-size: 13px;
          border-radius: 8px;
          transition: all 0.2s;
          position: relative;
        }

        .sub-menu-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 22.5px;
          translate: 0 -50%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgb(255 255 255 / 35%);
        }

        .sub-menu-button:hover {
          background: rgb(0 0 0 / 5%);
          color: rgb(255 255 255 / 95%);
        }

        .logout-button {
          border: 1px solid rgb(255 255 255 / 10%);
        }

        .logout-button:hover {
          background: rgb(239 68 68 / 20%);
          border-color: rgb(239 68 68 / 30%);
        }

        @media (max-width: 768px) {
          .sidebar-container {
            width: 280px;
          }
          .sidebar-container.collapsed {
            width: 280px;
          }
        }
      `}</style>

      {/* Mobile App Bar */}
      <AppBar
        position="fixed"
        className="!bg-slate-900/95 !backdrop-blur-lg !shadow-lg md:!hidden"
        elevation={0}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerToggle} className="!text-white">
            <Menu />
          </IconButton>
          <Box className="flex items-center gap-2 ml-4">
            <Box className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
              M
            </Box>
            <Typography variant="h6" className="!font-bold !text-white">
              MyRobin
            </Typography>
          </Box>
          <Box className="flex-1" />
          <IconButton className="!text-white">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Desktop Sidebar */}
      <Box className="hidden md:block">{drawer}</Box>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <Box
          className="md:hidden fixed inset-0 z-40"
          onClick={handleDrawerToggle}
        >
          <Box
            className="absolute inset-y-0 left-0"
            onClick={(e) => e.stopPropagation()}
          >
            {drawer}
          </Box>
        </Box>
      )}
    </>
  );
}
