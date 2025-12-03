"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Search, Schedule, CheckCircle, DirectionsCar } from "@mui/icons-material";

const bookingStatus = [
  {
    id: 1,
    pickupDate: "22 Nov 2025",
    pickupTime: "10:00 AM",
    dropoffDate: "26 Nov 2025",
    dropoffTime: "04:00 PM",
    status: "Upcoming",
  },
  {
    id: 2,
    pickupDate: "14 Nov 2025",
    pickupTime: "09:00 PM",
    dropoffDate: "19 Nov 2025",
    dropoffTime: "09:00 PM",
    status: "Completed",
  },
  {
    id: 3,
    pickupDate: "20 Nov 2025",
    pickupTime: "10:00 AM",
    dropoffDate: "25 Nov 2025",
    dropoffTime: "08:00 AM",
    status: "On Going",
  },
  {
    id: 4,
    pickupDate: "19 Nov 2025",
    pickupTime: "10:00 AM",
    dropoffDate: "23 Nov 2025",
    dropoffTime: "10:00 AM",
    status: "On Going",
  },
  {
    id: 5,
    pickupDate: "17 Nov 2025",
    pickupTime: "09:00 AM",
    dropoffDate: "20 Nov 2025",
    dropoffTime: "09:00 AM",
    status: "Completed",
  },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookingStatus.filter((booking) =>
    booking.pickupDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Schedule />;
      case "On Going":
        return <DirectionsCar />;
      case "Completed":
        return <CheckCircle />;
      default:
        return null;
    }
  };

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box>
        <Typography variant="h3" className="!font-bold !text-white">
          Bookings by Status
        </Typography>
        <Typography variant="body1" className="!text-white/70 !mt-1">
          View and manage bookings by their current status
        </Typography>
      </Box>

      {/* Search */}
      <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
        <CardContent className="!p-4">
          <TextField
            fullWidth
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="!text-white/50" />
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

      {/* Table */}
      <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="!bg-slate-900/50">
                <TableCell className="!font-semibold !text-white/90">Pickup Date</TableCell>
                <TableCell className="!font-semibold !text-white/90">Dropoff Date</TableCell>
                <TableCell className="!font-semibold !text-white/90" align="right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => {
                const statusColors = getStatusColor(booking.status);
                return (
                  <TableRow 
                    key={booking.id} 
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" className="!text-white/70">{booking.pickupDate}</Typography>
                      <Typography variant="caption" className="!text-white/50">
                        {booking.pickupTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="!text-white/70">{booking.dropoffDate}</Typography>
                      <Typography variant="caption" className="!text-white/50">
                        {booking.dropoffTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        icon={getStatusIcon(booking.status)}
                        label={booking.status}
                        className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} !border !font-semibold`}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
