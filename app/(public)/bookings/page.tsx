"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";
import {
  Add,
  Visibility,
  Cancel,
  CheckCircle,
  Schedule,
  DirectionsCar,
} from "@mui/icons-material";

const bookings = [
  {
    id: 1,
    car: "Tesla Model S",
    bookingId: "BK-2025-001",
    pickupDate: "22 Nov 2025",
    pickupTime: "10:00 AM",
    dropoffDate: "26 Nov 2025",
    dropoffTime: "04:00 PM",
    status: "Upcoming",
    totalAmount: 480,
    image: "🚗",
  },
  {
    id: 2,
    car: "BMW M8 Coupe",
    bookingId: "BK-2025-002",
    pickupDate: "14 Nov 2025",
    pickupTime: "09:00 PM",
    dropoffDate: "19 Nov 2025",
    dropoffTime: "09:00 PM",
    status: "Completed",
    totalAmount: 925,
    image: "🚗",
  },
  {
    id: 3,
    car: "Ferrari LaFerrari",
    bookingId: "BK-2025-003",
    pickupDate: "20 Nov 2025",
    pickupTime: "10:00 AM",
    dropoffDate: "25 Nov 2025",
    dropoffTime: "08:00 AM",
    status: "On Going",
    totalAmount: 2750,
    image: "🏎️",
  },
];

const statusFilters = ["All", "Upcoming", "On Going", "Completed"];

export default function BookingsPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  const filteredBookings =
    selectedStatus === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return { bg: "!bg-amber-500/20", text: "!text-amber-400", border: "!border-amber-500/30" };
      case "On Going":
        return { bg: "!bg-blue-500/20", text: "!text-blue-400", border: "!border-blue-500/30" };
      case "Completed":
        return { bg: "!bg-emerald-500/20", text: "!text-emerald-400", border: "!border-emerald-500/30" };
      default:
        return { bg: "!bg-slate-500/20", text: "!text-slate-400", border: "!border-slate-500/30" };
    }
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleNewBooking = () => {
    router.push("/cars");
  };

  const handleViewDetails = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
  };

  const handleCancelClick = (bookingId: number) => {
    setSelectedBooking(bookingId);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    if (selectedBooking) {
      alert(`Booking ${selectedBooking} cancelled`);
    }
    setCancelDialogOpen(false);
    setSelectedBooking(null);
  };

  return (
    <Box className="space-y-4 md:space-y-8 w-full">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <Box className="w-full sm:w-auto">
          <Typography 
            variant="h3" 
            className="!font-bold !text-white !text-2xl sm:!text-3xl md:!text-4xl"
            sx={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
          >
            My Bookings
          </Typography>
          <Typography 
            variant="body1" 
            className="!text-white/70 !mt-1 !text-sm md:!text-base"
            sx={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Manage and track your car rental bookings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleNewBooking}
          className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-lg !rounded-xl"
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
            onClick={() => handleStatusFilter(status)}
            className={
              selectedStatus === status
                ? "!bg-blue-500 !text-white !font-semibold"
                : "!bg-slate-700/50 !text-white/70 hover:!bg-slate-700"
            }
            clickable
          />
        ))}
      </Box>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ width: "100%" }}>
          {filteredBookings.map((booking) => {
            const statusColors = getStatusColor(booking.status);
            return (
              <Grid item xs={12} key={booking.id} sx={{ width: "100%" }}>
                <Card className="!rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
                  <CardContent className="!p-6">
                    <Grid container spacing={3}>
                      {/* Car Image */}
                      <Grid item xs={12} sm={4} md={3}>
                        <Box className="flex h-48 sm:h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-6xl">
                          {booking.image}
                        </Box>
                      </Grid>

                      {/* Booking Details */}
                      <Grid item xs={12} sm={8} md={9}>
                        <Box className="space-y-4">
                          <Box className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <Box>
                              <Typography variant="h5" className="!font-bold !text-white !mb-1">
                                {booking.car}
                              </Typography>
                              <Typography variant="body2" className="!text-white/50">
                                Booking ID: {booking.bookingId}
                              </Typography>
                            </Box>
                            <Chip
                              icon={
                                booking.status === "Upcoming" ? (
                                  <Schedule />
                                ) : booking.status === "Completed" ? (
                                  <CheckCircle />
                                ) : (
                                  <DirectionsCar />
                                )
                              }
                              label={booking.status}
                              className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} !border-2`}
                            />
                          </Box>

                          {/* Dates */}
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Card className="!bg-slate-900/50">
                                <CardContent className="!p-3">
                                  <Typography variant="caption" className="!text-white/50 !mb-1">
                                    Pickup
                                  </Typography>
                                  <Typography variant="body1" className="!font-semibold !text-white">
                                    {booking.pickupDate}
                                  </Typography>
                                  <Typography variant="body2" className="!text-white/70">
                                    {booking.pickupTime}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Card className="!bg-slate-900/50">
                                <CardContent className="!p-3">
                                  <Typography variant="caption" className="!text-white/50 !mb-1">
                                    Dropoff
                                  </Typography>
                                  <Typography variant="body1" className="!font-semibold !text-white">
                                    {booking.dropoffDate}
                                  </Typography>
                                  <Typography variant="body2" className="!text-white/70">
                                    {booking.dropoffTime}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>

                          {/* Amount and Actions */}
                          <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
                            <Box>
                              <Typography variant="caption" className="!text-white/50">
                                Total Amount
                              </Typography>
                              <Typography variant="h5" className="!font-bold !text-blue-400">
                                ${booking.totalAmount}
                              </Typography>
                            </Box>
                            <Box className="flex gap-2">
                              <Button
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => handleViewDetails(booking.bookingId)}
                                className="!border-white/20 !text-white/70 hover:!bg-white/10 !rounded-xl"
                              >
                                View Details
                              </Button>
                              {booking.status === "Upcoming" && (
                                <Button
                                  variant="contained"
                                  startIcon={<Cancel />}
                                  onClick={() => handleCancelClick(booking.id)}
                                  className="!bg-rose-500 hover:!bg-rose-600 !rounded-xl"
                                >
                                  Cancel
                                </Button>
                              )}
                            </Box>
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
            <Typography variant="body1" className="!text-white/70 !text-lg !mb-4">
              No bookings found.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSelectedStatus("All")}
              className="!text-blue-400 !border-blue-500/50 hover:!bg-blue-500/20"
            >
              View all bookings
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelDialogOpen && (
        <Dialog
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          PaperProps={{
            className: "!rounded-2xl !bg-slate-800 !border !border-white/10",
            sx: { minWidth: "300px" },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, color: "white" }}>Cancel Booking</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ padding: "16px 24px", gap: 1 }}>
            <Button
              onClick={() => setCancelDialogOpen(false)}
              variant="outlined"
              className="!text-white/70 !border-white/20"
            >
              Keep Booking
            </Button>
            <Button
              onClick={handleCancelConfirm}
              variant="contained"
              className="!bg-rose-500 hover:!bg-rose-600"
            >
              Cancel Booking
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
