"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_RENTALS, CREATE_RENTAL, GET_CAR, CANCEL_RENTAL, GET_CAR_UNAVAILABLE_DATES } from "@/lib/graphql/carQueries";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import {
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Add,
  Visibility,
  Cancel,
  CheckCircle,
  Schedule,
  DirectionsCar,
} from "@mui/icons-material";

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carIdParam = searchParams.get("carId");
  
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  
  // Booking Creation State
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [drivingLicence, setDrivingLicence] = useState("");
  
  // Fetch User Rentals
  const { data: rentalsData, loading: rentalsLoading, error: rentalsError, refetch: refetchRentals } = useQuery(GET_USER_RENTALS);
  
  // Fetch Car Details if carId is present (for booking creation)
  const { data: carData, loading: carLoading } = useQuery(GET_CAR, {
    variables: { id: carIdParam },
    skip: !carIdParam,
  });

  // Fetch Unavailable Dates
  const { data: unavailableData } = useQuery(GET_CAR_UNAVAILABLE_DATES, {
    variables: { carId: carIdParam },
    skip: !carIdParam,
    onCompleted: (data) => {
      console.log('Unavailable Dates Raw:', data);
    }
  });

  const [createRental, { loading: createLoading }] = useMutation(CREATE_RENTAL);
  const [cancelRental, { loading: cancelLoading }] = useMutation(CANCEL_RENTAL);

  // Open create dialog if carId param exists
  useEffect(() => {
    if (carIdParam) {
      setCreateDialogOpen(true);
    }
  }, [carIdParam]);

  const handleCreateClose = () => {
    setCreateDialogOpen(false);
    // Remove carId from URL without refresh
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);
    setStartDate(null);
    setEndDate(null);
    setDrivingLicence("");
  };

  // Robust date parser
  const parseDate = (date: any) => {
    if (!date) return dayjs();
    // If it's a numeric string (timestamp), convert to number first
    if (typeof date === 'string' && /^\d+$/.test(date)) {
      return dayjs(parseInt(date));
    }
    return dayjs(date);
  };

  // Helper to check if a specific date should be disabled
  const shouldDisableDate = (date: Dayjs) => {
    // Disable past dates
    const today = dayjs().startOf('day');
    if (date.isBefore(today, 'day')) return true;

    // Disable dates based on unavailable ranges
    if (!unavailableData?.carUnavailableDates) return false;
    
    return unavailableData.carUnavailableDates.some((range: any) => {
      const start = parseDate(range.startDate).startOf('day');
      const end = parseDate(range.endDate).endOf('day');
      
      // Check intersection using day granularity
      const isAfterOrSameStart = date.isAfter(start, 'day') || date.isSame(start, 'day');
      const isBeforeOrSameEnd = date.isBefore(end, 'day') || date.isSame(end, 'day');
      
      return isAfterOrSameStart && isBeforeOrSameEnd;
    });
  };

  const calculateTotal = () => {
    if (!startDate || !endDate || !carData?.car) return 0;
    const diffDays = endDate.diff(startDate, 'day') + 1;
    if (diffDays <= 0) return 0;
    return diffDays * carData.car.pricePerDay;
  };

  const handleCreateBooking = async () => {
    if (!carData?.car || !startDate || !endDate) return;
    
    try {
      await createRental({
        variables: {
          input: {
            carId: carData.car.id,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            drivingLicenceNumber: drivingLicence,
          },
        },
      });
      
      alert("Booking created successfully!");
      handleCreateClose();
      refetchRentals();
    } catch (err: any) {
      console.error("Error creating booking:", err);
      alert(`Booking failed: ${err.message}`);
    }
  };

  const handleCancelClick = (id: string) => {
    setSelectedBookingId(id);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedBookingId) return;
    try {
      await cancelRental({ variables: { id: selectedBookingId } });
      refetchRentals();
      setCancelDialogOpen(false);
      setSelectedBookingId(null);
    } catch (err: any) {
      console.error("Error cancelling booking:", err);
      alert(`Cancellation failed: ${err.message}`);
    }
  };

  const rentals = rentalsData?.rentals || [];
  
  const filteredBookings = selectedStatus === "All"
    ? rentals
    : rentals.filter((b: any) => b.status === selectedStatus.toUpperCase());

  const statusFilters = ["All", "PENDING", "ACTIVE", "COMPLETED", "CANCELLED"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
      case "PENDING":
        return { bg: "!bg-amber-500/20", text: "!text-amber-400", border: "!border-amber-500/30" };
      case "ACTIVE":
      case "ACTIVE":
        return { bg: "!bg-blue-500/20", text: "!text-blue-400", border: "!border-blue-500/30" };
      case "COMPLETED":
      case "COMPLETED":
        return { bg: "!bg-emerald-500/20", text: "!text-emerald-400", border: "!border-emerald-500/30" };
      case "CANCELLED":
        return { bg: "!bg-rose-500/20", text: "!text-rose-400", border: "!border-rose-500/30" };
      case "CANCELLED":
        return { bg: "!bg-rose-500/20", text: "!text-rose-400", border: "!border-rose-500/30" };
      default:
        return { bg: "!bg-slate-500/20", text: "!text-slate-400", border: "!border-slate-500/30" };
    }
  };

  return (
    <Box className="space-y-4 md:space-y-8 w-full">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <Box className="w-full sm:w-auto">
          <Typography 
            variant="h3" 
            className="!font-bold !text-white !text-2xl sm:!text-3xl md:!text-4xl"
          >
            My Bookings
          </Typography>
          <Typography variant="body1" className="!text-white/70 !mt-1">
            Manage and track your car rental bookings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/cars")}
          className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !rounded-xl"
        >
          New Booking
        </Button>
      </Box>

      {/* Status Filters */}
      <Box className="flex gap-2 overflow-x-auto pb-2">
        {statusFilters.map((status) => (
          <Chip
            key={status}
            label={status}
            onClick={() => setSelectedStatus(status)}
            className={selectedStatus === status ? "!bg-blue-500 !text-white" : "!bg-slate-700/50 !text-white/70"}
            clickable
          />
        ))}
      </Box>

      {/* Loading State */}
      {loading && (
        <Box className="flex justify-center py-12">
          <CircularProgress className="!text-blue-500" />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" className="!bg-rose-500/20 !text-rose-400">
          {error.message}
        </Alert>
      )}

      {/* Error State */}
      {rentalsError && (
        <Alert severity="error">{rentalsError.message}</Alert>
      )}

      {/* Loading State */}
      {rentalsLoading ? (
        <Box className="flex justify-center p-8">
          <CircularProgress />
        </Box>
      ) : (
        /* Bookings List */
        filteredBookings.length > 0 ? (
          <Grid container spacing={3}>
            {filteredBookings.map((booking: any) => {
              const statusColors = getStatusColor(booking.status);
              return (
                <Grid item xs={12} key={booking.id}>
                  <Card className="!rounded-2xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
                    <CardContent className="!p-6">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={3}>
                          <Box className="flex h-48 sm:h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                            {booking.car.imageUrl ? (
                              <img 
                                src={`http://localhost:4001${booking.car.imageUrl}`} 
                                alt={booking.car.model} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-6xl">🚗</span>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Box className="space-y-4">
                            <Box className="flex justify-between">
                              <Box>
                                <Typography variant="h5" className="!font-bold !text-white">
                                  {booking.car.make} {booking.car.model}
                                </Typography>
                                <Typography variant="body2" className="!text-white/50">
                                  ID: {booking.id.slice(0, 8)}...
                                </Typography>
                              </Box>
                              <Chip
                                label={booking.status}
                                className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} !border-2`}
                              />
                            </Box>
                            
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography className="!text-white/50">Pickup</Typography>
                                <Typography className="!text-white !font-semibold">
                                  {new Date(booking.startDate).toLocaleDateString()}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography className="!text-white/50">Dropoff</Typography>
                                <Typography className="!text-white !font-semibold">
                                  {new Date(booking.endDate).toLocaleDateString()}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Box className="flex justify-between items-center pt-4 border-t border-white/10">
                              <Typography variant="h5" className="!font-bold !text-blue-400">
                                ${booking.totalPrice}
                              </Typography>
                              {(booking.status === "PENDING" || booking.status === "ACTIVE") && (
                                <Button
                                  variant="contained"
                                  startIcon={<Cancel />}
                                  onClick={() => handleCancelClick(rental.id)}
                                  className="!bg-rose-500 hover:!bg-rose-600 !rounded-xl"
                                  disabled={cancelLoading}
                                >
                                  Cancel
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Card className="!text-center !py-12 !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent>
              <Typography className="!text-white/70 !text-lg !mb-4">
                No bookings found.
              </Typography>
              <Button variant="outlined" onClick={() => router.push("/cars")}>
                Browse Cars
              </Button>
            </CardContent>
          </Card>
        )
      )}

      {/* Create Booking Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCreateClose} maxWidth="sm" fullWidth>
        <DialogTitle>Book {carData?.car?.make} {carData?.car?.model}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {carLoading ? (
              <CircularProgress />
            ) : carData?.car ? (
              <Box className="space-y-4 pt-4">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      shouldDisableDate={shouldDisableDate}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !startDate && false, // Optional error handling
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      shouldDisableDate={shouldDisableDate}
                      minDate={startDate || undefined}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                    label="Driving Licence Number"
                    fullWidth
                    value={drivingLicence}
                    onChange={(e) => setDrivingLicence(e.target.value)}
                  />
                </Grid>
              </Grid>
              
              {unavailableData?.carUnavailableDates?.length > 0 && (
                <Alert severity="warning" className="!mt-2">
                  <Typography variant="subtitle2" fontWeight="bold">Unavailable Dates (Already Booked):</Typography>
                  <ul className="list-disc pl-5 text-sm">
                    {unavailableData.carUnavailableDates.map((range: any, index: number) => (
                      <li key={index}>
                        {parseDate(range.startDate).format('DD MMM YYYY')} to {parseDate(range.endDate).format('DD MMM YYYY')}
                      </li>
                    ))}
                  </ul>
                </Alert>
              )}
              
              {startDate && endDate && (
                <Card className="!bg-blue-50 !border-blue-200">
                  <CardContent className="flex justify-between items-center">
                    <Typography variant="subtitle1" className="!font-bold !text-blue-900">
                      Total Estimate:
                    </Typography>
                    <Typography variant="h5" className="!font-bold !text-blue-600">
                      ${calculateTotal()}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
            ) : (
              <Alert severity="error">Car details not found.</Alert>
            )}
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateBooking}
            disabled={createLoading || !startDate || !endDate}
          >
            {createLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this booking?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Keep</Button>
          <Button onClick={handleCancelConfirm} color="error" variant="contained">
            Cancel It
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
