"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  FilterList,
  Add,
  Star,
  CheckCircle,
  Cancel,
  Edit,
  Delete,
} from "@mui/icons-material";

const cars = [
  {
    id: 1,
    name: "Tesla Model S",
    category: "Electric",
    price: 120,
    rating: 5.0,
    status: "Available",
    image: "🚗",
  },
  {
    id: 2,
    name: "Lamborghini Aventador",
    category: "Sports",
    price: 450,
    rating: 5.0,
    status: "Maintenance",
    image: "🏎️",
  },
  {
    id: 3,
    name: "Ferrari LaFerrari",
    category: "Supercar",
    price: 550,
    rating: 4.9,
    status: "Booked",
    image: "🏎️",
  },
  {
    id: 4,
    name: "Ferrari-FF",
    category: "Luxury",
    price: 380,
    rating: 4.5,
    status: "Booked",
    image: "🚙",
  },
  {
    id: 5,
    name: "BMW M8 Coupe",
    category: "Performance",
    price: 185,
    rating: 3.8,
    status: "Available",
    image: "🚗",
  },
  {
    id: 6,
    name: "BMW GTS3 M2",
    category: "Performance",
    price: 220,
    rating: 4.9,
    status: "Available",
    image: "🚗",
  },
];

const categories = ["All", "Available", "Maintenance", "Booked"];

export default function AdminCarsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory === "All" || car.status === selectedCategory;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddNew = () => {
    alert("Add new car functionality");
  };

  const handleEdit = (carId: number) => {
    alert(`Edit car ${carId}`);
  };

  const handleDelete = (carId: number) => {
    if (confirm("Are you sure you want to delete this car?")) {
      alert(`Car ${carId} deleted`);
    }
  };

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Box>
          <Typography variant="h3" className="!font-bold !text-white">
            Cars Management
          </Typography>
          <Typography variant="body1" className="!text-white/70 !mt-1">
            Manage your fleet of vehicles
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNew}
          className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-lg !rounded-xl"
        >
          Add New Car
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
        <CardContent className="!p-4">
          <Box className="flex flex-col sm:flex-row gap-4">
            <TextField
              fullWidth
              placeholder="Search your dream car"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="!text-white/50" />
                  </InputAdornment>
                ),
              }}
              className="!bg-slate-900/50"
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
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.4)",
                },
              }}
            />
            <Box className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "!bg-blue-500 !text-white !font-semibold"
                      : "!bg-slate-700/50 !text-white/70 hover:!bg-slate-700"
                  }
                  clickable
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Cars Grid */}
      <Grid container spacing={3}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} lg={4} key={car.id}>
            <Card className="!rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
              <Box className="relative">
                <Box className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 text-7xl rounded-t-2xl">
                  {car.image}
                </Box>
                <Chip
                  label={car.status}
                  size="small"
                  icon={car.status === "Available" ? <CheckCircle /> : <Cancel />}
                  className={`!absolute !top-3 !right-3 ${
                    car.status === "Available"
                      ? "!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30"
                      : car.status === "Maintenance"
                        ? "!bg-amber-500/20 !text-amber-400 !border !border-amber-500/30"
                        : "!bg-rose-500/20 !text-rose-400 !border !border-rose-500/30"
                  }`}
                />
              </Box>
              <CardContent className="!p-4">
                <Typography variant="h6" className="!font-bold !text-white !mb-2">
                  {car.name}
                </Typography>
                <Box className="flex items-center justify-between mb-3">
                  <Box className="flex items-center gap-1">
                    <Star className="!text-amber-400" />
                    <Typography variant="body2" className="!font-medium !text-white/70">
                      {car.rating}
                    </Typography>
                  </Box>
                  <Typography variant="h6" className="!font-bold !text-blue-400">
                    ${car.price}/day
                  </Typography>
                </Box>
                <Box className="flex gap-2">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(car.id)}
                    className="!flex-1 !border-white/20 !text-white hover:!bg-white/10"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(car.id)}
                    className="!text-rose-400 !border-rose-500/30 hover:!bg-rose-500/20"
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
