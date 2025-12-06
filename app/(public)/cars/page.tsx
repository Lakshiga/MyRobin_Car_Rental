"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";
import { GET_CARS, GET_AVAILABLE_CARS, CREATE_RENTAL } from "@/lib/graphql/carQueries";
import { AddCarForm } from "@/components/AddCarForm";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Add,
} from "@mui/icons-material";

const categories = ["All", "Electric", "Sports", "Supercar", "Luxury", "Performance"];

export default function CarsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addCarDialog, setAddCarDialog] = useState(false);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  // GraphQL query for cars
  const { data: carsData, loading, error, refetch } = useQuery(GET_CARS);
  const cars = carsData?.cars || [];
  const [createRental] = useMutation(CREATE_RENTAL);

  const filteredCars = cars.filter((car: any) => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || car.color === selectedCategory;
    return matchesSearch && matchesCategory;
  });

<<<<<<< HEAD
=======
  const handleBookCar = (car: any) => {
    setSelectedCar(car);
    setBookingDialog(true);
  };

  const handleBookingSubmit = async () => {
  if (!startDate || !endDate) {
    setBookingError("Please select both start and end dates");
    return;
  }
  
  setBookingLoading(true);
  setBookingError("");
  
  try {
    await createRental({
      variables: {
        input: {
          carId: parseInt(selectedCar.id),
          startDate,
          endDate,
        },
      },
    });
    
    setBookingDialog(false);
    setSelectedCar(null);
    alert("Booking successful!");
    router.push("/bookings");
  } catch (err: any) {
    setBookingError(err.message || "Failed to create booking");
  } finally {
    setBookingLoading(false);
  }
};

>>>>>>> aaaedf207944aa99e3ace6bebb3fd73c9983e9a5
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (carId: number) => {
    router.push(`/cars/${carId}`);
  };

