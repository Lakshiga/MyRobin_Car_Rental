"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Avatar,
  Chip,
  Grid,
} from "@mui/material";
import { Edit, Save, Cancel, Person, Email, Phone, Home, CreditCard } from "@mui/icons-material";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    licenseNumber: "DL-123456789",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const stats = [
    { label: "Total Bookings", value: "12", icon: "📅" },
    { label: "Active Bookings", value: "2", icon: "🚗" },
    { label: "Total Spent", value: "$4,850", icon: "💰" },
    { label: "Member Since", value: "Jan 2024", icon: "⭐" },
  ];

  return (
    <Box className="space-y-4 md:space-y-8 w-full">
      {/* Header */}
      <Box className="w-full">
        <Typography 
          variant="h3" 
          className="!font-bold !text-white !text-2xl sm:!text-3xl md:!text-4xl"
          sx={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
        >
          My Profile
        </Typography>
        <Typography 
          variant="body1" 
          className="!text-white/70 !mt-1 !text-sm md:!text-base"
          sx={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
        >
          Manage your account information and preferences
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card className="!rounded-2xl !shadow-xl !overflow-hidden !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
        {/* Header Section */}
        <Box className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 md:p-8 text-white">
          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} alignItems="center" sx={{ width: "100%" }}>
            <Grid item>
              <Avatar className="!h-24 !w-24 !bg-white/20 !text-white !text-3xl !font-bold !border-4 !border-white/30">
                JD
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" className="!font-bold !mb-1 !text-white">
                {formData.name}
              </Typography>
              <Typography variant="body1" className="!text-blue-100">
                {formData.email}
              </Typography>
              <Box className="mt-2">
                <Chip
                  label="Premium Member"
                  className="!bg-white/20 !text-white !font-semibold"
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item>
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                  className="!bg-white !text-blue-600 hover:!bg-blue-50 !shadow-lg"
                >
                  Edit Profile
                </Button>
              ) : (
                <Box className="flex gap-2">
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    className="!border-white !text-white hover:!bg-white/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    className="!bg-white !text-blue-600 hover:!bg-blue-50 !shadow-lg"
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Stats Grid */}
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-white/10 bg-slate-900/30">
          {stats.map((stat, index) => (
            <Box key={index} className="text-center">
              <Typography variant="h4" className="!font-bold !text-white">
                {stat.value}
              </Typography>
              <Typography variant="body2" className="!text-white/70 !mt-1">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Form Section */}
        <CardContent className="!p-8 space-y-6">
          <Typography variant="h5" className="!font-bold !text-white">
            Personal Information
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ width: "100%" }}>
            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <Person className="!text-white/50" />
                <Typography variant="subtitle2" className="!font-semibold !text-white/70">
                  Full Name
                </Typography>
              </Box>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  className="!rounded-xl"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(59, 130, 246, 0.5)",
                      },
                    },
                  }}
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-900/50 rounded-xl border border-white/10">
                  <Typography variant="body1" className="!text-white">
                    {formData.name}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <Email className="!text-white/50" />
                <Typography variant="subtitle2" className="!font-semibold !text-white/70">
                  Email Address
                </Typography>
              </Box>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  className="!rounded-xl"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(59, 130, 246, 0.5)",
                      },
                    },
                  }}
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-900/50 rounded-xl border border-white/10">
                  <Typography variant="body1" className="!text-white">
                    {formData.email}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <Phone className="!text-white/50" />
                <Typography variant="subtitle2" className="!font-semibold !text-white/70">
                  Phone Number
                </Typography>
              </Box>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  className="!rounded-xl"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(59, 130, 246, 0.5)",
                      },
                    },
                  }}
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-900/50 rounded-xl border border-white/10">
                  <Typography variant="body1" className="!text-white">
                    {formData.phone}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <CreditCard className="!text-white/50" />
                <Typography variant="subtitle2" className="!font-semibold !text-white/70">
                  License Number
                </Typography>
              </Box>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  className="!rounded-xl"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(59, 130, 246, 0.5)",
                      },
                    },
                  }}
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-900/50 rounded-xl border border-white/10">
                  <Typography variant="body1" className="!text-white">
                    {formData.licenseNumber}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box className="flex items-center gap-2 mb-2">
                <Home className="!text-white/50" />
                <Typography variant="subtitle2" className="!font-semibold !text-white/70">
                  Address
                </Typography>
              </Box>
              {isEditing ? (
                <TextField
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  className="!rounded-xl"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(59, 130, 246, 0.5)",
                      },
                    },
                  }}
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-900/50 rounded-xl border border-white/10">
                  <Typography variant="body1" className="!text-white">
                    {formData.address}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
        <CardContent className="!p-8">
          <Typography variant="h5" className="!font-bold !text-white !mb-6">
            Preferences
          </Typography>
          <Box className="space-y-4">
            <Box className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/10">
              <Box>
                <Typography variant="subtitle1" className="!font-semibold !text-white">
                  Email Notifications
                </Typography>
                <Typography variant="body2" className="!text-white/70">
                  Receive updates about your bookings
                </Typography>
              </Box>
              <FormControlLabel control={<Switch defaultChecked />} label="" className="!m-0" />
            </Box>
            <Box className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/10">
              <Box>
                <Typography variant="subtitle1" className="!font-semibold !text-white">
                  SMS Notifications
                </Typography>
                <Typography variant="body2" className="!text-white/70">
                  Get text alerts for important updates
                </Typography>
              </Box>
              <FormControlLabel control={<Switch />} label="" className="!m-0" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
