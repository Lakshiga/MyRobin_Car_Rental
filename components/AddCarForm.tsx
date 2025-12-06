"use client";

import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CAR } from "@/lib/graphql/carQueries";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import {
  AddAPhoto,
  Close,
  LocalGasStation,
  Speed,
  Settings,
  CalendarToday,
  ColorLens,
} from "@mui/icons-material";

interface AddCarFormProps {
  open: boolean;
  onClose: () => void;
  onCarAdded: () => void;
}

export function AddCarForm({ open, onClose, onCarAdded }: AddCarFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    pricePerDay: "",
    fuelType: "",
    transmission: "",
    seats: "",
    engine: "",
    mileage: "",
    description: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createCar, { loading, error }] = useMutation(CREATE_CAR);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      alert('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    console.log('Uploading file:', file.name, file.type, file.size); // Debug log

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to upload images');
        setUploadingImage(false);
        return;
      }

      const response = await fetch('http://localhost:4001/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add auth header
          // Don't set Content-Type - browser will set it automatically with boundary for FormData
        },
        body: formData,
      });

      console.log('Upload response status:', response.status); // Debug log
      
      if (!response.ok) {
        let errorMessage = 'Upload failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || `HTTP ${response.status}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Upload response:', data); // Debug log
      
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        console.log('Image uploaded successfully:', data.imageUrl);
      } else {
        throw new Error('No image URL returned from server');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      const errorMessage = error.message || 'Unknown error';
      
      // Provide more specific error messages
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        alert('Cannot connect to server. Please make sure the backend server is running on http://localhost:4000');
      } else {
        alert('Error uploading image: ' + errorMessage);
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is admin
    if (!user || user.role !== 'ADMIN') {
      console.error('Only admins can add cars');
      return;
    }
    
    try {
      await createCar({
        variables: {
          input: {
            make: formData.make,
            model: formData.model,
            year: parseInt(formData.year),
            color: formData.color,
            pricePerDay: parseFloat(formData.pricePerDay),
            imageUrl,
            fuelType: formData.fuelType || undefined,
            transmission: formData.transmission || undefined,
            seats: formData.seats ? parseInt(formData.seats) : undefined,
            engine: formData.engine || undefined,
            mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
            description: formData.description || undefined,
          },
        },
      });
      
      setShowSuccess(true);
      setFormData({
        make: "",
        model: "",
        year: "",
        color: "",
        pricePerDay: "",
        fuelType: "",
        transmission: "",
        seats: "",
        engine: "",
        mileage: "",
        description: "",
      });
      setImageUrl("");
      onCarAdded();
      onClose();
    } catch (err) {
      console.error("Error creating car:", err);
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        aria-hidden={false}
      >
        <DialogTitle className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white">
          <Box className="flex justify-between items-center">
            <Typography variant="h5" className="!font-bold">
              Add New Car
            </Typography>
            <IconButton onClick={onClose} className="!text-white">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className="!pb-4">
            <Grid container spacing={3}>
              {/* Image Upload */}
              <Grid item xs={12}>
                <Card className="!border-2 !border-dashed !border-blue-300 !bg-blue-50">
                  <CardContent className="!text-center !py-8">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    
                    {imageUrl ? (
                      <Box className="relative">
                        <img
                          src={`http://localhost:4001${imageUrl}`}
                          alt="Car preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <IconButton
                          onClick={() => fileInputRef.current?.click()}
                          className="!absolute !top-2 !right-2 !bg-white/90 !shadow-lg"
                        >
                          <AddAPhoto />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                        <AddAPhoto className="!text-4xl !text-blue-500 !mb-2" />
                        <Typography className="!text-blue-600 !font-medium">
                          {uploadingImage ? "Uploading..." : "Click to upload car image"}
                        </Typography>
                        <Typography variant="caption" className="!text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" className="!font-semibold !mb-2">
                  Basic Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="make"
                  label="Make"
                  value={formData.make}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="e.g., Toyota, Honda, BMW"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="model"
                  label="Model"
                  value={formData.model}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="e.g., Camry, Civic, X5"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="year"
                  label="Year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  fullWidth
                  required
                  inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="color"
                  label="Color"
                  value={formData.color}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="e.g., Black, White, Red"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="pricePerDay"
                  label="Price Per Day ($)"
                  type="number"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  fullWidth
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              {/* Additional Specifications (Optional) */}
              <Grid item xs={12}>
                <Typography variant="h6" className="!font-semibold !mb-2">
                  Additional Specifications (For Future Use)
                </Typography>
                <Typography variant="caption" className="!text-gray-500 !mb-2 block">
                  These fields are not yet supported by the backend but will be stored for future implementation.
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fuelType"
                  label="Fuel Type"
                  value={formData.fuelType}
                  onChange={handleChange}
                  fullWidth
                  placeholder="e.g., Gasoline, Diesel, Electric, Hybrid"
                  disabled
                  helperText="Coming soon"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="transmission"
                  label="Transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  fullWidth
                  placeholder="e.g., Manual, Automatic, CVT"
                  disabled
                  helperText="Coming soon"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="seats"
                  label="Number of Seats"
                  type="number"
                  value={formData.seats}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ min: 2, max: 8 }}
                  disabled
                  helperText="Coming soon"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="engine"
                  label="Engine"
                  value={formData.engine}
                  onChange={handleChange}
                  fullWidth
                  placeholder="e.g., 2.0L, V6, Electric Motor"
                  disabled
                  helperText="Coming soon"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="mileage"
                  label="Mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  fullWidth
                  placeholder="e.g., 5000 km, Low"
                  disabled
                  helperText="Coming soon"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add any additional details about the car..."
                  disabled
                  helperText="Coming soon"
                />
              </Grid>
            </Grid>
            
            {error && (
              <Typography color="error" className="!mt-4">
                Error: {error.message}
              </Typography>
            )}
          </DialogContent>
          <DialogActions className="!px-6 !pb-6">
            <Button onClick={onClose} size="large">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading || uploadingImage}
              size="large"
              className="!bg-blue-500 hover:!bg-blue-600 !px-8"
            >
              {loading ? "Adding Car..." : "Add Car"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Car added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
