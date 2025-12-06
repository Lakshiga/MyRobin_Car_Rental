"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CAR, ADD_CAR_IMAGE, DELETE_CAR_IMAGE, SET_PRIMARY_IMAGE } from "@/lib/graphql/carQueries";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import {
  ArrowBack,
  LocalGasStation,
  Speed,
  Settings,
  CalendarToday,
  ColorLens,
  People,
  AttachMoney,
  AddAPhoto,
  Delete,
  Star,
  StarBorder,
} from "@mui/icons-material";
import { useState, useRef } from "react";

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const carId = parseInt(params.id as string);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, loading, error, refetch } = useQuery(GET_CAR, {
    variables: { id: carId },
    skip: !carId || isNaN(carId),
  });

  const [addCarImage] = useMutation(ADD_CAR_IMAGE);
  const [deleteCarImage] = useMutation(DELETE_CAR_IMAGE);
  const [setPrimaryImage] = useMutation(SET_PRIMARY_IMAGE);

  const car = data?.car;
  const isAdmin = user?.role === "ADMIN";

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication required");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await fetch("http://localhost:4001/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const { imageUrl } = await uploadResponse.json();
      const isPrimary = car?.images?.length === 0; // Set as primary if no images exist

      await addCarImage({
        variables: {
          carId,
          imageUrl,
          isPrimary,
        },
      });

      refetch();
      setUploadDialogOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteCarImage({
        variables: { imageId },
      });
      refetch();
    } catch (error: any) {
      console.error("Error deleting image:", error);
      alert(`Error deleting image: ${error.message || "Unknown error"}`);
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    try {
      await setPrimaryImage({
        variables: { imageId },
      });
      refetch();
    } catch (error: any) {
      console.error("Error setting primary image:", error);
      alert(`Error setting primary image: ${error.message || "Unknown error"}`);
    }
  };

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <CircularProgress className="!text-blue-500" />
      </Box>
    );
  }

  if (error || !car) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Container>
          <Alert severity="error" className="!mb-4">
            {error?.message || "Car not found"}
          </Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => router.push("/cars")}
            className="!bg-blue-500 hover:!bg-blue-600"
          >
            Back to Cars
          </Button>
        </Container>
      </Box>
    );
  }

  // Get all images (from images array or fallback to imageUrl)
  const allImages = car.images && car.images.length > 0
    ? car.images
    : car.imageUrl
    ? [{ id: 0, imageUrl: car.imageUrl, isPrimary: true }]
    : [];

  const primaryImage = allImages.find((img: any) => img.isPrimary) || allImages[0];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <Container>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/cars")}
          className="!text-white/70 hover:!bg-white/10 !mb-6"
        >
          Back to Cars
        </Button>

        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid item xs={12} md={8}>
            <Card className="!bg-slate-800/50 !backdrop-blur-lg !border !border-white/10 !rounded-2xl">
              <CardContent className="!p-4">
                {primaryImage && (
                  <Box className="relative w-full h-96 mb-4 rounded-xl overflow-hidden bg-slate-700">
                    <img
                      src={`http://localhost:4001${primaryImage.imageUrl}`}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </Box>
                )}

                {allImages.length > 1 && (
                  <ImageList cols={4} gap={8} className="!m-0">
                    {allImages.map((image: any) => (
                      <ImageListItem key={image.id} className="!cursor-pointer">
                        <img
                          src={`http://localhost:4001${image.imageUrl}`}
                          alt={`${car.make} ${car.model} - Image ${image.id}`}
                          loading="lazy"
                          onClick={() => setSelectedImage(image.imageUrl)}
                          className="!rounded-lg"
                        />
                        {isAdmin && (
                          <ImageListItemBar
                            title={
                              <Box className="flex gap-1">
                                <IconButton
                                  size="small"
                                  onClick={() => handleSetPrimary(image.id)}
                                  className="!text-white"
                                >
                                  {image.isPrimary ? (
                                    <Star className="!text-yellow-400" />
                                  ) : (
                                    <StarBorder className="!text-white/50" />
                                  )}
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteImage(image.id)}
                                  className="!text-red-400"
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            }
                            position="top"
                            className="!bg-black/50"
                          />
                        )}
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}

                {isAdmin && (
                  <Button
                    variant="outlined"
                    startIcon={<AddAPhoto />}
                    onClick={() => setUploadDialogOpen(true)}
                    fullWidth
                    className="!mt-4 !border-blue-500/50 !text-blue-400 hover:!bg-blue-500/20"
                  >
                    Add More Images
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Car Details */}
          <Grid item xs={12} md={4}>
            <Card className="!bg-slate-800/50 !backdrop-blur-lg !border !border-white/10 !rounded-2xl">
              <CardContent className="!p-6">
                <Box className="flex items-start justify-between mb-4">
                  <Box>
                    <Typography variant="h4" className="!font-bold !text-white !mb-2">
                      {car.make} {car.model}
                    </Typography>
                    <Typography variant="body2" className="!text-white/60">
                      {car.year}
                    </Typography>
                  </Box>
                  <Chip
                    label={car.available ? "Available" : "Unavailable"}
                    className={car.available ? "!bg-emerald-500/20 !text-emerald-400" : "!bg-rose-500/20 !text-rose-400"}
                  />
                </Box>

                <Box className="space-y-4 mb-6">
                  <Box className="flex items-center gap-3">
                    <AttachMoney className="!text-blue-400" />
                    <Box>
                      <Typography variant="caption" className="!text-white/60">
                        Price per Day
                      </Typography>
                      <Typography variant="h6" className="!text-white !font-bold">
                        ${car.pricePerDay}
                      </Typography>
                    </Box>
                  </Box>

                  {car.fuelType && (
                    <Box className="flex items-center gap-3">
                      <LocalGasStation className="!text-blue-400" />
                      <Box>
                        <Typography variant="caption" className="!text-white/60">
                          Fuel Type
                        </Typography>
                        <Typography variant="body1" className="!text-white">
                          {car.fuelType}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {car.transmission && (
                    <Box className="flex items-center gap-3">
                      <Settings className="!text-blue-400" />
                      <Box>
                        <Typography variant="caption" className="!text-white/60">
                          Transmission
                        </Typography>
                        <Typography variant="body1" className="!text-white">
                          {car.transmission}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {car.seats && (
                    <Box className="flex items-center gap-3">
                      <People className="!text-blue-400" />
                      <Box>
                        <Typography variant="caption" className="!text-white/60">
                          Seats
                        </Typography>
                        <Typography variant="body1" className="!text-white">
                          {car.seats}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {car.engine && (
                    <Box className="flex items-center gap-3">
                      <Speed className="!text-blue-400" />
                      <Box>
                        <Typography variant="caption" className="!text-white/60">
                          Engine
                        </Typography>
                        <Typography variant="body1" className="!text-white">
                          {car.engine}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {car.mileage && (
                    <Box className="flex items-center gap-3">
                      <Speed className="!text-blue-400" />
                      <Box>
                        <Typography variant="caption" className="!text-white/60">
                          Mileage
                        </Typography>
                        <Typography variant="body1" className="!text-white">
                          {car.mileage.toLocaleString()} km
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <Box className="flex items-center gap-3">
                    <ColorLens className="!text-blue-400" />
                    <Box>
                      <Typography variant="caption" className="!text-white/60">
                        Color
                      </Typography>
                      <Typography variant="body1" className="!text-white">
                        {car.color}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {car.description && (
                  <Box className="mb-6">
                    <Typography variant="subtitle2" className="!text-white/80 !mb-2">
                      Description
                    </Typography>
                    <Typography variant="body2" className="!text-white/70">
                      {car.description}
                    </Typography>
                  </Box>
                )}

                {car.available && (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => router.push(`/bookings?carId=${carId}`)}
                    className="!bg-emerald-500 hover:!bg-emerald-600 !rounded-xl !py-3"
                  >
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Image Upload Dialog */}
        <Dialog
          open={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Upload Car Image</DialogTitle>
          <DialogContent>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="car-image-upload"
            />
            <label htmlFor="car-image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddAPhoto />}
                fullWidth
                disabled={uploading}
                className="!mt-4"
              >
                {uploading ? "Uploading..." : "Select Image"}
              </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUploadDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Image Preview Dialog */}
        {selectedImage && (
          <Dialog
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            maxWidth="md"
            fullWidth
          >
            <DialogContent className="!p-0">
              <img
                src={`http://localhost:4001${selectedImage}`}
                alt="Car preview"
                className="w-full h-auto"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedImage(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </Box>
  );
}

