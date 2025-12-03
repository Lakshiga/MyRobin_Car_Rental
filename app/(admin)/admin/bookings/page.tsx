"use client";

import { useState } from "react";
import {
  Button,
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
import { Search, Add, Visibility, Edit } from "@mui/icons-material";

const bookings = [
  {
    id: 1,
    car: "Ferrari-FF",
    customer: "Julien Martin",
    pickupDate: "22 Nov 2025",
    pickupTime: "10:00 AM",
  },
  {
    id: 2,
    car: "Tesla Model S",
    customer: "Thomas Leroy",
    pickupDate: "14 Nov 2025",
    pickupTime: "09:00 PM",
  },
  {
    id: 3,
    car: "Lamborghini Aventador",
    customer: "Alexandre Dupont",
    pickupDate: "20 Nov 2025",
    pickupTime: "10:00 AM",
  },
  {
    id: 4,
    car: "BMW GTS3 M2",
    customer: "Lucas Bernard",
    pickupDate: "19 Nov 2025",
    pickupTime: "10:00 PM",
  },
  {
    id: 5,
    car: "Ferrari LaFerrari",
    customer: "Hugo Moreau",
    pickupDate: "17 Nov 2025",
    pickupTime: "09:00 AM",
  },
];

export default function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewBooking = () => {
    alert("Create new booking");
  };

  const handleView = (id: number) => {
    alert(`View booking ${id}`);
  };

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Box>
          <Typography variant="h3" className="!font-bold !text-white">
            Bookings
          </Typography>
          <Typography variant="body1" className="!text-white/70 !mt-1">
            Manage all car rental bookings
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
                <TableCell className="!font-semibold !text-white/90">Car</TableCell>
                <TableCell className="!font-semibold !text-white/90">Customer</TableCell>
                <TableCell className="!font-semibold !text-white/90">Pickup Date</TableCell>
                <TableCell className="!font-semibold !text-white/90" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
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
                    <Typography variant="body2" className="!font-medium !text-white">
                      {booking.car}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="!text-white/70">{booking.customer}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="!text-white/70">{booking.pickupDate}</Typography>
                    <Typography variant="caption" className="!text-white/50">
                      {booking.pickupTime}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => handleView(booking.id)}
                      className="!text-blue-400 hover:!bg-blue-500/20"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
