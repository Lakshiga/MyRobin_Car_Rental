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
          <Typography variant="h3" className="!font-bold !text-slate-900">
            Cars Management
          </Typography>
          <Typography variant="body1" className="!text-slate-600 !mt-1">
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
      <Card className="!rounded-2xl !shadow-lg">
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
                    <Search className="!text-slate-400" />
                  </InputAdornment>
                ),
              }}
              className="!bg-slate-50"
            />
            <Box className="flex gap-2">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "!bg-blue-500 !text-white !font-semibold"
                      : "!bg-white !text-slate-700 hover:!bg-slate-100"
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
            <Card className="!rounded-2xl !shadow-lg hover:!shadow-xl !transition-all">
              <Box className="relative">
                <Box className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-7xl rounded-t-2xl">
                  {car.image}
                </Box>
                <Chip
                  label={car.status}
                  size="small"
                  icon={car.status === "Available" ? <CheckCircle /> : <Cancel />}
                  className={`!absolute !top-3 !right-3 ${
                    car.status === "Available"
                      ? "!bg-emerald-100 !text-emerald-700"
                      : car.status === "Maintenance"
                        ? "!bg-amber-100 !text-amber-700"
                        : "!bg-rose-100 !text-rose-700"
                  }`}
                />
              </Box>
              <CardContent className="!p-4">
                <Typography variant="h6" className="!font-bold !text-slate-900 !mb-2">
                  {car.name}
                </Typography>
                <Box className="flex items-center justify-between mb-3">
                  <Box className="flex items-center gap-1">
                    <Star className="!text-amber-400" />
                    <Typography variant="body2" className="!font-medium">
                      {car.rating}
                    </Typography>
                  </Box>
                  <Typography variant="h6" className="!font-bold !text-blue-600">
                    ${car.price}/day
                  </Typography>
                </Box>
                <Box className="flex gap-2">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(car.id)}
                    className="!flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(car.id)}
                    className="!text-rose-600 !border-rose-600"
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

