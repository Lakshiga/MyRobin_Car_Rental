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
    <Box className="space-y-8">
      {/* Header */}
      <Box>
        <Typography variant="h3" className="!font-bold !text-slate-900">
          My Profile
        </Typography>
        <Typography variant="body1" className="!text-slate-600 !mt-1">
          Manage your account information and preferences
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card className="!rounded-2xl !shadow-lg !overflow-hidden">
        {/* Header Section */}
        <Box className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
          <Grid container spacing={3} alignItems="center">
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
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-slate-200">
          {stats.map((stat, index) => (
            <Box key={index} className="text-center">
              <Typography variant="h4" className="!font-bold !text-slate-900">
                {stat.value}
              </Typography>
              <Typography variant="body2" className="!text-slate-500 !mt-1">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Form Section */}
        <CardContent className="!p-8 space-y-6">
          <Typography variant="h5" className="!font-bold !text-slate-900">
            Personal Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <Person className="!text-slate-500" />
                <Typography variant="subtitle2" className="!font-semibold !text-slate-700">
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
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-50 rounded-xl">
                  <Typography variant="body1" className="!text-slate-900">
                    {formData.name}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <Email className="!text-slate-500" />
                <Typography variant="subtitle2" className="!font-semibold !text-slate-700">
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
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-50 rounded-xl">
                  <Typography variant="body1" className="!text-slate-900">
                    {formData.email}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <Phone className="!text-slate-500" />
                <Typography variant="subtitle2" className="!font-semibold !text-slate-700">
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
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-50 rounded-xl">
                  <Typography variant="body1" className="!text-slate-900">
                    {formData.phone}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex items-center gap-2 mb-2">
                <CreditCard className="!text-slate-500" />
                <Typography variant="subtitle2" className="!font-semibold !text-slate-700">
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
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-50 rounded-xl">
                  <Typography variant="body1" className="!text-slate-900">
                    {formData.licenseNumber}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box className="flex items-center gap-2 mb-2">
                <Home className="!text-slate-500" />
                <Typography variant="subtitle2" className="!font-semibold !text-slate-700">
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
                />
              ) : (
                <Box className="px-4 py-3 bg-slate-50 rounded-xl">
                  <Typography variant="body1" className="!text-slate-900">
                    {formData.address}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="!rounded-2xl !shadow-lg">
        <CardContent className="!p-8">
          <Typography variant="h5" className="!font-bold !text-slate-900 !mb-6">
            Preferences
          </Typography>
          <Box className="space-y-4">
            <Box className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <Box>
                <Typography variant="subtitle1" className="!font-semibold !text-slate-900">
                  Email Notifications
                </Typography>
                <Typography variant="body2" className="!text-slate-500">
                  Receive updates about your bookings
                </Typography>
              </Box>
              <FormControlLabel control={<Switch defaultChecked />} label="" className="!m-0" />
            </Box>
            <Box className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <Box>
                <Typography variant="subtitle1" className="!font-semibold !text-slate-900">
                  SMS Notifications
                </Typography>
                <Typography variant="body2" className="!text-slate-500">
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
