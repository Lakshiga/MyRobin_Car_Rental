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
        return { bg: "!bg-amber-100", text: "!text-amber-700" };
      case "On Going":
        return { bg: "!bg-blue-100", text: "!text-blue-700" };
      case "Completed":
        return { bg: "!bg-emerald-100", text: "!text-emerald-700" };
      default:
        return { bg: "!bg-slate-100", text: "!text-slate-700" };
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
        <Typography variant="h3" className="!font-bold !text-slate-900">
          Bookings by Status
        </Typography>
        <Typography variant="body1" className="!text-slate-600 !mt-1">
          View and manage bookings by their current status
        </Typography>
      </Box>

      {/* Search */}
      <Card className="!rounded-2xl !shadow-lg">
        <CardContent className="!p-4">
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="!rounded-2xl !shadow-lg">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="!bg-slate-50">
                <TableCell className="!font-semibold">Pickup Date</TableCell>
                <TableCell className="!font-semibold">Dropoff Date</TableCell>
                <TableCell className="!font-semibold" align="right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => {
                const statusColors = getStatusColor(booking.status);
                return (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Typography variant="body2">{booking.pickupDate}</Typography>
                      <Typography variant="caption" className="!text-slate-500">
                        {booking.pickupTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{booking.dropoffDate}</Typography>
                      <Typography variant="caption" className="!text-slate-500">
                        {booking.dropoffTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        icon={getStatusIcon(booking.status)}
                        label={booking.status}
                        className={`${statusColors.bg} ${statusColors.text} !font-semibold`}
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

