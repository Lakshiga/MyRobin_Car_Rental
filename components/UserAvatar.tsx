"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Person,
  Settings,
  Logout,
  AdminPanelSettings,
  CameraAlt,
} from "@mui/icons-material";

export function UserAvatar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      alert('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to upload images');
        handleClose();
        return;
      }

      const response = await fetch('http://localhost:4001/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add auth header
        },
        body: formData, // Don't set Content-Type header - browser will set it with boundary for FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        // Update user with new image URL
        const updatedUser = { ...user, imageUrl: data.imageUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // You might want to update the user context here too
        // For now, just refresh the page to show the new image
        window.location.reload();
      } else {
        throw new Error('No image URL returned');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + (error.message || 'Unknown error'));
    }

    handleClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <IconButton
        onClick={handleMenu}
        size="small"
        className="!p-1 hover:!bg-white/10"
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          title={user.name}
        >
          {user.imageUrl ? (
            <img
              src={`http://localhost:4001${user.imageUrl}`}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            bgcolor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user.email}
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
          >
            {user.role === "ADMIN" ? (
              <>
                <AdminPanelSettings sx={{ fontSize: 12 }} />
                Admin
              </>
            ) : (
              "User"
            )}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={triggerFileInput}>
          <ListItemIcon>
            <CameraAlt fontSize="small" />
          </ListItemIcon>
          Upload Image
        </MenuItem>

        <MenuItem component="a" href="/profile">
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        {user.role === "ADMIN" && (
          <MenuItem component="a" href="/admin">
            <ListItemIcon>
              <AdminPanelSettings fontSize="small" />
            </ListItemIcon>
            Admin Panel
          </MenuItem>
        )}

        <MenuItem component="a" href="/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </Box>
  );
}