const handleBookNow = (car: any) => {
  setSelectedCar(car);
  setStartDate("");
  setEndDate("");
  setBookingError("");
  setBookingDialog(true);
};

  const handleToggleFavorite = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  return (
    <Box className="space-y-4 md:space-y-8 w-full">
      {/* Header */}
      <Box className="space-y-2 md:space-y-4 w-full flex justify-between items-start">
        <Box className="space-y-2 md:space-y-4">
          <Typography 
            variant="h3" 
            className="!font-bold !text-white !text-2xl sm:!text-3xl md:!text-4xl"
            sx={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
          >
            Available Cars
          </Typography>
          <Typography 
            variant="body1" 
            className="!text-white/70 !text-sm md:!text-base"
            sx={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Filter by category, search by name, or browse our entire fleet.
          </Typography>
        </Box>
        
        {isAuthenticated && user?.role === "ADMIN" && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAddCarDialog(true)}
            className="!bg-blue-500 hover:!bg-blue-600 !rounded-xl"
          >
            Add Car
          </Button>
        )}
      </Box>

      {/* Search Bar */}
      <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
        <CardContent className="!p-4">
          <TextField
            fullWidth
            placeholder="Search your dream car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="!text-white/50" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton className="!text-white/50">
                    <FilterList />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            className="!bg-slate-900/50"
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
                : "!bg-slate-700/50 !text-white/70 hover:!bg-slate-700"
            }
            clickable
          />
        ))}
      </Box>

      {/* Results Count */}
      <Typography variant="body2" className="!text-white/70">
        Showing <span className="!font-semibold !text-white">{filteredCars.length}</span> of{" "}
        {cars.length} cars
      </Typography>

      {/* Cars Grid */}
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ width: "100%" }}>
        {filteredCars.map((car: any) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={car.id} sx={{ width: { xs: "100%", sm: "50%", md: "50%", lg: "33.33%" } }}>
            <Card className="!rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !transform hover:!-translate-y-1 !h-full !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
              {/* Car Image */}
              <Box className="relative">
                <Box className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                  {car.imageUrl ? (
                    <img 
                      src={`http://localhost:4001${car.imageUrl}`} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-7xl">🚗</div>
                  )}
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
                  label={car.color}
                  size="small"
                  className="!absolute !top-3 !left-3 !bg-slate-800/90 !font-semibold !text-white"
                />
              </Box>

              {/* Car Info */}
              <CardContent className="!p-4 space-y-3">
                <Box>
                  <Typography variant="h6" className="!font-bold !text-white !mb-1">
                    {car.make} {car.model}
                  </Typography>
                </Box>

                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-1">
                    <Star className="!text-amber-400 !text-lg" />
                    <Typography variant="body2" className="!font-medium !text-white/70">
                      {car.year}
                    </Typography>
                  </Box>
                  <Chip
                    icon={car.available ? <CheckCircle /> : <Cancel />}
                    label={car.available ? "Available" : "Booked"}
                    size="small"
                    className={
                      car.available
                        ? "!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30"
                        : "!bg-rose-500/20 !text-rose-400 !border !border-rose-500/30"
                    }
                  />
                </Box>

                <Box className="space-y-2">
                  <Box className="flex items-center justify-between">
                    <Typography variant="h5" className="!font-bold !text-blue-400">
                      ${car.pricePerDay}
                    </Typography>
                    <Typography variant="body2" className="!text-white/50">
                      /day
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box className="flex gap-2 pt-2">
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Visibility />}
                    onClick={() => handleViewDetails(car.id)}
                    className="!border-blue-500/50 !text-blue-400 hover:!bg-blue-500/20 !rounded-xl"
                  >
                    View
                  </Button>
                  {car.available && (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleBookNow(car)}
                      className="!bg-emerald-500 hover:!bg-emerald-600 !rounded-xl"
                    >
                      Book
                    </Button>
                  )}
                  {
                      <Dialog
                        open={bookingDialog}
                        onClose={() => setBookingDialog(false)}
                        maxWidth="sm"
                        fullWidth
                        PaperProps={{
                          className: "!bg-slate-800 !border !border-white/10 !rounded-2xl",
                        }}
                      >
                        <DialogTitle className="!text-white !border-b !border-white/10">
                          Book {selectedCar?.make} {selectedCar?.model}
                        </DialogTitle>
                        <DialogContent className="!pt-4">
                          {bookingError && (
                            <Box className="!mb-4 !p-3 !bg-rose-500/20 !border !border-rose-500/30 !rounded-lg">
                              <Typography className="!text-rose-400">{bookingError}</Typography>
                            </Box>
                          )}
                          <Box className="space-y-4 !mt-4">
                            <TextField
                              label="Start Date"
                              type="date"
                              fullWidth
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ min: new Date().toISOString().split("T")[0] }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                                  "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                                },
                                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                              }}
                            />
                            <TextField
                              label="End Date"
                              type="date"
                              fullWidth
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ min: startDate || new Date().toISOString().split("T")[0] }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "white",
                                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                                  "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                                },
                                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                              }}
                            />
                            {selectedCar && startDate && endDate && (
                              <Box className="!p-4 !bg-slate-900/50 !rounded-lg">
                                <Typography className="!text-white/70 !mb-2">Estimated Total</Typography>
                                <Typography className="!text-2xl !font-bold !text-blue-400">
                                  ${(
                                    (Math.ceil(
                                      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    ) + 1) * selectedCar.pricePerDay
                                  ).toFixed(2)}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </DialogContent>
                        <DialogActions className="!p-4 !border-t !border-white/10">
                          <Button
                            onClick={() => setBookingDialog(false)}
                            className="!text-white/70"
                            disabled={bookingLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleBookingSubmit}
                            disabled={bookingLoading || !startDate || !endDate}
                            className="!bg-emerald-500 hover:!bg-emerald-600"
                          >
                            {bookingLoading ? "Booking..." : "Confirm Booking"}
                          </Button>
                        </DialogActions>
                      </Dialog>
}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCars.length === 0 && (
        <Card className="!text-center !py-12 !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
          <CardContent>
            <Typography variant="body1" className="!text-white/70 !text-lg !mb-4">
              No cars found matching your criteria.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="!text-blue-400 !border-blue-500/50 hover:!bg-blue-500/20"
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Car Dialog */}
      <AddCarForm
        open={addCarDialog}
        onClose={() => setAddCarDialog(false)}
        onCarAdded={() => refetch()}
      />
    </Box>
  );
}
