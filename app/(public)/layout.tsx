"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Badge,
} from "@mui/material";
import {
  Menu,
  Notifications,
  Person,
  Home,
  DirectionsCar,
  BookOnline,
} from "@mui/icons-material";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cars", label: "Cars", icon: DirectionsCar },
  { href: "/bookings", label: "Bookings", icon: BookOnline },
  { href: "/profile", label: "Profile", icon: Person },
];

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignIn = () => {
    router.push("/auth/signin");
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* App Bar */}
      <AppBar
        position="sticky"
        className="!bg-slate-900/95 !backdrop-blur-lg !shadow-lg !border-b !border-white/10"
        elevation={0}
      >
        <Toolbar className="!px-4 md:!px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg">
              M
            </Box>
            <Typography
              variant="h6"
              className="!font-bold !text-white"
            >
              MyRobin
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <Box className="hidden md:flex items-center gap-1 ml-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.href}
                  href={link.href}
                  component={Link}
                  startIcon={<Icon />}
                  className={`!rounded-xl !px-4 !py-2 !transition-all ${
                    isActive(link.href)
                      ? "!bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white !shadow-md"
                      : "!text-white/70 hover:!bg-white/10"
                  }`}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>

          <Box className="flex-1" />

          {/* Right Side Actions */}
          <Box className="hidden md:flex items-center gap-2">
            <IconButton className="!text-white/70 hover:!bg-white/10">
              <Badge badgeContent={3} color="error">
                <Notifications className="!text-white" />
              </Badge>
            </IconButton>
            <Button
              variant="contained"
              onClick={handleSignIn}
              className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-lg !rounded-xl"
            >
              Sign In
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            className="!text-white md:!hidden"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#1e293b",
            width: 256,
          },
        }}
      >
        <Box className="w-64 p-4">
          <Box className="flex items-center gap-2 mb-6">
            <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">
              M
            </Box>
            <Typography variant="h6" className="!font-bold !text-white">
              MyRobin
            </Typography>
          </Box>
          <List>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <ListItem key={link.href} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={link.href}
                    onClick={handleDrawerToggle}
                    className={`!rounded-xl !mb-1 ${
                      isActive(link.href) ? "!bg-blue-500/20" : ""
                    }`}
                  >
                    <ListItemIcon className={isActive(link.href) ? "!text-blue-400 !min-w-0 !mr-3" : "!text-white/70 !min-w-0 !mr-3"}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={link.label}
                      className={isActive(link.href) ? "!text-blue-400 !font-semibold" : "!text-white/70"}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box className="mt-4 space-y-2">
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleSignIn();
                handleDrawerToggle();
              }}
              className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !rounded-xl"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <Box className="bg-slate-900/50 border-t border-white/10 text-white mt-20">
        <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Box>
              <Box className="flex items-center gap-2 mb-4">
                <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white font-bold">
                  M
                </Box>
                <Typography variant="h6" className="!font-bold !text-white">
                  MyRobin
                </Typography>
              </Box>
              <Typography variant="body2" className="!text-white/70">
                Your trusted car rental partner. Premium vehicles, flexible plans, and exceptional
                service.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="!font-semibold !mb-4 !text-white">
                Quick Links
              </Typography>
              <Box className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-white/70 hover:text-white transition text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" className="!font-semibold !mb-4 !text-white">
                Contact
              </Typography>
              <Box className="space-y-2 text-sm text-white/70">
                <Typography>Email: support@myrobin.com</Typography>
                <Typography>Phone: +1 (555) 123-4567</Typography>
                <Typography>24/7 Customer Support</Typography>
              </Box>
            </Box>
          </Box>
          <Box className="border-t border-white/10 mt-8 pt-8 text-center">
            <Typography variant="body2" className="!text-white/70">
              &copy; 2025 MyRobin. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
