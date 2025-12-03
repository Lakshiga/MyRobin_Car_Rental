"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  AccessTime,
  Security,
  Star,
  Favorite,
  FavoriteBorder,
  TrendingUp,
  ArrowForward,
} from "@mui/icons-material";
import { useState } from "react";

const popularCars = [
  {
    id: 1,
    name: "Tesla Model S",
    price: "$120/day",
    rating: 5.0,
    image: "🚗",
    category: "Electric",
  },
  {
    id: 2,
    name: "BMW M8 Coupe",
    price: "$185/day",
    rating: 4.8,
    image: "🚙",
    category: "Luxury",
  },
  {
    id: 3,
    name: "Ferrari LaFerrari",
    price: "$350/day",
    rating: 5.0,
    image: "🏎️",
    category: "Supercar",
  },
];

const brands = [
  { name: "Tesla", logo: "T", color: "#000" },
  { name: "Lamborghini", logo: "🐂", color: "#000" },
  { name: "BMW", logo: "BMW", color: "#000" },
  { name: "Ferrari", logo: "🐴", color: "#000" },
];

export default function PublicHomePage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleExploreCars = () => {
    router.push("/cars");
  };

  const handleManageBooking = () => {
    router.push("/bookings");
  };

  const handleViewDetails = (carId: number) => {
    router.push(`/cars/${carId}`);
  };

  const handleToggleFavorite = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  return (
    <Box className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <Box className="text-center space-y-6">
        <Box className="space-y-4">
          <Chip
            label="Premium Fleet • Flexible Plans"
            className="!bg-blue-500/20 !text-blue-400 !border !border-blue-500/30 !font-semibold !text-sm !px-3 !py-1"
            icon={<TrendingUp className="!text-blue-400" />}
          />
          <Typography
            variant="h2"
            className="!text-4xl md:!text-6xl !font-bold !text-white !leading-tight"
          >
            Rent the Perfect Car
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              for Every Journey
            </span>
          </Typography>
          <Typography
            variant="body1"
            className="!text-lg md:!text-xl !text-white/70 !max-w-2xl !mx-auto"
          >
            MyRobin connects travelers with curated vehicles, real-time availability, and
            concierge-level support across the globe.
          </Typography>
        </Box>

        <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="contained"
            size="large"
            onClick={handleExploreCars}
            endIcon={<ArrowForward />}
            className="!px-8 !py-4 !bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-lg hover:!shadow-xl !transition-all !transform hover:!-translate-y-0.5 !rounded-xl"
          >
            Explore Cars
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleManageBooking}
            className="!px-8 !py-4 !border-2 !border-blue-500/50 !text-blue-400 hover:!bg-blue-500/20 !rounded-xl"
          >
            Manage Booking
          </Button>
        </Box>
      </Box>

      {/* Brands Section */}
      <Box>
        <Typography variant="h5" className="!font-bold !text-white !mb-6">
          Popular Brands
        </Typography>
        <Grid container spacing={3}>
          {brands.map((brand, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card className="!rounded-2xl hover:!shadow-xl !transition-all !cursor-pointer !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
                <CardContent className="!p-4 !text-center">
                  <Avatar className="!h-16 !w-16 !mx-auto !mb-2 !bg-slate-700 !text-white !font-bold !text-xl">
                    {brand.logo}
                  </Avatar>
                  <Typography variant="subtitle2" className="!font-semibold !text-white">
                    {brand.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="!rounded-2xl hover:!shadow-xl !transition-all !h-full !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent className="!p-6 md:!p-8">
              <Box className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-4 shadow-lg">
                <AccessTime className="!text-3xl" />
              </Box>
              <Typography variant="h5" className="!font-bold !text-white !mb-2">
                24/7 Pickup
              </Typography>
              <Typography variant="body2" className="!text-white/70">
                Airport, city center, or doorstep delivery. We're available whenever you need us.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="!rounded-2xl hover:!shadow-xl !transition-all !h-full !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent className="!p-6 md:!p-8">
              <Box className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white mb-4 shadow-lg">
                <Security className="!text-3xl" />
              </Box>
              <Typography variant="h5" className="!font-bold !text-white !mb-2">
                Insurance Ready
              </Typography>
              <Typography variant="body2" className="!text-white/70">
                Fully insured rides with zero paperwork on-site. Drive with complete peace of mind.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="!rounded-2xl hover:!shadow-xl !transition-all !h-full !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent className="!p-6 md:!p-8">
              <Box className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white mb-4 shadow-lg">
                <Star className="!text-3xl" />
              </Box>
              <Typography variant="h5" className="!font-bold !text-white !mb-2">
                Premium Fleet
              </Typography>
              <Typography variant="body2" className="!text-white/70">
                From luxury sedans to sports cars, choose from our curated collection of premium
                vehicles.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Popular Cars Preview */}
      <Box>
        <Box className="flex items-center justify-between mb-6">
          <Typography variant="h4" className="!font-bold !text-white">
            Popular Cars
          </Typography>
          <Button
            variant="text"
            endIcon={<ArrowForward />}
            onClick={handleExploreCars}
            className="!text-blue-400 hover:!bg-blue-500/20"
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {popularCars.map((car) => (
            <Grid item xs={12} sm={6} lg={4} key={car.id}>
              <Card
                className="!rounded-2xl hover:!shadow-xl !transition-all !transform hover:!-translate-y-1 !cursor-pointer !h-full !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10"
                onClick={() => handleViewDetails(car.id)}
              >
                <Box className="relative">
                  <Box className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-2xl text-7xl">
                    {car.image}
                  </Box>
                  <IconButton
                    size="small"
                    className="!absolute !top-3 !right-3 !bg-slate-800/90 hover:!bg-slate-700 !shadow-md"
                    onClick={(e) => handleToggleFavorite(car.id, e)}
                  >
                    {favorites.includes(car.id) ? (
                      <Favorite className="!text-rose-500" />
                    ) : (
                      <FavoriteBorder className="!text-white/50" />
                    )}
                  </IconButton>
                  <Chip
                    label={car.category}
                    size="small"
                    className="!absolute !top-3 !left-3 !bg-slate-800/90 !font-semibold !text-white"
                  />
                </Box>
                <CardContent className="!p-4">
                  <Typography variant="h6" className="!font-bold !text-white !mb-2">
                    {car.name}
                  </Typography>
                  <Box className="flex items-center justify-between mb-3">
                    <Box className="flex items-center gap-1">
                      <Star className="!text-amber-400 !text-lg" />
                      <Typography variant="body2" className="!font-medium !text-white/70">
                        {car.rating}
                      </Typography>
                    </Box>
                    <Typography variant="h6" className="!font-bold !text-blue-400">
                      {car.price}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !rounded-xl"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Card className="!bg-gradient-to-r !from-blue-600 !to-blue-800 !rounded-3xl !p-8 md:!p-12 !text-center !shadow-2xl">
        <CardContent>
          <Typography variant="h3" className="!font-bold !mb-4 !text-white">
            Ready to Hit the Road?
          </Typography>
          <Typography variant="body1" className="!text-blue-100 !text-lg !mb-6 !max-w-2xl !mx-auto">
            Join thousands of satisfied customers who trust MyRobin for their car rental needs.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleExploreCars}
            endIcon={<ArrowForward />}
            className="!bg-white !text-blue-600 hover:!bg-blue-50 !shadow-lg !px-8 !py-4 !rounded-xl"
          >
            Browse All Cars
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
