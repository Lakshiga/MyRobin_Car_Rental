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
  AttachMoney,
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

// Line Graph Data - Revenue Trend
const revenueTrendData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22000 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 24500 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 32000 },
  { month: "Jul", revenue: 29500 },
];

const maxRevenue = Math.max(...revenueTrendData.map((d) => d.revenue));

// Pie Chart Data - Car Categories
const carCategoryData = [
  { label: "Sedan", value: 35, color: "#3b82f6" },
  { label: "SUV", value: 28, color: "#10b981" },
  { label: "Sports", value: 20, color: "#f59e0b" },
  { label: "Luxury", value: 12, color: "#8b5cf6" },
  { label: "Electric", value: 5, color: "#06b6d4" },
];

const totalCars = carCategoryData.reduce((sum, item) => sum + item.value, 0);

export default function AdminDashboardPage() {
  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h3" className="!font-bold !text-white">
          Overview
        </Typography>
        <Typography variant="body1" className="!text-white/70 !mt-1">
          Happening today.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={card.label}>
              <Card className="!rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !h-full !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
                <CardContent className="!p-6">
                  <Box className="flex items-start justify-between">
                    <Box className="flex-1">
                      <Typography variant="body2" className="!font-medium !text-white/60 !uppercase !tracking-wide !mb-2">
                        {card.label}
                      </Typography>
                      <Typography variant="h3" className="!font-bold !text-white !mb-2">
                        {card.value}
                      </Typography>
                      <Box className="flex items-center gap-2">
                        <Chip
                          icon={<TrendingUp />}
                          label={card.change}
                          size="small"
                          className={
                            card.changeType === "positive"
                              ? "!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30"
                              : "!bg-rose-500/20 !text-rose-400 !border !border-rose-500/30"
                          }
                        />
                        <Typography variant="caption" className="!text-white/50">
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

      {/* Charts Section - Line Graph, Monthly Revenue, and Pie Chart */}
      <Grid container spacing={3}>
        {/* Left Column - Graph and Monthly Revenue */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Revenue Trend Line Graph */}
            <Grid item xs={12}>
              <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
                <CardContent className="!p-6">
                  <Box className="mb-6 flex items-center justify-between">
                    <Box>
                      <Typography variant="h5" className="!font-bold !text-white">
                        Revenue Trend
                      </Typography>
                      <Typography variant="body2" className="!text-white/60 !mt-1">
                        Monthly revenue over the last 7 months
                      </Typography>
                    </Box>
                    <Box className="text-right">
                      <Typography variant="h4" className="!font-bold !text-white">
                        $29,500
                      </Typography>
                      <Chip
                        label="+15.2%"
                        size="small"
                        className="!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30 !mt-1"
                        icon={<TrendingUp />}
                      />
                    </Box>
                  </Box>

                  {/* Line Graph */}
                  <Box className="h-80 rounded-xl bg-slate-900/50 p-6 border border-white/5 relative">
                    <svg width="100%" height="100%" className="overflow-visible">
                      {/* Grid Lines */}
                      {[0, 25, 50, 75, 100].map((percent) => (
                        <line
                          key={percent}
                          x1="0"
                          y1={`${percent}%`}
                          x2="100%"
                          y2={`${percent}%`}
                          stroke="rgba(255, 255, 255, 0.05)"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Data Points and Line */}
                      {revenueTrendData.map((data, index) => {
                        const x = (index / (revenueTrendData.length - 1)) * 100;
                        const y = 100 - (data.revenue / maxRevenue) * 80;
                        const nextData = revenueTrendData[index + 1];
                        
                        return (
                          <g key={data.month}>
                            {/* Line to next point */}
                            {nextData && (
                              <line
                                x1={`${x}%`}
                                y1={`${y}%`}
                                x2={`${(index + 1) / (revenueTrendData.length - 1) * 100}%`}
                                y2={`${100 - (nextData.revenue / maxRevenue) * 80}%`}
                                stroke="url(#lineGradient)"
                                strokeWidth="3"
                                fill="none"
                                className="drop-shadow-lg"
                              />
                            )}
                            
                            {/* Data Point Circle */}
                            <circle
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="6"
                              fill="#3b82f6"
                              stroke="#1e293b"
                              strokeWidth="2"
                              className="hover:r-8 transition-all cursor-pointer"
                            />
                            
                            {/* Hover Circle */}
                            <circle
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="12"
                              fill="rgba(59, 130, 246, 0.2)"
                              className="hover:opacity-100 opacity-0 transition-opacity cursor-pointer"
                            />
                            
                            {/* Value Label */}
                            <text
                              x={`${x}%`}
                              y={`${y - 15}%`}
                              textAnchor="middle"
                              fill="#60a5fa"
                              fontSize="12"
                              fontWeight="600"
                              className="opacity-0 hover:opacity-100 transition-opacity"
                            >
                              ${(data.revenue / 1000).toFixed(0)}k
                            </text>
                            
                            {/* Month Label */}
                            <text
                              x={`${x}%`}
                              y="98%"
                              textAnchor="middle"
                              fill="rgba(255, 255, 255, 0.6)"
                              fontSize="11"
                              fontWeight="500"
                            >
                              {data.month}
                            </text>
                          </g>
                        );
                      })}

                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Monthly Revenue Card - Below Graph */}
            <Grid item xs={12}>
              <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10 !min-h-[280px]">
                <CardContent className="!p-10">
                  <Box className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 h-full">
                    <Box className="flex-1">
                      <Typography variant="body2" className="!font-medium !text-white/60 !uppercase !tracking-wide !mb-3 !text-base">
                        Monthly Revenue
                      </Typography>
                      <Typography variant="h2" className="!font-bold !text-white !mb-3">
                        $25,824
                      </Typography>
                      <Box className="flex items-center gap-2">
                        <Chip
                          icon={<TrendingUp />}
                          label="+3.5%"
                          size="small"
                          className="!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30"
                        />
                        <Typography variant="caption" className="!text-white/50">
                          vs last month
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box className="flex-1 flex flex-col md:flex-row gap-8 md:gap-10">
                      <Box className="flex-1">
                        <Box className="flex items-center justify-between mb-3">
                          <Typography variant="body1" className="!text-white/70 !font-medium">
                            This Month
                          </Typography>
                          <Typography variant="body1" className="!text-white !font-bold !text-lg">
                            $25,824
                          </Typography>
                        </Box>
                        <Box className="flex items-center justify-between mb-4">
                          <Typography variant="body1" className="!text-white/70 !font-medium">
                            Last Month
                          </Typography>
                          <Typography variant="body1" className="!text-white/60 !font-semibold">
                            $24,950
                          </Typography>
                        </Box>
                        <Box className="h-3 bg-slate-700 rounded-full mt-4 overflow-hidden">
                          <Box
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                            sx={{ width: "85%" }}
                          />
                        </Box>
                      </Box>
                      
                      <Box className="flex items-center justify-center md:justify-end">
                        <Box
                          className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg"
                        >
                          <AttachMoney className="!text-6xl" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Car Categories Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent className="!p-6">
              <Box className="mb-6">
                <Typography variant="h5" className="!font-bold !text-white">
                  Car Categories
                </Typography>
                <Typography variant="body2" className="!text-white/60 !mt-1">
                  Distribution by type
                </Typography>
              </Box>

              {/* Pie Chart */}
              <Box className="h-80 rounded-xl bg-slate-900/50 p-6 border border-white/5 relative flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 200 200" className="overflow-visible">
                  <g transform="translate(100, 100)">
                    {(() => {
                      let currentAngle = -90;
                      return carCategoryData.map((item, index) => {
                        const percentage = (item.value / totalCars) * 100;
                        const angle = (percentage / 100) * 360;
                        const largeArcFlag = angle > 180 ? 1 : 0;
                        
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        
                        const x1 = 80 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 80 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 80 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 80 * Math.sin((endAngle * Math.PI) / 180);
                        
                        const pathData = [
                          `M 0 0`,
                          `L ${x1} ${y1}`,
                          `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                          `Z`,
                        ].join(" ");
                        
                        const midAngle = currentAngle + angle / 2;
                        const labelRadius = 95;
                        const labelX = labelRadius * Math.cos((midAngle * Math.PI) / 180);
                        const labelY = labelRadius * Math.sin((midAngle * Math.PI) / 180);
                        
                        currentAngle += angle;
                        
                        return (
                          <g key={item.label}>
                            <path
                              d={pathData}
                              fill={item.color}
                              stroke="#1e293b"
                              strokeWidth="2"
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                              style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))" }}
                            />
                            {percentage > 8 && (
                              <text
                                x={labelX}
                                y={labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontSize="11"
                                fontWeight="600"
                                className="pointer-events-none"
                              >
                                {percentage.toFixed(0)}%
                              </text>
                            )}
                          </g>
                        );
                      });
                    })()}
                    
                    {/* Center Circle */}
                    <circle cx="0" cy="0" r="50" fill="#1e293b" />
                    <text
                      x="0"
                      y="-5"
                      textAnchor="middle"
                      fill="white"
                      fontSize="20"
                      fontWeight="bold"
                    >
                      {totalCars}
                    </text>
                    <text
                      x="0"
                      y="15"
                      textAnchor="middle"
                      fill="rgba(255, 255, 255, 0.6)"
                      fontSize="11"
                    >
                      Total Cars
                    </text>
                  </g>
                </svg>
              </Box>

              {/* Legend */}
              <Box className="mt-6 space-y-3">
                {carCategoryData.map((item) => {
                  const percentage = ((item.value / totalCars) * 100).toFixed(1);
                  return (
                    <Box key={item.label} className="flex items-center justify-between">
                      <Box className="flex items-center gap-3">
                        <Box
                          className="h-4 w-4 rounded-full shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                        <Typography variant="body2" className="!text-white/80 !font-medium">
                          {item.label}
                        </Typography>
                      </Box>
                      <Box className="text-right">
                        <Typography variant="body2" className="!text-white !font-bold">
                          {item.value}
                        </Typography>
                        <Typography variant="caption" className="!text-white/50">
                          {percentage}%
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Charts Section - Weekly Bookings and Monthly Earnings */}
      <Grid container spacing={3}>
        {/* Weekly Bookings Chart */}
        <Grid item xs={12} md={6}>
          <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent className="!p-6">
              <Box className="mb-6 flex items-center justify-between">
                <Box>
                  <Typography variant="h5" className="!font-bold !text-white">
                    Weekly Bookings
                  </Typography>
                  <Typography variant="body2" className="!text-white/60 !mt-1">
                    This week vs last week
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="h4" className="!font-bold !text-white">
                    152
                  </Typography>
                  <Chip
                    label="+12.5%"
                    size="small"
                    className="!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30 !mt-1"
                    icon={<TrendingUp />}
                  />
                </Box>
              </Box>

              {/* Legend */}
              <Box className="mb-4 flex items-center gap-6 text-sm">
                <Box className="flex items-center gap-2">
                  <Box className="h-3 w-3 rounded-full bg-yellow-400 shadow-sm" />
                  <Typography variant="body2" className="!text-white/70">
                    This Week
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Box className="h-3 w-3 rounded-full bg-slate-400 shadow-sm" />
                  <Typography variant="body2" className="!text-white/70">
                    Last Week
                  </Typography>
                </Box>
              </Box>

              {/* Chart */}
              <Box className="h-64 rounded-xl bg-slate-900/50 p-4 border border-white/5">
                <Box className="flex h-full items-end justify-between gap-2">
                  {weeklyData.map((data) => {
                    const thisWeekHeight = (data.thisWeek / 35) * 100;
                    const lastWeekHeight = (data.lastWeek / 35) * 100;
                    return (
                      <Box key={data.day} className="flex-1 flex flex-col items-center gap-2 group">
                        <Box className="relative w-full flex flex-col items-center justify-end h-full">
                          <Box
                            className="w-full rounded-t-lg bg-slate-600/50 transition-all group-hover:opacity-80"
                            sx={{ height: `${lastWeekHeight}%` }}
                          />
                          <Box
                            className="absolute w-full rounded-t-lg bg-yellow-400 transition-all group-hover:opacity-80 shadow-lg"
                            sx={{ height: `${thisWeekHeight}%` }}
                          />
                        </Box>
                        <Typography variant="caption" className="!font-medium !text-white/70">
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
          <Card className="!rounded-2xl !shadow-xl !bg-slate-800/50 !backdrop-blur-lg !border !border-white/10">
            <CardContent className="!p-6">
              <Box className="mb-6 flex items-center justify-between">
                <Box>
                  <Typography variant="h5" className="!font-bold !text-white">
                    Monthly Earnings
                  </Typography>
                  <Typography variant="body2" className="!text-white/60 !mt-1">
                    Revenue performance this year
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="h4" className="!font-bold !text-white">
                    $25,824
                  </Typography>
                  <Chip
                    label="+3.5%"
                    size="small"
                    className="!bg-emerald-500/20 !text-emerald-400 !border !border-emerald-500/30 !mt-1"
                    icon={<TrendingUp />}
                  />
                </Box>
              </Box>

              {/* Chart */}
              <Box className="h-64 rounded-xl bg-slate-900/50 p-4 border border-white/5">
                <Box className="flex h-full items-end justify-between gap-2">
                  {monthlyEarnings.map((earning) => {
                    const height = (earning.amount / maxEarning) * 100;
                    return (
                      <Box key={earning.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <Box className="relative w-full flex items-end justify-center h-full">
                          <Box
                            className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 transition-all group-hover:from-blue-600 group-hover:to-blue-500 shadow-lg"
                            sx={{ height: `${height}%` }}
                          />
                        </Box>
                        <Typography variant="caption" className="!font-medium !text-white/70">
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
