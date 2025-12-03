"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  FilterList,
  Star,
  CheckCircle,
  Cancel,
  Visibility,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
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
    features: ["Auto Pilot", "Supercharger", "Premium Interior"],
  },
  {
    id: 2,
    name: "Lamborghini Aventador",
    category: "Sports",
    price: 450,
    rating: 5.0,
    status: "Available",
    image: "🏎️",
    features: ["V12 Engine", "Carbon Fiber", "Racing Mode"],
  },
  {
    id: 3,
    name: "Ferrari LaFerrari",
    category: "Supercar",
    price: 550,
    rating: 4.9,
    status: "Booked",
    image: "🏎️",
    features: ["Hybrid Power", "Aerodynamic", "Limited Edition"],
  },
  {
    id: 4,
    name: "Ferrari-FF",
    category: "Luxury",
    price: 380,
    rating: 4.5,
    status: "Booked",
    image: "🚙",
    features: ["4WD", "V12 Engine", "Luxury Interior"],
  },
  {
    id: 5,
    name: "BMW M8 Coupe",
    category: "Performance",
    price: 185,
    rating: 3.8,
    status: "Available",
    image: "🚗",
    features: ["Twin Turbo", "M Sport", "Premium Sound"],
  },
  {
    id: 6,
    name: "BMW GTS3 M2",
    category: "Performance",
    price: 220,
    rating: 4.9,
    status: "Available",
    image: "🚗",
    features: ["Track Ready", "Carbon Package", "Racing Seats"],
  },
];

const categories = ["All", "Electric", "Sports", "Supercar", "Luxury", "Performance"];

export default function CarsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (carId: number) => {
    router.push(`/cars/${carId}`);
  };

  const handleBookNow = (carId: number, carName: string) => {
    alert(`Booking ${carName}...`);
    router.push(`/bookings?carId=${carId}`);
  };

  const handleToggleFavorite = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="space-y-4">
        <Typography variant="h3" className="!font-bold !text-slate-900">
          Available Cars
        </Typography>
        <Typography variant="body1" className="!text-slate-600">
          Filter by category, search by name, or browse our entire fleet.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Card className="!rounded-2xl !shadow-lg">
        <CardContent className="!p-4">
          <TextField
            fullWidth
            placeholder="Search your dream car..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="!text-slate-400" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <FilterList />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="!bg-slate-50"
          />
        </CardContent>
      </Card>

      {/* Category Filters */}
      <Box className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            className={
              selectedCategory === category
                ? "!bg-blue-500 !text-white !font-semibold"
                : "!bg-white !text-slate-700 hover:!bg-slate-100"
            }
            clickable
          />
        ))}
      </Box>

      {/* Results Count */}
      <Typography variant="body2" className="!text-slate-600">
        Showing <span className="!font-semibold !text-slate-900">{filteredCars.length}</span> of{" "}
        {cars.length} cars
      </Typography>

      {/* Cars Grid */}
      <Grid container spacing={3}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} lg={4} key={car.id}>
            <Card className="!rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !transform hover:!-translate-y-1 !h-full">
              {/* Car Image */}
              <Box className="relative">
                <Box className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-7xl">
                  {car.image}
                </Box>
                <IconButton
                  size="small"
                  className="!absolute !top-3 !right-3 !bg-white/90 hover:!bg-white !shadow-md"
                  onClick={(e) => handleToggleFavorite(car.id, e)}
                >
                  {favorites.includes(car.id) ? (
                    <Favorite className="!text-rose-500" />
                  ) : (
                    <FavoriteBorder className="!text-slate-400" />
                  )}
                </IconButton>
                <Chip
                  label={car.category}
                  size="small"
                  className="!absolute !top-3 !left-3 !bg-white/90 !font-semibold"
                />
              </Box>

              {/* Car Info */}
              <CardContent className="!p-4 space-y-3">
                <Box>
                  <Typography variant="h6" className="!font-bold !text-slate-900 !mb-1">
                    {car.name}
                  </Typography>
                </Box>

                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-1">
                    <Star className="!text-amber-400 !text-lg" />
                    <Typography variant="body2" className="!font-medium !text-slate-700">
                      {car.rating}
                    </Typography>
                  </Box>
                  <Chip
                    icon={car.status === "Available" ? <CheckCircle /> : <Cancel />}
                    label={car.status}
                    size="small"
                    className={
                      car.status === "Available"
                        ? "!bg-emerald-100 !text-emerald-700"
                        : "!bg-rose-100 !text-rose-700"
                    }
                  />
                </Box>

                <Box className="space-y-2">
                  <Box className="flex items-center justify-between">
                    <Typography variant="h5" className="!font-bold !text-blue-600">
                      ${car.price}
                    </Typography>
                    <Typography variant="body2" className="!text-slate-500">
                      /day
                    </Typography>
                  </Box>
                </Box>

                {/* Features */}
                <Box className="flex flex-wrap gap-2">
                  {car.features.slice(0, 2).map((feature, idx) => (
                    <Chip
                      key={idx}
                      label={feature}
                      size="small"
                      className="!bg-slate-100 !text-slate-600"
                    />
                  ))}
                </Box>

                {/* Action Buttons */}
                <Box className="flex gap-2 pt-2">
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Visibility />}
                    onClick={() => handleViewDetails(car.id)}
                    className="!border-blue-500 !text-blue-600 hover:!bg-blue-50 !rounded-xl"
                  >
                    View
                  </Button>
                  {car.status === "Available" && (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleBookNow(car.id, car.name)}
                      className="!bg-emerald-500 hover:!bg-emerald-600 !rounded-xl"
                    >
                      Book
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCars.length === 0 && (
        <Card className="!text-center !py-12">
          <CardContent>
            <Typography variant="body1" className="!text-slate-500 !text-lg !mb-4">
              No cars found matching your criteria.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="!text-blue-600 !border-blue-600 hover:!bg-blue-50"
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
