"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_RENTALS, CANCEL_RENTAL } from "@/lib/graphql/carQueries";
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

const statusFilters = ["All", "PENDING", "ACTIVE", "COMPLETED", "CANCELLED"];

// Map backend status to display labels
const statusDisplayMap: Record<string, string> = {
  PENDING: "Upcoming",
  ACTIVE: "On Going",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function BookingsPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

  // Fetch rentals from GraphQL
  const { data, loading, error, refetch } = useQuery(GET_USER_RENTALS);
  const [cancelRental, { loading: cancelLoading }] = useMutation(CANCEL_RENTAL, {
    onCompleted: () => {
      refetch();
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    },
  });

  const rentals = data?.rentals || [];

  const filteredBookings =
    selectedStatus === "All"
      ? rentals
      : rentals.filter((rental: any) => rental.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return { bg: "!bg-amber-500/20", text: "!text-amber-400", border: "!border-amber-500/30" };
      case "ACTIVE":
        return { bg: "!bg-blue-500/20", text: "!text-blue-400", border: "!border-blue-500/30" };
      case "COMPLETED":
        return { bg: "!bg-emerald-500/20", text: "!text-emerald-400", border: "!border-emerald-500/30" };
      case "CANCELLED":
        return { bg: "!bg-rose-500/20", text: "!text-rose-400", border: "!border-rose-500/30" };
      default:
        return { bg: "!bg-slate-500/20", text: "!text-slate-400", border: "!border-slate-500/30" };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

  const handleCancelConfirm = async () => {
    if (selectedBooking) {
      try {
        await cancelRental({ variables: { id: selectedBooking } });
      } catch (err: any) {
        alert(err.message || "Failed to cancel booking");
      }
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

      {/* Bookings List */}
      {!loading && !error && filteredBookings.length > 0 ? (
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ width: "100%" }}>
          {filteredBookings.map((rental: any) => {
            const statusColors = getStatusColor(rental.status);
            return (
              <Grid item xs={12} key={rental.id} sx={{ width: "100%" }}>
                <Card className="!rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
                  <CardContent className="!p-6">
                    <Grid container spacing={3}>
                      {/* Car Image */}
                      <Grid item xs={12} sm={4} md={3}>
                        <Box className="flex h-48 sm:h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                          {rental.car?.imageUrl ? (
                            <img 
                              src={`http://localhost:4001${rental.car.imageUrl}`} 
                              alt={`${rental.car.make} ${rental.car.model}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-6xl">🚗</span>
                          )}
                        </Box>
                      </Grid>

                      {/* Booking Details */}
                      <Grid item xs={12} sm={8} md={9}>
                        <Box className="space-y-4">
                          <Box className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <Box>
                              <Typography variant="h5" className="!font-bold !text-white !mb-1">
                                {rental.car?.make} {rental.car?.model}
                              </Typography>
                              <Typography variant="body2" className="!text-white/50">
                                Booking ID: #{rental.id}
                              </Typography>
                            </Box>
                            <Chip
                              icon={
                                rental.status === "PENDING" ? (
                                  <Schedule />
                                ) : rental.status === "COMPLETED" ? (
                                  <CheckCircle />
                                ) : rental.status === "CANCELLED" ? (
                                  <Cancel />
                                ) : (
                                  <DirectionsCar />
                                )
                              }
                              label={statusDisplayMap[rental.status] || rental.status}
                              className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} !border-2`}
                            />
                          </Box>

                          {/* Dates */}
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Card className="!bg-slate-900/50">
                                <CardContent className="!p-3">
                                  <Typography variant="caption" className="!text-white/50 !mb-1">
                                    Start Date
                                  </Typography>
                                  <Typography variant="body1" className="!font-semibold !text-white">
                                    {formatDate(rental.startDate)}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Card className="!bg-slate-900/50">
                                <CardContent className="!p-3">
                                  <Typography variant="caption" className="!text-white/50 !mb-1">
                                    End Date
                                  </Typography>
                                  <Typography variant="body1" className="!font-semibold !text-white">
                                    {formatDate(rental.endDate)}
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
                                ${rental.totalPrice?.toFixed(2)}
                              </Typography>
                            </Box>
                            <Box className="flex gap-2">
                              <Button
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => handleViewDetails(rental.id)}
                                className="!border-white/20 !text-white/70 hover:!bg-white/10 !rounded-xl"
                              >
                                View Details
                              </Button>
                              {(rental.status === "PENDING" || rental.status === "ACTIVE") && (
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
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : !loading && (
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
