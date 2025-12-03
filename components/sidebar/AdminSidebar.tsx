"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
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
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Dashboard },
  { href: "/admin/cars", label: "Cars", icon: DirectionsCar },
  { href: "/admin/bookings", label: "Bookings", icon: BookOnline },
  { href: "/admin/customers", label: "Customers", icon: People },
  { href: "/admin/reports", label: "Reports", icon: Assessment },
];

const drawerWidth = 280;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <Box className="h-full flex flex-col">
      {/* Logo */}
      <Box className="p-6 border-b border-slate-200">
        <Box className="flex items-center gap-3 mb-4">
          <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg">
            M
          </Box>
          <Box>
            <Typography variant="h6" className="!font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              MyRobin
            </Typography>
            <Typography variant="caption" className="!text-slate-500">
              Admin Panel
            </Typography>
          </Box>
        </Box>
        {user && (
          <Box className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
            <Avatar className="!h-10 !w-10 !bg-gradient-to-br !from-blue-500 !to-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box className="flex-1 min-w-0">
              <Typography variant="body2" className="!font-semibold !text-slate-900 !truncate">
                {user.name}
              </Typography>
              <Typography variant="caption" className="!text-slate-500 !truncate">
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Navigation */}
      <List className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.href} disablePadding className="mb-2">
              <ListItemButton
                component={Link}
                href={item.href}
                className={`!rounded-xl !px-4 !py-3 ${
                  isActive(item.href)
                    ? "!bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white !shadow-lg"
                    : "!text-slate-700 hover:!bg-slate-100"
                }`}
              >
                <ListItemIcon
                  className={
                    isActive(item.href) ? "!text-white !min-w-0 !mr-3" : "!text-slate-600 !min-w-0 !mr-3"
                  }
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  className={isActive(item.href) ? "!text-white" : ""}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout */}
      <Box className="p-4 border-t border-slate-200">
        <ListItemButton
          onClick={handleLogout}
          className="!rounded-xl !px-4 !py-3 !border-2 !border-rose-500 !bg-white !text-rose-600 hover:!bg-rose-50"
        >
          <ListItemIcon className="!text-rose-600 !min-w-0 !mr-3">
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile App Bar */}
      <AppBar
        position="fixed"
        className="!bg-white !shadow-md md:!hidden"
        elevation={0}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerToggle} className="!text-slate-700">
            <Menu />
          </IconButton>
          <Box className="flex items-center gap-2 ml-4">
            <Box className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
              M
            </Box>
            <Typography variant="h6" className="!font-bold !text-slate-900">
              MyRobin
            </Typography>
          </Box>
          <Box className="flex-1" />
          <IconButton className="!text-slate-700">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        className="!hidden md:!block"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e2e8f0",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="md:!hidden"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

