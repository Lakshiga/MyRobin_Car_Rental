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
        return { bg: "!bg-amber-100", text: "!text-amber-700", border: "!border-amber-300" };
      case "On Going":
        return { bg: "!bg-blue-100", text: "!text-blue-700", border: "!border-blue-300" };
      case "Completed":
        return { bg: "!bg-emerald-100", text: "!text-emerald-700", border: "!border-emerald-300" };
      default:
        return { bg: "!bg-slate-100", text: "!text-slate-700", border: "!border-slate-300" };
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
    <Box className="space-y-8">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Box>
          <Typography variant="h3" className="!font-bold !text-slate-900">
            My Bookings
          </Typography>
          <Typography variant="body1" className="!text-slate-600 !mt-1">
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
                : "!bg-white !text-slate-700 hover:!bg-slate-100"
            }
            clickable
          />
        ))}
      </Box>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => {
            const statusColors = getStatusColor(booking.status);
            return (
              <Grid item xs={12} key={booking.id}>
                <Card className="!rounded-2xl !shadow-lg hover:!shadow-xl !transition-all">
                  <CardContent className="!p-6">
                    <Grid container spacing={3}>
                      {/* Car Image */}
                      <Grid item xs={12} sm={4} md={3}>
                        <Box className="flex h-48 sm:h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-6xl">
                          {booking.image}
                        </Box>
                      </Grid>

                      {/* Booking Details */}
                      <Grid item xs={12} sm={8} md={9}>
                        <Box className="space-y-4">
                          <Box className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <Box>
                              <Typography variant="h5" className="!font-bold !text-slate-900 !mb-1">
                                {booking.car}
                              </Typography>
                              <Typography variant="body2" className="!text-slate-500">
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
                              <Card className="!bg-slate-50">
                                <CardContent className="!p-3">
                                  <Typography variant="caption" className="!text-slate-500 !mb-1">
                                    Pickup
                                  </Typography>
                                  <Typography variant="body1" className="!font-semibold !text-slate-900">
                                    {booking.pickupDate}
                                  </Typography>
                                  <Typography variant="body2" className="!text-slate-600">
                                    {booking.pickupTime}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Card className="!bg-slate-50">
                                <CardContent className="!p-3">
                                  <Typography variant="caption" className="!text-slate-500 !mb-1">
                                    Dropoff
                                  </Typography>
                                  <Typography variant="body1" className="!font-semibold !text-slate-900">
                                    {booking.dropoffDate}
                                  </Typography>
                                  <Typography variant="body2" className="!text-slate-600">
                                    {booking.dropoffTime}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>

                          {/* Amount and Actions */}
                          <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
                            <Box>
                              <Typography variant="caption" className="!text-slate-500">
                                Total Amount
                              </Typography>
                              <Typography variant="h5" className="!font-bold !text-blue-600">
                                ${booking.totalAmount}
                              </Typography>
                            </Box>
                            <Box className="flex gap-2">
                              <Button
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => handleViewDetails(booking.bookingId)}
                                className="!border-slate-300 !text-slate-700 hover:!bg-slate-100 !rounded-xl"
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
        <Card className="!text-center !py-12">
          <CardContent>
            <Typography variant="body1" className="!text-slate-500 !text-lg !mb-4">
              No bookings found.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSelectedStatus("All")}
              className="!text-blue-600 !border-blue-600 hover:!bg-blue-50"
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
            className: "!rounded-2xl",
            sx: { minWidth: "300px" },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Cancel Booking</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ padding: "16px 24px", gap: 1 }}>
            <Button
              onClick={() => setCancelDialogOpen(false)}
              variant="outlined"
              className="!text-slate-700 !border-slate-300"
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
