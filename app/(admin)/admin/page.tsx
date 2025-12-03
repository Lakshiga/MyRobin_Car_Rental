"use client";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import {
  DirectionsCar,
  BookOnline,
  PendingActions,
  TrendingUp,
} from "@mui/icons-material";

const summaryCards = [
  {
    label: "Total Cars",
    value: 86,
    icon: DirectionsCar,
    change: "+12%",
    changeType: "positive",
    color: "from-blue-500 to-blue-600",
  },
  {
    label: "Active Bookings",
    value: 22,
    icon: BookOnline,
    change: "+8%",
    changeType: "positive",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    label: "Pending Approvals",
    value: 15,
    icon: PendingActions,
    change: "-3%",
    changeType: "negative",
    color: "from-amber-500 to-amber-600",
  },
];

const weeklyData = [
  { day: "Mon", thisWeek: 18, lastWeek: 15 },
  { day: "Tue", thisWeek: 22, lastWeek: 19 },
  { day: "Wed", thisWeek: 25, lastWeek: 21 },
  { day: "Thu", thisWeek: 28, lastWeek: 24 },
  { day: "Fri", thisWeek: 32, lastWeek: 28 },
  { day: "Sat", thisWeek: 18, lastWeek: 16 },
  { day: "Sun", thisWeek: 9, lastWeek: 8 },
];

const monthlyEarnings = [
  { month: "Jan", amount: 22000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 24000 },
  { month: "Apr", amount: 21000 },
  { month: "May", amount: 26000 },
  { month: "Jun", amount: 28000 },
  { month: "Jul", amount: 25824 },
];

const maxEarning = Math.max(...monthlyEarnings.map((e) => e.amount));

export default function AdminDashboardPage() {
  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h3" className="!font-bold !text-slate-900">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" className="!text-slate-600 !mt-1">
          Welcome back! Here's what's happening today.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={card.label}>
              <Card className="!rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !h-full">
                <CardContent className="!p-6">
                  <Box className="flex items-start justify-between">
                    <Box className="flex-1">
                      <Typography variant="body2" className="!font-medium !text-slate-500 !uppercase !tracking-wide !mb-2">
                        {card.label}
                      </Typography>
                      <Typography variant="h3" className="!font-bold !text-slate-900 !mb-2">
                        {card.value}
                      </Typography>
                      <Box className="flex items-center gap-2">
                        <Chip
                          icon={<TrendingUp />}
                          label={card.change}
                          size="small"
                          className={
                            card.changeType === "positive"
                              ? "!bg-emerald-100 !text-emerald-700"
                              : "!bg-rose-100 !text-rose-700"
                          }
                        />
                        <Typography variant="caption" className="!text-slate-500">
                          vs last month
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                    >
                      <Icon className="!text-3xl" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Weekly Bookings Chart */}
        <Grid item xs={12} md={6}>
          <Card className="!rounded-2xl !shadow-lg">
            <CardContent className="!p-6">
              <Box className="mb-6 flex items-center justify-between">
                <Box>
                  <Typography variant="h5" className="!font-bold !text-slate-900">
                    Weekly Bookings
                  </Typography>
                  <Typography variant="body2" className="!text-slate-500 !mt-1">
                    This week vs last week
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="h4" className="!font-bold !text-slate-900">
                    152
                  </Typography>
                  <Chip
                    label="+12.5%"
                    size="small"
                    className="!bg-emerald-100 !text-emerald-700 !mt-1"
                    icon={<TrendingUp />}
                  />
                </Box>
              </Box>

              {/* Legend */}
              <Box className="mb-4 flex items-center gap-6 text-sm">
                <Box className="flex items-center gap-2">
                  <Box className="h-3 w-3 rounded-full bg-yellow-400 shadow-sm" />
                  <Typography variant="body2" className="!text-slate-600">
                    This Week
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Box className="h-3 w-3 rounded-full bg-slate-300 shadow-sm" />
                  <Typography variant="body2" className="!text-slate-600">
                    Last Week
                  </Typography>
                </Box>
              </Box>

              {/* Chart */}
              <Box className="h-64 rounded-xl bg-gradient-to-b from-slate-50 to-white p-4">
                <Box className="flex h-full items-end justify-between gap-2">
                  {weeklyData.map((data) => {
                    const thisWeekHeight = (data.thisWeek / 35) * 100;
                    const lastWeekHeight = (data.lastWeek / 35) * 100;
                    return (
                      <Box key={data.day} className="flex-1 flex flex-col items-center gap-2 group">
                        <Box className="relative w-full flex flex-col items-center justify-end h-full">
                          <Box
                            className="w-full rounded-t-lg bg-slate-300 transition-all group-hover:opacity-80"
                            sx={{ height: `${lastWeekHeight}%` }}
                          />
                          <Box
                            className="absolute w-full rounded-t-lg bg-yellow-400 transition-all group-hover:opacity-80"
                            sx={{ height: `${thisWeekHeight}%` }}
                          />
                        </Box>
                        <Typography variant="caption" className="!font-medium !text-slate-600">
                          {data.day}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Earnings Chart */}
        <Grid item xs={12} md={6}>
          <Card className="!rounded-2xl !shadow-lg">
            <CardContent className="!p-6">
              <Box className="mb-6 flex items-center justify-between">
                <Box>
                  <Typography variant="h5" className="!font-bold !text-slate-900">
                    Monthly Earnings
                  </Typography>
                  <Typography variant="body2" className="!text-slate-500 !mt-1">
                    Revenue performance this year
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="h4" className="!font-bold !text-slate-900">
                    $25,824
                  </Typography>
                  <Chip
                    label="+3.5%"
                    size="small"
                    className="!bg-emerald-100 !text-emerald-700 !mt-1"
                    icon={<TrendingUp />}
                  />
                </Box>
              </Box>

              {/* Chart */}
              <Box className="h-64 rounded-xl bg-gradient-to-b from-blue-50 to-white p-4">
                <Box className="flex h-full items-end justify-between gap-2">
                  {monthlyEarnings.map((earning) => {
                    const height = (earning.amount / maxEarning) * 100;
                    return (
                      <Box key={earning.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <Box className="relative w-full flex items-end justify-center h-full">
                          <Box
                            className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 transition-all group-hover:from-blue-600 group-hover:to-blue-500 shadow-md"
                            sx={{ height: `${height}%` }}
                          />
                        </Box>
                        <Typography variant="caption" className="!font-medium !text-slate-600">
                          {earning.month}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

