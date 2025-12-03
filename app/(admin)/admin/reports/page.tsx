"use client";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { Download, Description, CheckCircle } from "@mui/icons-material";

const reports = [
  {
    id: 1,
    period: "November 2025",
    status: "Ready",
    accent: "emerald",
  },
  {
    id: 2,
    period: "October 2025",
    status: "Ready",
    accent: "emerald",
  },
  {
    id: 3,
    period: "September 2025",
    status: "Archived",
    accent: "slate",
  },
];

export default function AdminReportsPage() {
  const handleDownload = (reportId: number, period: string) => {
    alert(`Downloading ${period} report...`);
  };

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box>
        <Typography variant="h3" className="!font-bold !text-slate-900">
          Reports
        </Typography>
        <Typography variant="body1" className="!text-slate-600 !mt-1">
          Download monthly performance summaries and fleet utilization reports.
        </Typography>
      </Box>

      {/* Reports List */}
      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card className="!rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !h-full">
              <CardContent className="!p-6">
                <Box className="flex items-start gap-4 mb-4">
                  <Box
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      report.accent === "emerald"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Description className="!text-2xl" />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="h6" className="!font-bold !text-slate-900 !mb-1">
                      {report.period}
                    </Typography>
                    <Chip
                      icon={<CheckCircle />}
                      label={report.status}
                      size="small"
                      className={
                        report.status === "Ready"
                          ? "!bg-emerald-100 !text-emerald-700"
                          : "!bg-slate-100 !text-slate-700"
                      }
                    />
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  onClick={() => handleDownload(report.id, report.period)}
                  className="!border-blue-500 !text-blue-600 hover:!bg-blue-50 !rounded-xl"
                >
                  Download
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

